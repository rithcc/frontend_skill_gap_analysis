"use client";
import React, { useRef, useState, useEffect } from "react";

interface UploadRequirementsProps {
  onBack?: () => void;
  onNext?: () => void;
  onUploadComplete?: () => void;
}

export default function UploadRequirements({
  onBack,
  onNext,
  onUploadComplete,
}: UploadRequirementsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically save data when file is selected
  // useEffect(() => {
  //   if (selectedFile) {
  //     const extractedData = {
  //       ROLE_NAME: "Extracted Role", // This would come from document analysis
  //       TOOLS: [
  //         { name: "Python", priority: "High" as const, type: "Tool" as const },
  //         { name: "SQL", priority: "High" as const, type: "Tool" as const },
  //         { name: "Git", priority: "Medium" as const, type: "Tool" as const },
  //         { name: "Docker", priority: "Medium" as const, type: "Tool" as const }
  //       ],
  //       TECHNOLOGIES: [
  //         { name: "Machine Learning", priority: "High" as const, type: "Technology" as const },
  //         { name: "Data Analysis", priority: "High" as const, type: "Technology" as const },
  //         { name: "Cloud Computing", priority: "Medium" as const, type: "Technology" as const }
  //       ],
  //       COMPLIANCES: [
  //         { name: "GDPR", priority: "High" as const },
  //         { name: "Data Privacy", priority: "High" as const },
  //         { name: "ISO 27001", priority: "Medium" as const }
  //       ],
  //       TASKS: [
  //         "Analyze complex datasets to extract meaningful insights",
  //         "Develop and implement machine learning models",
  //         "Create data visualizations and reports",
  //         "Collaborate with cross-functional teams"
  //       ],
  //       SKILLS: [
  //         "Bachelor's degree in relevant field",
  //         "3+ years of experience in data analysis",
  //         "Strong programming skills",
  //         "Experience with machine learning frameworks"
  //       ]
  //     };

  //     localStorage.setItem('selectedRole', JSON.stringify(extractedData));
  //     localStorage.setItem('requirementsSource', 'uploaded_document');

  //     // Trigger upload complete callback
  //     if (onUploadComplete) {
  //       onUploadComplete();
  //     }
  //   }
  // }, [selectedFile, onUploadComplete]);

  useEffect(() => {
    const uploadFile = async () => {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append("file", selectedFile);
      setUploading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/upload-requirements/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Extracted data:", result);

        localStorage.setItem("selectedRole", JSON.stringify(result));
        localStorage.setItem("requirementsSource", "uploaded_document");

        // ✅ Ensure callback exists and is called safely
        onUploadComplete?.();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Upload error:", err.message);
        } else {
          console.error("Unknown upload error:", err);
        }
        setError("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    };

    uploadFile();
  }, [selectedFile, onUploadComplete]); // ✅ include onUploadComplete in dependencies

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start font-sans overflow-hidden">
      {/* Top heading section */}
      <div className="w-full max-w-5xl px-4 pt-10 pb-6 mx-auto">
        <div className="text-center w-full">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Upload Requirements
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-1xl mx-auto leading-normal">
            Upload your existing skill requirements document
          </p>
        </div>
      </div>

      {/* Main Content - two big boxes side by side */}
      <main className="w-full max-w-4xl px-2 flex flex-col md:flex-row gap-10 items-start justify-center flex-1 mt-6 mx-auto min-h-[calc(100vh-180px)]">
        {/* Upload Area */}
        <div
          className="max-w-sm w-full bg-white rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-400 transition-colors cursor-pointer flex flex-col justify-center min-h-[300px] md:min-h-[340px] mx-auto"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drag and drop your files here
          </h3>
          <p className="text-base text-gray-600 mb-2">
            or click to browse from your computer
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
          </p>
        </div>

        {/* Uploaded Files List */}
        <div className="max-w-sm w-full bg-white rounded-2xl border border-gray-200 p-6 flex flex-col min-h-[300px] md:min-h-[340px] items-center justify-center mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Uploaded Files
          </h3>
          {!selectedFile && (
            <div className="flex flex-col items-center mb-4">
              <div className="flex flex-col items-center">
                <svg
                  className="w-6 h-6 mb-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm text-gray-500">No additional files uploaded</span>
              </div>
            </div>
          )}
          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800 transition-colors"
                onClick={() => setSelectedFile(null)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
