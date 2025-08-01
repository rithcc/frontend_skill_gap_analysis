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
              // Map snake_case keys to camelCase keys for professional_summary if needed
              let professionalSummary = firstResumeData.professional_summary || null;
              // Support both camelCase and snake_case keys from API
              if (professionalSummary) {
                // If already in UI format, use as is
                if (
                  professionalSummary["PDLC Phases"] !== undefined ||
                  professionalSummary["Key Strengths"] !== undefined ||
                  professionalSummary["Recent Learning"] !== undefined
                ) {
                  // do nothing
                } else if (
                  professionalSummary.pdlc_phases !== undefined ||
                  professionalSummary.key_strengths !== undefined ||
                  professionalSummary.recent_learning !== undefined
                ) {
                  professionalSummary = {
                    "PDLC Phases": professionalSummary.pdlc_phases ?? null,
                    "Key Strengths": professionalSummary.key_strengths ?? null,
                    "Recent Learning": professionalSummary.recent_learning ?? null
                  };
                }
              }
              console.log('[EmployeeSkillCards] professionalSummary after mapping:', professionalSummary);
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
                professional_summary: professionalSummary,
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
    <div className="min-h-screen bg-white p-4 font-sans text-base">
      {/* Centered Title and Description */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Employee Skills Analysis
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2 max-w-2xl mx-auto">
          This page provides a comprehensive overview of the employee's skills, technologies, tools, certifications, and career timeline based on the uploaded resume. Review the details below and proceed to conduct a skill gap analysis.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Personal Information */}

       {resumeData.personal_info && (
          <div className="relative bg-gradient-to-br from-blue-500/10 via-blue-400/10 to-blue-300/10 backdrop-blur-xl rounded-3xl shadow-xl border border-blue-200 p-6 mb-8 flex justify-center overflow-hidden">
            {/* Blue Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/10 to-blue-300/10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-300/10 rounded-full -translate-y-8 translate-x-8 pointer-events-none"></div>
            <div className="relative w-full max-w-xl flex flex-col items-center z-10">
              <div className="flex flex-col items-center mb-4">
                <h2 className="text-xl font-extrabold text-gray-900 mb-1 text-center uppercase tracking-wide">
                  {resumeData.personal_info.name}
                </h2>
                <p className="text-base text-blue-700 font-semibold text-center mb-1">
                  {resumeData.personal_info.title}
                </p>
                {resumeData.experience_overview && (
                  <p className="text-sm text-gray-500 mt-0.5 text-center">
                    {resumeData.experience_overview.total_experience_years} years experience • Full-time Professional
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs w-full">
                <div className="flex items-center space-x-2 justify-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{resumeData.personal_info.email}</span>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{maskPhoneNumber(resumeData.personal_info.phone)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Professional Summary (moved up) */}
        {resumeData.professional_summary && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-4 mb-4">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Professional Summary
            </h3>
            {/* Only show Key Strengths content, no title, no outer box, no diploma list */}
            {resumeData.professional_summary["Key Strengths"] && (
              Array.isArray(resumeData.professional_summary["Key Strengths"]) ? (
                <div className="mt-2">
                  {resumeData.professional_summary["Key Strengths"].map((strength, idx) => (
                    <p key={idx} className="text-sm text-gray-700 mb-2 last:mb-0">{strength}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700 mt-2">{resumeData.professional_summary["Key Strengths"]}</p>
              )
            )}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Industries & Domains */}
            {(resumeData.industries || resumeData.domains || resumeData.use_cases) && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
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
                            <span className="text-sm">{industry}</span>
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
                            <span className="text-sm">{domain}</span>
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
                            <span className="text-sm">{useCase}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technologies & Tools Combined */}
            {((Array.isArray(resumeData.technologies) && resumeData.technologies.length > 0) || (Array.isArray(resumeData.tools) && resumeData.tools.length > 0)) && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-4">
                <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v-2m6 2v-2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  Technologies & Tools
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray(resumeData.technologies) && resumeData.technologies.length > 0 && resumeData.technologies.map((tech, index) => (
                    <div key={index} className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-sm text-indigo-700 rounded-xl text-center font-medium border border-indigo-200">
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                  {Array.isArray(resumeData.tools) && resumeData.tools.length > 0 && resumeData.tools.map((tool, index) => (
                    <div key={index} className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-sm text-emerald-700 rounded-xl text-center font-medium border border-emerald-200">
                      <span className="text-sm">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Certifications (separate box, yellow/orange color) */}
            {resumeData.qualifications && (resumeData.qualifications.certifications?.length ?? 0) > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-300 p-4">
                <h3 className="text-base font-bold text-black mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.qualifications.certifications?.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-black rounded-xl text-sm font-medium border border-yellow-300">
                      <span className="text-sm">{cert}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compliances */}
            {resumeData.compliances && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
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
            {/* Experience Overview removed */}
            {/* Education */}
            {resumeData.qualifications && (resumeData.qualifications.education?.length ?? 0) > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  Education
                </h3>
                <div className="space-y-2">
                  {resumeData.qualifications.education?.map((edu, index) => (
                    <div key={index} className="p-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                      <p className="text-sm text-gray-700 font-medium">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications box removed; now under Tools & Platforms with yellow/orange color */}

            {/* Work History */}
            {resumeData.work_history && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6a2 2 0 012-2h4a2 2 0 012 2z" />
                    </svg>
                  </div>
                  Career Timeline
                </h3>
                <div className="space-y-2">
                  {resumeData.work_history.map((job, index) => (
                    <div key={index} className="relative pl-6 pb-2">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-2 border-white shadow-lg"></div>
                      {index < resumeData.work_history!.length - 1 && (
                        <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gradient-to-b from-teal-200 to-transparent"></div>
                      )}
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-2 border border-teal-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">{job.role}</h4>
                            <p className="text-sm text-teal-700 font-medium">{job.company}</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-lg font-medium">
                            {job.start_year}-{job.end_year}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qualifications box removed; now inside Tools & Platforms */}
          </div>
        </div>
      </div>
    </div>
  );
}
