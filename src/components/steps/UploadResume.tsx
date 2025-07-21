



'use client';
import React, { useRef, useState } from 'react';

interface ResumeUploadProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  file: File;
}

export default function ResumeUpload({ onNext, onBack }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentResumeText, setCurrentResumeText] = useState<string | null>(null);
  const [combinedResumeText, setCombinedResumeText] = useState<string>('');
  const [extractedTexts, setExtractedTexts] = useState<string[]>([]);

  const sendResumeToServer = async (file: File, fileName: string) => {
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('http://localhost:8000/api/extract-resume', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error(await res.text());

      const { text } = await res.json();
      console.log(`[extract-resume] ${fileName} - received text chars:`, text.length);
      console.log(`[extract-resume] ${fileName} - extracted text:`, text);
      
      return text;
    } catch (err) {
      console.error(`Server extract error for ${fileName}:`, err);
      return null;
    }
  };

  const processAllResumes = async (files: File[]) => {
    const texts: string[] = [];
    
    for (const file of files) {
      const extractedText = await sendResumeToServer(file, file.name);
      if (extractedText) {
        texts.push(extractedText);
      }
    }
    
    // Combine all extracted texts
    const combined = texts.join('\n\n--- NEXT RESUME ---\n\n');
    
    // Update state
    setExtractedTexts(texts);
    setCombinedResumeText(combined);
    setCurrentResumeText(combined);
    
    // Store in localStorage for other pages to access
    localStorage.setItem('combinedResumeText', combined);
    localStorage.setItem('individualResumeTexts', JSON.stringify(texts));
    localStorage.setItem('firstResumeText', texts[0] || ''); // Store first resume for EmployeeSkillCards
    
    console.log('[processAllResumes] Combined resume text length:', combined.length);
    console.log('[processAllResumes] Individual texts count:', texts.length);
    console.log('[processAllResumes] Combined text stored in localStorage');
    console.log('combinedResumeText:', combined);
    console.log('individualResumeTexts:', texts);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'uploading' as const,
      progress: 0,
      file,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    if (newFiles.length > 0) {
      processAllResumes(newFiles.map(f => f.file));
    }

    newFiles.forEach((fileObj, i) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadedFiles(prevFiles =>
          prevFiles.map(f =>
            f.id === fileObj.id
              ? {
                  ...f,
                  progress: Math.min(progress, 100),
                  status: progress >= 100 ? 'completed' : 'uploading',
                }
              : f
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 400 + i * 100);
    });
  };

  const removeFile = (id: number) => {
    setUploadedFiles(f => f.filter(x => x.id !== id));
  };

  const clearAll = () => {
    setUploadedFiles([]);
  };

  const getStatusColor = (s: string) =>
    s === 'completed'
      ? 'text-green-600 bg-green-100'
      : s === 'uploading'
      ? 'text-blue-600 bg-blue-100'
      : s === 'error'
      ? 'text-red-600 bg-red-100'
      : 'text-gray-600 bg-gray-100';

  const getStatusIcon = (s: string) => {
    if (s === 'completed')
      return (
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    if (s === 'uploading')
      return (
        <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      );
    if (s === 'error')
      return (
        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    return (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Modern Progress Indicator */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">Resume Upload & Analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-500">Step 6 of 6</div>
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Team Resume Upload
              </h1>
              <p className="text-gray-600 mt-1">Upload and analyze your team's resumes for comprehensive skill assessment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Upload Resumes</h3>
                  <p className="text-sm text-gray-600">Add multiple team member resumes for analysis</p>
                </div>
              </div>

              {/* Enhanced Drop Zone */}
              <div
                className="relative border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={e => handleFiles(e.target.files)}
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Drop files here or click to browse</h4>
                  <p className="text-gray-600 mb-6">Support for PDF, DOC, DOCX files • Max 10MB each</p>
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  className="px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl font-medium transition-all duration-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add More Files
                </button>
                <button
                  className="px-4 py-2 text-sm bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-700 rounded-xl font-medium transition-all duration-200"
                  onClick={clearAll}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>
            </div>

            {/* Resume Text Preview */}
            {currentResumeText && (
              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Extracted Resume Content</h3>
                    <p className="text-sm text-gray-600">AI-powered text extraction preview</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                    {currentResumeText.length > 500 ? `${currentResumeText.substring(0, 500)}... [TRUNCATED - ${currentResumeText.length} total characters]` : currentResumeText}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Files Panel */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Uploaded Files</h3>
                    <p className="text-xs text-gray-600">{uploadedFiles.length} files ready</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">No files uploaded yet</p>
                      <p className="text-xs text-gray-400 mt-1">Start by uploading team resumes</p>
                    </div>
                  ) : (
                    uploadedFiles.map(file => (
                      <div key={file.id} className="bg-gradient-to-r from-white to-gray-50 border rounded-2xl p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{file.size}</span>
                                <span>•</span>
                                <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(file.status)}`}>
                                  {file.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {file.status === 'uploading' && (
                          <div className="mt-3">
                            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{file.progress}% uploaded</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-800">Ready for Analysis</p>
                        <p className="text-xs text-green-600">{uploadedFiles.filter(f => f.status === 'completed').length} files processed successfully</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 px-6 py-3 rounded-2xl hover:bg-gray-100 font-medium"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Requirements
          </button>
          
          <div className="flex gap-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors duration-200">
              Save as Draft
            </button>
            <button
              onClick={() => window.location.href = '/index.html?screen=EmployeeSkillCards'}
              disabled={uploadedFiles.length === 0}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                uploadedFiles.length > 0
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Analyze Skills
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
