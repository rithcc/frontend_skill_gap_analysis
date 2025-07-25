'use client';
import React, { useEffect, useState } from "react";

interface ResumeData {
  personal_info: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  } | null;
  industries: string[] | null;
  domains: string[] | null;
  use_cases: string[] | null;
  technologies: string[] | null;
  tools: string[] | null;
  compliances: string[] | null;
  experience_overview: {
    total_experience_years: number;
    areas: {
      Skill: string;
      "percentage of Proficiency": string;
      years: number;
    }[];
  } | null;
  work_history: {
    role: string;
    company: string;
    start_year: number;
    end_year: number | string;
  }[] | null;
  professional_summary: {
    "PDLC Phases": string[] | null;
    "Key Strengths": string[] | string | null;
    "Recent Learning": string[] | null;
  } | null;
  qualifications: {
    education: string[] | null;
    certifications: string[] | null;
  } | null;
}

const maskPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const countryCodeMatch = phone.match(/^(\+\d{1,3})/);
  const countryCode = countryCodeMatch ? countryCodeMatch[1] : '';
  const maskedDigits = phone.slice(countryCode.length).replace(/\d/g, '*');
  return countryCode + maskedDigits;
};

interface EmployeeSkillCardsProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function EmployeeSkillCards({ onNext, onBack }: EmployeeSkillCardsProps) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load real data from localStorage
    const loadResumeData = () => {
      try {
        // Check if we have resume data from the upload step
        const combinedResumeText = localStorage.getItem('combinedResumeText');
        const structuredResumeData = localStorage.getItem('structuredResumeData');
        const resumeMetadata = localStorage.getItem('resumeMetadata');
        
        console.log('[EmployeeSkillCards] Loading data from localStorage');
        console.log('[EmployeeSkillCards] Combined text length:', combinedResumeText?.length || 0);
        console.log('[EmployeeSkillCards] Structured data:', structuredResumeData);
        console.log('[EmployeeSkillCards] Resume metadata:', resumeMetadata);
        
        // Try to parse structured data first
        if (structuredResumeData) {
          try {
            const parsedStructuredData = JSON.parse(structuredResumeData);
            console.log('[EmployeeSkillCards] Using structured data from API:', parsedStructuredData);
            
            if (parsedStructuredData.length > 0) {
              // For now, use the first resume's data
              const firstResumeData = parsedStructuredData[0];
              
              // Try to get the original API response if it was stored
              // For now, we'll create a structure from what we have
              const resumeData: ResumeData = {
                personal_info: firstResumeData.personal_info || null,
                industries: firstResumeData.industries || null,
                domains: firstResumeData.domains || null,
                use_cases: firstResumeData.use_cases || null,
                technologies: firstResumeData.technologies || null,
                tools: firstResumeData.tools || null,
                compliances: firstResumeData.compliances || null,
                experience_overview: firstResumeData.experience_overview || null,
                work_history: firstResumeData.work_history || null,
                professional_summary: firstResumeData.professional_summary || null,
                qualifications: firstResumeData.qualifications || null
              };
              
              setResumeData(resumeData);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn('[EmployeeSkillCards] Failed to parse structured data:', e);
          }
        }
        
        // If we have combined text but no structured data, try to parse the text
        if (combinedResumeText && combinedResumeText.trim()) {
          console.log('[EmployeeSkillCards] Parsing resume text to extract structured data');
          
          // Extract information from the formatted text
          const extractedData: ResumeData = {
            personal_info: null,
            industries: null,
            domains: null,
            use_cases: null,
            technologies: null,
            tools: null,
            compliances: null,
            experience_overview: null,
            work_history: null,
            professional_summary: null,
            qualifications: null
          };
          
          // Parse personal info
          const personalInfoMatch = combinedResumeText.match(/=== PERSONAL INFORMATION ===([\s\S]*?)(?===|$)/);
          if (personalInfoMatch) {
            const personalInfo = personalInfoMatch[1];
            const nameMatch = personalInfo.match(/Name: (.+)/);
            const titleMatch = personalInfo.match(/Title: (.+)/);
            const emailMatch = personalInfo.match(/Email: (.+)/);
            const phoneMatch = personalInfo.match(/Phone: (.+)/);
            const locationMatch = personalInfo.match(/Location: (.+)/);
            
            if (nameMatch || titleMatch || emailMatch || phoneMatch || locationMatch) {
              extractedData.personal_info = {
                name: nameMatch?.[1]?.trim() || "Resume Holder",
                title: titleMatch?.[1]?.trim() || "Professional",
                email: emailMatch?.[1]?.trim() || "contact@email.com",
                phone: phoneMatch?.[1]?.trim() || "+1-XXX-XXXX",
                location: locationMatch?.[1]?.trim() || "Location"
              };
            }
          }
          
          // Parse technologies
          const techMatch = combinedResumeText.match(/=== TECHNOLOGIES ===([\s\S]*?)(?===|$)/);
          if (techMatch) {
            const techText = techMatch[1].trim();
            if (techText) {
              extractedData.technologies = techText.split(',').map(t => t.trim()).filter(t => t);
            }
          }
          
          // Parse tools
          const toolsMatch = combinedResumeText.match(/=== TOOLS ===([\s\S]*?)(?===|$)/);
          if (toolsMatch) {
            const toolsText = toolsMatch[1].trim();
            if (toolsText) {
              extractedData.tools = toolsText.split(',').map(t => t.trim()).filter(t => t);
            }
          }
          
          // Parse industries
          const industriesMatch = combinedResumeText.match(/=== INDUSTRIES ===([\s\S]*?)(?===|$)/);
          if (industriesMatch) {
            const industriesText = industriesMatch[1].trim();
            if (industriesText) {
              extractedData.industries = industriesText.split(',').map(t => t.trim()).filter(t => t);
            }
          }
          
          // Parse domains
          const domainsMatch = combinedResumeText.match(/=== DOMAINS ===([\s\S]*?)(?===|$)/);
          if (domainsMatch) {
            const domainsText = domainsMatch[1].trim();
            if (domainsText) {
              extractedData.domains = domainsText.split(',').map(t => t.trim()).filter(t => t);
            }
          }
          
          // Parse experience overview
          const expMatch = combinedResumeText.match(/=== EXPERIENCE OVERVIEW ===([\s\S]*?)(?===|$)/);
          if (expMatch) {
            const expText = expMatch[1];
            const yearsMatch = expText.match(/Total Experience: (\d+) years/);
            
            if (yearsMatch) {
              extractedData.experience_overview = {
                total_experience_years: parseInt(yearsMatch[1]),
                areas: []
              };
              
              // Parse skills
              const skillMatches = expText.match(/- (.+?): (.+?) \((\d+) years\)/g);
              if (skillMatches) {
                extractedData.experience_overview.areas = skillMatches.map(match => {
                  const parts = match.match(/- (.+?): (.+?) \((\d+) years\)/);
                  return {
                    Skill: parts?.[1] || '',
                    "percentage of Proficiency": parts?.[2] || '',
                    years: parseInt(parts?.[3] || '0')
                  };
                });
              }
            }
          }
          
          // Parse work history
          const workMatch = combinedResumeText.match(/=== WORK HISTORY ===([\s\S]*?)(?===|$)/);
          if (workMatch) {
            const workText = workMatch[1];
            const jobMatches = workText.match(/(.+?) at (.+?) \((\d+) - (.+?)\)/g);
            if (jobMatches) {
              extractedData.work_history = jobMatches.map(match => {
                const parts = match.match(/(.+?) at (.+?) \((\d+) - (.+?)\)/);
                return {
                  role: parts?.[1]?.trim() || '',
                  company: parts?.[2]?.trim() || '',
                  start_year: parseInt(parts?.[3] || '0'),
                  end_year: parts?.[4]?.trim() === 'Present' ? 'Present' : parseInt(parts?.[4] || '0')
                };
              });
            }
          }
          
          // Parse professional summary
          const summaryMatch = combinedResumeText.match(/=== PROFESSIONAL SUMMARY ===([\s\S]*?)(?===|$)/);
          if (summaryMatch) {
            const summaryText = summaryMatch[1];
            const strengthsMatch = summaryText.match(/Key Strengths:([\s\S]*?)(?=Recent Learning:|$)/);
            const learningMatch = summaryText.match(/Recent Learning:([\s\S]*?)(?===|$)/);
            
            extractedData.professional_summary = {
              "PDLC Phases": null,
              "Key Strengths": null,
              "Recent Learning": null
            };
            
            if (strengthsMatch) {
              const strengths = strengthsMatch[1].trim().split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
              if (strengths.length > 0) {
                extractedData.professional_summary["Key Strengths"] = strengths;
              }
            }
            
            if (learningMatch) {
              const learning = learningMatch[1].trim().split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
              if (learning.length > 0) {
                extractedData.professional_summary["Recent Learning"] = learning;
              }
            }
          }
          
          // Parse qualifications
          const qualMatch = combinedResumeText.match(/=== QUALIFICATIONS ===([\s\S]*?)(?===|$)/);
          if (qualMatch) {
            const qualText = qualMatch[1];
            const eduMatch = qualText.match(/Education:([\s\S]*?)(?=Certifications:|$)/);
            const certMatch = qualText.match(/Certifications:([\s\S]*?)(?===|$)/);
            
            extractedData.qualifications = {
              education: null,
              certifications: null
            };
            
            if (eduMatch) {
              const education = eduMatch[1].trim().split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
              if (education.length > 0) {
                extractedData.qualifications.education = education;
              }
            }
            
            if (certMatch) {
              const certifications = certMatch[1].trim().split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
              if (certifications.length > 0) {
                extractedData.qualifications.certifications = certifications;
              }
            }
          }
          
          console.log('[EmployeeSkillCards] Extracted data from resume text:', extractedData);
          setResumeData(extractedData);
        } else {
          console.log('[EmployeeSkillCards] No resume data found, using fallback mock data');
          // Fallback to original mock data if no resume text is available
          const mockData: ResumeData = {
            personal_info: {
              name: "Demo User",
              title: "Sample Professional",
              email: "demo@example.com",
              phone: "+1-555-0123",
              location: "Sample Location"
            },
            industries: ["Demo Industry"],
            domains: ["Demo Domain"],
            use_cases: ["Demo Use Case"],
            technologies: ["React", "TypeScript", "Node.js"],
            tools: ["VS Code", "Git"],
            compliances: ["Demo Compliance"],
            experience_overview: {
              total_experience_years: 5,
              areas: [
                { Skill: "Demo Skill", "percentage of Proficiency": "80%", years: 5 }
              ]
            },
            work_history: [
              { role: "Demo Role", company: "Demo Company", start_year: 2020, end_year: "Present" }
            ],
            professional_summary: {
              "PDLC Phases": ["Demo Phase"],
              "Key Strengths": ["Demo Strength"],
              "Recent Learning": ["Demo Learning"]
            },
            qualifications: {
              education: ["Demo Education"],
              certifications: ["Demo Certification"]
            }
          };
          
          setResumeData(mockData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('[EmployeeSkillCards] Error loading resume data:', error);
        setLoading(false);
      }
    };

    loadResumeData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Processing resume data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-red-700">Error: {error}</p>
      </div>
    </div>
  );

  if (!resumeData) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-700">No resume data found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      {/* Modern Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Employee Skills Analysis
                </h1>
                <p className="text-sm text-gray-600">AI-powered resume insights and skill mapping</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <div className="text-xs text-gray-500 mt-1">Generated by AI Analysis Engine</div>
            </div>
          </div>
        </div>
        
        {/* Data Source Indicator */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-800">
              {(() => {
                const hasResumeData = localStorage.getItem('combinedResumeText');
                return hasResumeData ? 
                  `Data Source: Uploaded Resume Content (${hasResumeData.length} characters processed)` : 
                  'Data Source: Demo Preview (Upload resumes in previous step for real analysis)';
              })()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Personal Information */}
        {resumeData.personal_info && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{resumeData.personal_info.name}</h2>
                    <p className="text-lg text-gray-600 font-medium">{resumeData.personal_info.title}</p>
                    {resumeData.experience_overview && (
                      <p className="text-sm text-gray-500 mt-1">
                        {resumeData.experience_overview.total_experience_years} years experience • Full-time Professional
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{resumeData.personal_info.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{maskPhoneNumber(resumeData.personal_info.phone)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{resumeData.personal_info.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={onNext || (() => window.location.href = '/index.html?screen=AnalysisProgress')}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  🚀 Conduct Skill Gap Analysis
                </button>
                <button
                  onClick={onBack || (() => window.location.href = '/index.html?screen=ResumeUpload')}
                  className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-center font-medium"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Industries & Domains */}
            {(resumeData.industries || resumeData.domains || resumeData.use_cases) && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Industries & Domains
                </h3>
                <div className="space-y-4">
                  {resumeData.industries && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Industries</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.industries.map((industry, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-xl text-sm font-medium border border-blue-200">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {resumeData.domains && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Domains</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.domains.map((domain, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-xl text-sm font-medium border border-green-200">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {resumeData.use_cases && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Use Cases</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.use_cases.map((useCase, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl text-sm font-medium border border-purple-200">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technologies */}
            {resumeData.technologies && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  Technologies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resumeData.technologies.map((tech, index) => (
                    <div key={index} className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-center font-medium border border-indigo-200 hover:shadow-md transition-shadow">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {resumeData.tools && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Tools & Platforms
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resumeData.tools.map((tool, index) => (
                    <div key={index} className="px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-xl text-center font-medium border border-emerald-200 hover:shadow-md transition-shadow">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliances */}
            {resumeData.compliances && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Compliances & Standards
                </h3>
                <div className="space-y-3">
                  {resumeData.compliances.map((compliance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <span className="text-gray-700 font-medium">{compliance}</span>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Experience Overview */}
            {resumeData.experience_overview && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Experience Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <span className="text-gray-700 font-medium">Total Experience</span>
                    <span className="text-xl font-bold text-orange-600">{resumeData.experience_overview.total_experience_years} years</span>
                  </div>
                  {resumeData.experience_overview.areas.map((area, index) => (
                    <div key={index} className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{area.Skill}</span>
                        <span className="text-blue-600 font-bold">
                          {area["percentage of Proficiency"]} ({area.years}y)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: area["percentage of Proficiency"] }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work History */}
            {resumeData.work_history && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6a2 2 0 012-2h4a2 2 0 012 2z" />
                    </svg>
                  </div>
                  Career Timeline
                </h3>
                <div className="space-y-4">
                  {resumeData.work_history.map((job, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-2 border-white shadow-lg"></div>
                      {index < resumeData.work_history!.length - 1 && (
                        <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gradient-to-b from-teal-200 to-transparent"></div>
                      )}
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{job.role}</h4>
                            <p className="text-teal-700 font-medium">{job.company}</p>
                          </div>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg font-medium">
                            {job.start_year}-{job.end_year}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {resumeData.professional_summary && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Professional Summary
                </h3>
                
                <div className="space-y-4">
                  {resumeData.professional_summary["PDLC Phases"] && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">PDLC Phases</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.professional_summary["PDLC Phases"].map((phase, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-xl text-sm font-medium border border-pink-200">
                            {phase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {resumeData.professional_summary["Key Strengths"] && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Key Strengths</h4>
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                        {Array.isArray(resumeData.professional_summary["Key Strengths"]) ? (
                          resumeData.professional_summary["Key Strengths"].map((strength, index) => (
                            <p key={index} className="text-gray-700 text-sm leading-relaxed mb-2 last:mb-0">
                              • {strength}
                            </p>
                          ))
                        ) : (
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {resumeData.professional_summary["Key Strengths"]}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {resumeData.professional_summary["Recent Learning"] && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Recent Learning</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.professional_summary["Recent Learning"].map((learning, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-xl text-sm font-medium border border-yellow-200">
                            {learning}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Qualifications */}
            {resumeData.qualifications && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  Qualifications
                </h3>
                <div className="space-y-4">
                  {resumeData.qualifications.education && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Education</h4>
                      <div className="space-y-2">
                        {resumeData.qualifications.education.map((edu, index) => (
                          <div key={index} className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                            <p className="text-gray-700 font-medium">{edu}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {resumeData.qualifications.certifications && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.qualifications.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 rounded-xl text-sm font-medium border border-violet-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
