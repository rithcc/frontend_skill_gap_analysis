
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Plus, Trash2, Brain, Zap, BarChart3, ChevronRight, Eye, CheckCircle } from "lucide-react";

interface ResumeUploadProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface ProcessedFile {
  file: File;
  extractedText: string | null;
  isProcessing: boolean;
  originalApiResponse?: Record<string, unknown>; // Store the original API response
}

const ResumeUpload = ({ onNext, onBack }: ResumeUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
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
          if (ps['Key Strengths']) {
            textParts.push('Key Strengths:');
            if (Array.isArray(ps['Key Strengths'])) {
              ps['Key Strengths'].forEach((strength: string) => textParts.push(`- ${strength}`));
            } else {
              textParts.push(`- ${ps['Key Strengths']}`);
            }
          }
          if (ps['Recent Learning'] && ps['Recent Learning'].length > 0) {
            textParts.push('Recent Learning:');
            ps['Recent Learning'].forEach((learning: string) => textParts.push(`- ${learning}`));
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
    
    setProcessedFiles(prev => [...prev, ...newProcessedFiles]);
    
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
          pf.file === file 
            ? { ...pf, extractedText, isProcessing: false, originalApiResponse: originalResponse }
            : pf
        );
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
    
    // Store comprehensive data in localStorage for other pages to access
    localStorage.setItem('combinedResumeText', combined);
    localStorage.setItem('individualResumeTexts', JSON.stringify(texts));
    
    // Also store the structured resume data if available
    const structuredData = processedFiles
      .filter(pf => pf.extractedText && pf.originalApiResponse)
      .map(pf => ({
        fileName: pf.file.name,
        extractedText: pf.extractedText,
        ...pf.originalApiResponse // Spread the original API response
      }));
    
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
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Process the new files for text extraction
    if (files.length > 0) {
      processAllResumes(files);
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = uploadedFiles[index];
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setProcessedFiles(prev => prev.filter(pf => pf.file !== fileToRemove));
    
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
    const processedFile = processedFiles.find(pf => pf.file === uploadedFiles[selectedResumeIndex]);
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
    
    // Call onNext to proceed to the next step (EmployeeSkillCards)
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Upload <span className="modern-blue">Team Data</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload team profiles to unleash AI-powered skill gap analysis. Our intelligent system 
          will process and analyze capabilities against your defined framework.
        </p>
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
              
              <Button asChild className="bg-modern-blue hover:bg-modern-blue/90 text-white border-0 px-8 py-3 rounded-xl">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" className="flex items-center border-gray-300 hover:border-gray-400 text-gray-700">
              <Plus className="w-4 h-4 mr-2" />
              <label htmlFor="file-upload" className="cursor-pointer">Add More</label>
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
              onClick={() => {
                setUploadedFiles([]);
                setProcessedFiles([]);
                setSelectedResumeIndex(null);
                setCombinedResumeText('');
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
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
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {uploadedFiles.map((file, index) => {
                const processedFile = processedFiles.find(pf => pf.file === file);
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
                          {(file.size / 1024 / 1024).toFixed(2)} MB • 
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

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline"
          className="border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3"
          onClick={onBack}
        >
          ← Back
        </Button>
        
        <div className="flex gap-4">
          <Button 
            variant="outline"
            className="border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3"
          >
            Save Progress
          </Button>
          <Button 
            onClick={handleAnalyze}
            className="bg-modern-blue hover:bg-modern-blue/90 text-white px-12 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={(() => {
              const count = processedFiles.filter(pf => pf.extractedText).length;
              console.log(`[Button] Processed files with text: ${count}, Button disabled: ${count === 0}`);
              return count === 0;
            })()}
          >
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Launch AI Analysis ({processedFiles.filter(pf => pf.extractedText).length} ready)
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;