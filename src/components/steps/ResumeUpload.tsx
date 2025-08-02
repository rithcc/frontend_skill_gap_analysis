
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Plus, Trash2, Brain, Zap, BarChart3, ChevronRight, Eye, CheckCircle } from "lucide-react";

interface ResumeUploadProps {
  onNext?: () => void;
  onBack?: () => void;
  requirementSessionId?: string; // Pass this from parent when starting a new requirement
}

const RESUME_SESSION_KEY = 'requirementSessionId';

const clearResumeState = () => {
  localStorage.removeItem('resumeUploadFilesMeta');
  localStorage.removeItem('resumeProcessedFiles');
  localStorage.removeItem('combinedResumeText');
  localStorage.removeItem('individualResumeTexts');
  localStorage.removeItem('structuredResumeData');
  localStorage.removeItem('resumeMetadata');
  localStorage.removeItem('totalResumeCount');
  localStorage.removeItem('successfulExtractions');
  localStorage.removeItem('selectedResumeIndex');
  localStorage.removeItem('showEmployeeSkillCard');
  localStorage.removeItem('resumeProcessingComplete');
  localStorage.removeItem('resumeProcessingTimestamp');
};

interface ProcessedFile {
  file: File;
  extractedText: string | null;
  isProcessing: boolean;
  originalApiResponse?: Record<string, unknown>; // Store the original API response
}





// Define a lightweight file metadata type for persistence
type FileMeta = { name: string; size: number; type: string };

const ResumeUpload = ({ onNext, onBack, requirementSessionId }: ResumeUploadProps) => {
  useEffect(() => {
    // Check if requirementSessionId has changed
    const prevSessionId = localStorage.getItem(RESUME_SESSION_KEY);
    if (requirementSessionId && requirementSessionId !== prevSessionId) {
      // New requirement started, clear all resume state
      clearResumeState();
      localStorage.setItem(RESUME_SESSION_KEY, requirementSessionId);
      setUploadedFiles([]);
      setProcessedFiles([]);
      setSelectedResumeIndex(null);
      setCombinedResumeText('');
      return;
    } else if (requirementSessionId && !prevSessionId) {
      // First time, set the session key
      localStorage.setItem(RESUME_SESSION_KEY, requirementSessionId);
    }

    // Restore resumes from localStorage
    const filesMeta = localStorage.getItem('resumeUploadFilesMeta');
    const processedFilesMeta = localStorage.getItem('resumeProcessedFiles');
    const combinedText = localStorage.getItem('combinedResumeText');
    const selectedIdx = localStorage.getItem('selectedResumeIndex');

    if (filesMeta) {
      try {
        setUploadedFiles(JSON.parse(filesMeta));
      } catch (e) { /* ignore */ }
    }
    if (processedFilesMeta) {
      try {
        setProcessedFiles(JSON.parse(processedFilesMeta));
      } catch (e) { /* ignore */ }
    }
    if (combinedText) {
      setCombinedResumeText(combinedText);
    }
    if (selectedIdx) {
      setSelectedResumeIndex(Number(selectedIdx));
    }
  }, [requirementSessionId]);
  const [uploadedFiles, setUploadedFiles] = useState<FileMeta[]>([]);
  const [processedFiles, setProcessedFiles] = useState<(Omit<ProcessedFile, 'file'> & { file: FileMeta })[]>([]);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState<number | null>(null);
  const [combinedResumeText, setCombinedResumeText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const sendResumeToServer = async (file: File, fileName: string) => {
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('http://localhost:8001/extract-resume', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`HTTP Error ${res.status}:`, errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const responseData = await res.json();
      console.log(`[extract-resume] ${fileName} - Full response:`, responseData);
      
      // Check if the response has the expected structure
      if (!responseData || typeof responseData !== 'object') {
        throw new Error('Invalid response format: not an object');
      }
      
      // Try to get text from various possible fields
      let text = responseData.text || responseData.extracted_text || responseData.content;
      
      // If no direct text field, but we have structured data, convert it to text
      if (!text && responseData.personal_info) {
        console.log(`[extract-resume] ${fileName} - Converting structured data to text format`);
        
        // Convert structured resume data to readable text format
        const textParts: string[] = [];
        
        if (responseData.personal_info) {
          textParts.push('=== PERSONAL INFORMATION ===');
          const pi = responseData.personal_info;
          if (pi.name) textParts.push(`Name: ${pi.name}`);
          if (pi.title) textParts.push(`Title: ${pi.title}`);
          if (pi.email) textParts.push(`Email: ${pi.email}`);
          if (pi.phone) textParts.push(`Phone: ${pi.phone}`);
          if (pi.location) textParts.push(`Location: ${pi.location}`);
          textParts.push('');
        }
        
        if (responseData.technologies && responseData.technologies.length > 0) {
          textParts.push('=== TECHNOLOGIES ===');
          textParts.push(responseData.technologies.join(', '));
          textParts.push('');
        }
        
        if (responseData.tools && responseData.tools.length > 0) {
          textParts.push('=== TOOLS ===');
          textParts.push(responseData.tools.join(', '));
          textParts.push('');
        }
        
        if (responseData.industries && responseData.industries.length > 0) {
          textParts.push('=== INDUSTRIES ===');
          textParts.push(responseData.industries.join(', '));
          textParts.push('');
        }
        
        if (responseData.domains && responseData.domains.length > 0) {
          textParts.push('=== DOMAINS ===');
          textParts.push(responseData.domains.join(', '));
          textParts.push('');
        }
        
        if (responseData.experience_overview) {
          textParts.push('=== EXPERIENCE OVERVIEW ===');
          const exp = responseData.experience_overview;
          if (exp.total_experience_years) {
            textParts.push(`Total Experience: ${exp.total_experience_years} years`);
          }
          if (exp.areas && exp.areas.length > 0) {
            textParts.push('Skills:');
            exp.areas.forEach((area: { Skill: string; 'percentage of Proficiency': string; years: number }) => {
              textParts.push(`- ${area.Skill}: ${area['percentage of Proficiency']} (${area.years} years)`);
            });
          }
          textParts.push('');
        }
        
        if (responseData.work_history && responseData.work_history.length > 0) {
          textParts.push('=== WORK HISTORY ===');
          responseData.work_history.forEach((job: { role: string; company: string; start_year: number; end_year: number | string }) => {
            textParts.push(`${job.role} at ${job.company} (${job.start_year} - ${job.end_year})`);
          });
          textParts.push('');
        }
        
        if (responseData.professional_summary) {
          textParts.push('=== PROFESSIONAL SUMMARY ===');
          const ps = responseData.professional_summary;
          // Support both snake_case and UI camelCase keys
          const keyStrengths = ps['Key Strengths'] ?? ps['key_strengths'];
          const recentLearning = ps['Recent Learning'] ?? ps['recent_learning'];
          if (keyStrengths) {
            textParts.push('Key Strengths:');
            if (Array.isArray(keyStrengths)) {
              keyStrengths.forEach((strength: string) => textParts.push(`- ${strength}`));
            } else {
              textParts.push(`- ${keyStrengths}`);
            }
          }
          if (recentLearning && recentLearning.length > 0) {
            textParts.push('Recent Learning:');
            if (Array.isArray(recentLearning)) {
              recentLearning.forEach((learning: string) => textParts.push(`- ${learning}`));
            } else {
              textParts.push(`- ${recentLearning}`);
            }
          }
          textParts.push('');
        }
        
        if (responseData.qualifications) {
          textParts.push('=== QUALIFICATIONS ===');
          const qual = responseData.qualifications;
          if (qual.education && qual.education.length > 0) {
            textParts.push('Education:');
            qual.education.forEach((edu: string) => textParts.push(`- ${edu}`));
          }
          if (qual.certifications && qual.certifications.length > 0) {
            textParts.push('Certifications:');
            qual.certifications.forEach((cert: string) => textParts.push(`- ${cert}`));
          }
        }
        
        text = textParts.join('\n');
        console.log(`[extract-resume] ${fileName} - Generated text from structured data (${text.length} chars)`);
      }
      
      if (!text || text.trim() === '') {
        console.warn(`[extract-resume] ${fileName} - No text found in response. Available keys:`, Object.keys(responseData));
        console.warn(`[extract-resume] ${fileName} - Response data:`, responseData);
        return null;
      }
      
      console.log(`[extract-resume] ${fileName} - received text chars:`, text.length);
      console.log(`[extract-resume] ${fileName} - extracted text preview:`, text.substring(0, 200) + '...');
      
      return { text, originalResponse: responseData };
    } catch (err) {
      console.error(`Server extract error for ${fileName}:`, err);
      return null;
    }
  };

  const processAllResumes = async (files: File[]) => {
    console.log(`[processAllResumes] Starting to process ${files.length} files`);
    
    const newProcessedFiles: ProcessedFile[] = files.map(file => ({
      file,
      extractedText: null,
      isProcessing: true
    }));
    
    setProcessedFiles(prev => {
      const updated = [...prev, ...newProcessedFiles.map(pf => ({
        ...pf,
        file: {
          name: pf.file.name,
          size: pf.file.size,
          type: pf.file.type || '',
        },
      }))];
      localStorage.setItem('resumeProcessedFiles', JSON.stringify(updated));
      return updated;
    });
    
    const texts: string[] = [];
    const updatedProcessedFiles: ProcessedFile[] = [...newProcessedFiles];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`[processAllResumes] Processing file ${i + 1}/${files.length}: ${file.name}`);
      
      const result = await sendResumeToServer(file, file.name);
      const extractedText = result?.text || null;
      const originalResponse = result?.originalResponse || null;
      
      // Update the local array first
      const fileIndex = updatedProcessedFiles.findIndex(pf => pf.file === file);
      if (fileIndex !== -1) {
        updatedProcessedFiles[fileIndex] = {
          ...updatedProcessedFiles[fileIndex],
          extractedText,
          isProcessing: false,
          originalApiResponse: originalResponse
        };
      }
      
      // Update the state
      setProcessedFiles(prev => {
        const updated = prev.map(pf =>
          pf.file.name === file.name
            ? { ...pf, extractedText, isProcessing: false, originalApiResponse: originalResponse }
            : pf
        );
        localStorage.setItem('resumeProcessedFiles', JSON.stringify(updated));
        console.log(`Updated processed files after ${file.name}:`, updated);
        console.log(`Files with extracted text:`, updated.filter(pf => pf.extractedText).length);
        return updated;
      });
      
      if (extractedText && extractedText.trim()) {
        texts.push(extractedText);
        console.log(`[processAllResumes] Successfully extracted text from ${file.name}, total texts: ${texts.length}`);
      } else {
        console.warn(`[processAllResumes] No text extracted from ${file.name}`);
      }
    }
    
    // Combine all extracted texts
    const combined = texts.join('\n\n--- NEXT RESUME ---\n\n');
    setCombinedResumeText(combined);
    // Save uploadedFiles meta to localStorage
    localStorage.setItem('resumeUploadFilesMeta', JSON.stringify([
      ...uploadedFiles,
      ...files.map(f => ({ name: f.name, size: f.size, type: f.type || '' }))
    ]));
    
    // Store comprehensive data in localStorage for other pages to access
    localStorage.setItem('combinedResumeText', combined);
    localStorage.setItem('individualResumeTexts', JSON.stringify(texts));
    
    // Also store the structured resume data if available
    const structuredData = processedFiles
      .filter(pf => pf.extractedText && pf.originalApiResponse)
      .map(pf => {
        // Patch professional_summary to always have UI keys
        const patchedApiResponse = { ...pf.originalApiResponse };
        if (patchedApiResponse.professional_summary) {
          const ps = patchedApiResponse.professional_summary;
          if (
            ps['Key Strengths'] === undefined &&
            ps['key_strengths'] !== undefined
          ) {
            ps['Key Strengths'] = ps['key_strengths'];
          }
          if (
            ps['Recent Learning'] === undefined &&
            ps['recent_learning'] !== undefined
          ) {
            ps['Recent Learning'] = ps['recent_learning'];
          }
          if (
            ps['PDLC Phases'] === undefined &&
            ps['pdlc_phases'] !== undefined
          ) {
            ps['PDLC Phases'] = ps['pdlc_phases'];
          }
        }
        return {
          fileName: pf.file.name,
          extractedText: pf.extractedText,
          ...patchedApiResponse
        };
      });
    
    localStorage.setItem('structuredResumeData', JSON.stringify(structuredData));
    console.log('[processAllResumes] Structured data saved:', structuredData);
    
    // Store additional metadata that might be useful
    const resumeMetadata = files.map((file, index) => ({
      fileName: file.name,
      fileSize: file.size,
      extractedText: texts[index] || null,
      hasText: !!texts[index]
    }));
    
    localStorage.setItem('resumeMetadata', JSON.stringify(resumeMetadata));
    localStorage.setItem('totalResumeCount', files.length.toString());
    localStorage.setItem('successfulExtractions', texts.length.toString());
    
    console.log('[processAllResumes] Combined resume text length:', combined.length);
    console.log('[processAllResumes] Individual texts count:', texts.length);
    console.log('[processAllResumes] Resume metadata:', resumeMetadata);
    console.log('[processAllResumes] Data saved to localStorage successfully');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => {
      const updated = [
        ...prev,
        ...files.map(f => ({ name: f.name, size: f.size, type: f.type || '' }))
      ];
      localStorage.setItem('resumeUploadFilesMeta', JSON.stringify(updated));
      return updated;
    });
    // Process the new files for text extraction
    if (files.length > 0) {
      processAllResumes(files);
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = uploadedFiles[index];
    setUploadedFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('resumeUploadFilesMeta', JSON.stringify(updated));
      return updated;
    });
    setProcessedFiles(prev => {
      const updated = prev.filter(pf => pf.file.name !== fileToRemove.name);
      localStorage.setItem('resumeProcessedFiles', JSON.stringify(updated));
      return updated;
    });
    // Reset selected resume if it was the removed one
    if (selectedResumeIndex === index) {
      setSelectedResumeIndex(null);
    } else if (selectedResumeIndex !== null && selectedResumeIndex > index) {
      setSelectedResumeIndex(selectedResumeIndex - 1);
    }
  };

  const handleResumeClick = (index: number) => {
    setSelectedResumeIndex(index);
  };

  const getSelectedResumeText = () => {
    if (selectedResumeIndex === null) return null;
    const fileMeta = uploadedFiles[selectedResumeIndex];
    const processedFile = processedFiles.find(pf => pf.file.name === fileMeta.name);
    return processedFile?.extractedText || null;
  };

  const handleAnalyze = () => {
    const extractedTexts = processedFiles
      .filter(pf => pf.extractedText)
      .map(pf => pf.extractedText);

    console.log("Analyzing team intelligence with uploaded files:", uploadedFiles);
    console.log("Processed files:", processedFiles);
    console.log("Extracted texts:", extractedTexts);
    console.log("Combined resume text:", combinedResumeText);
    console.log("Button should be enabled:", processedFiles.filter(pf => pf.extractedText).length > 0);

    // Ensure latest data is saved to localStorage before proceeding
    const latestCombined = extractedTexts.join('\n\n--- NEXT RESUME ---\n\n');
    localStorage.setItem('combinedResumeText', latestCombined);
    localStorage.setItem('individualResumeTexts', JSON.stringify(extractedTexts));

    // Save processing status for next page
    localStorage.setItem('resumeProcessingComplete', 'true');
    localStorage.setItem('resumeProcessingTimestamp', new Date().toISOString());

    console.log('[handleAnalyze] Final data saved to localStorage, proceeding to next step');

    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Call onNext to proceed to the next step (EmployeeSkillCards)
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-base">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Resume Upload</h1>
        <p className="text-sm text-gray-600">Upload and analyze your team's resumes for comprehensive skill assessment</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Upload Section */}
        <Card className="p-8 bg-white border border-gray-200 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-modern-blue rounded-xl flex items-center justify-center mr-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Resume Upload</h3>
              <p className="text-gray-600 text-sm">Resume processing</p>
            </div>
          </div>
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-modern-blue transition-all duration-300 bg-gray-50 group-hover:bg-blue-50">
              <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Drop files or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                PDF, DOC, DOCX • Max 10MB each • Batch upload supported
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                ref={fileInputRef}
              />
              <div className="flex justify-center">
                <Button asChild className="bg-modern-blue hover:bg-modern-blue/90 text-white border-0 px-8 py-3 rounded-xl">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>
            </div>
            {/* No Launch AI Analysis button here, moved to Processing Queue */}
          </div>
        </Card>

        {/* Uploaded Files */}
        <Card className="p-8 bg-white border border-gray-200 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-modern-purple rounded-xl flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Processing Queue ({uploadedFiles.length})
              </h3>
              <p className="text-gray-600 text-sm">
                {processedFiles.filter(pf => pf.extractedText).length} processed, {processedFiles.filter(pf => pf.isProcessing).length} processing
              </p>
            </div>
          </div>
          
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No files uploaded yet</p>
              <p className="text-sm text-gray-400 mt-2">Upload team profiles to begin analysis</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {uploadedFiles.map((file, index) => {
                  const processedFile = processedFiles.find(pf => pf.file.name === file.name);
                  const isSelected = selectedResumeIndex === index;
                  const isProcessing = processedFile?.isProcessing || false;
                  const hasText = processedFile?.extractedText;
                  return (
                    <div 
                      key={index}
                      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-300 shadow-md' 
                          : 'bg-gray-50 border-gray-200 hover:border-modern-blue hover:bg-blue-25'
                      }`}
                      onClick={() => handleResumeClick(index)}
                    >
                      <div className="flex items-center flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                          hasText ? 'bg-green-500' : 'bg-modern-blue'
                        }`}>
                          {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : hasText ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <FileText className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {typeof file.size === 'number' && !isNaN(file.size) ? (file.size / 1024 / 1024).toFixed(2) : '0.00'} MB • 
                            {isProcessing ? ' Processing...' : hasText ? ' Resume processed' : ' Ready for processing'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {hasText && (
                          <div className="flex items-center text-blue-600">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">View</span>
                          </div>
                        )}
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* See Employee Card and Launch AI Analysis buttons */}
          {uploadedFiles.length > 0 && processedFiles.filter(pf => pf.extractedText).length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                className="bg-modern-blue hover:bg-modern-blue/90 text-white px-8 py-3 rounded-xl font-semibold"
                disabled={selectedResumeIndex === null}
                onClick={() => {
                  if (selectedResumeIndex !== null) {
                    // Store selected resume index for EmployeeSkillCards
                    localStorage.setItem('selectedResumeIndex', selectedResumeIndex.toString());
                    // Set flag to show EmployeeSkillCards
                    localStorage.setItem('showEmployeeSkillCard', 'true');
                    if (onNext) onNext();
                  }
                }}
              >
                See Employee Card
              </Button>
              <Button
                onClick={handleAnalyze}
                className="bg-modern-blue hover:bg-modern-blue/90 text-white px-12 py-3 rounded-xl font-semibold disabled:opacity-50"
                disabled={processedFiles.filter(pf => pf.extractedText).length === 0}
              >
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Launch AI Analysis ({processedFiles.filter(pf => pf.extractedText).length} ready)
                </div>
              </Button>
            </div>
          )}
            </>
          )}
        </Card>
      </div>

      {/* Selected Resume Text Preview */}
      {selectedResumeIndex !== null && getSelectedResumeText() && (
        <Card className="p-8 bg-white border border-gray-200 shadow-lg mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-modern-green rounded-xl flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Resume Preview: {uploadedFiles[selectedResumeIndex]?.name}
              </h3>
              <p className="text-gray-600 text-sm">Extracted text content</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
              {(() => {
                const text = getSelectedResumeText();
                return text && text.length > 2000 
                  ? `${text.substring(0, 2000)}... [TRUNCATED - ${text.length} total characters]`
                  : text || '';
              })()}
            </pre>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Character count: {getSelectedResumeText()?.length || 0}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedResumeIndex(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close Preview
            </Button>
          </div>
        </Card>
      )}

      {/* Navigation removed as per request */}
    </div>
  );
};

export default ResumeUpload;