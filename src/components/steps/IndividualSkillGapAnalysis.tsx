'use client';
import React from "react";

interface IndividualSkillGapAnalysisProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function IndividualSkillGapAnalysis({ onNext, onBack }: IndividualSkillGapAnalysisProps) {
  // Remove all static data
  const extractedResults = React.useMemo(() => {
    try {
      const data = localStorage.getItem('extractedResumeResults');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }, []);

  // Define a type for skills to avoid using 'any'
  interface Skill {
    skill: string;
    type?: string;
    competence?: string;
    justification?: string;
  }

  // Helper to render skills and categories
  const renderSkills = (skills: Skill[]) => (
    <ul className="list-disc pl-6 space-y-1">
      {skills.map((skill, idx) => (
        <li key={idx} className="text-gray-800">
          <span className="font-semibold">{skill.skill}</span>
          {skill.type && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{skill.type}</span>
          )}
          {skill.competence && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{skill.competence}</span>
          )}
          {skill.justification && (
            <span className="ml-2 text-gray-500 italic">({skill.justification})</span>
          )}
        </li>
      ))}
    </ul>
  );

  interface Category {
    type: string;
    skills?: string[];
    competence?: string;
  }

  const renderCategories = (categories: Category[]) => (
    <ul className="list-disc pl-6 space-y-1">
      {categories.map((cat, idx) => (
        <li key={idx} className="text-gray-800">
          <span className="font-semibold">{cat.type}</span>:
          <span className="ml-2">{cat.skills?.join(', ')}</span>
          {cat.competence && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">{cat.competence}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header with Glassmorphism */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                Individual Skill Gap Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
                alt="CreamCollar - Crafting Futures" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {extractedResults.length === 0 ? (
          <div className="bg-white/80 rounded-2xl p-8 border border-blue-200 mb-8 text-center text-lg text-gray-600">
            No extracted resume data found. Please upload a resume to analyze skills.
          </div>
        ) : (
          extractedResults.map((result, idx) => (
            <div key={idx} className="bg-white/80 rounded-2xl p-8 border border-blue-200 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Resume Analysis Result {extractedResults.length > 1 ? `#${idx + 1}` : ''}</h3>
              {result.name && (
                <div className="mb-2 text-lg font-semibold text-gray-800">Name: {result.name}</div>
              )}
              {result.role && (
                <div className="mb-2 text-lg font-semibold text-gray-800">Role: {result.role}</div>
              )}
              {result.skills && result.skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-blue-700 mb-2">Skills</h4>
                  {renderSkills(result.skills)}
                </div>
              )}
              {result.categories && result.categories.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-purple-700 mb-2">Skill Categories</h4>
                  {renderCategories(result.categories)}
                </div>
              )}
              {/* Show any other fields as needed */}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-500">Raw Extraction Data</summary>
                <pre className="text-xs text-gray-500 bg-gray-50 rounded p-2 mt-2 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
