'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";

// 🔹 Interfaces
interface RequirementsBuilderProps {
  onNext?: () => void;
  onBack?: () => void;
  selectedRoleId?: string;
  selectedRoleName?: string;
}

interface RequirementProfile {
  id?: string;
  skillExperience: number;
  skillCompetence: string;
  timeline: number;
  budget: number;
  technicalLevel: number;
  domainLevel: number;
  processLevel: number;
  managerialLevel: number;
  collaborationLevel: number;
  documentId?: string;
  roleId?: string;
}

// 🔹 Labels
const experienceLabels = ['Entry (0-1y)', 'Junior (1-3y)', 'Mid (3-5y)', 'Senior (5-8y)', 'Expert (8y+)'];
const competenceLabels = ['Basic', 'Working', 'Proficient', 'Advanced', 'Expert'];

// 🔹 Main Component
export default function RequirementsBuilder({ onNext, onBack, selectedRoleId, selectedRoleName }: RequirementsBuilderProps) {
  console.log('RequirementsBuilder rendering...', { onNext, onBack });

  // State management
  const [skillExperience, setSkillExperience] = useState<number>(2);
  const [skillCompetence, setSkillCompetence] = useState('Proficient');
  const [timeline, setTimeline] = useState(6);
  const [budget, setBudget] = useState(25000);
  const [technicalLevel, setTechnicalLevel] = useState(3);
  const [domainLevel, setDomainLevel] = useState(4);
  const [processLevel, setProcessLevel] = useState(2);
  const [managerialLevel, setManagerialLevel] = useState(1);
  const [collaborationLevel, setCollaborationLevel] = useState(3);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [requirementProfileId, setRequirementProfileId] = useState<string | null>(null);
  const [requirementsSource, setRequirementsSource] = useState<'manual' | 'uploaded_document'>('manual');
  // Define SkillProficiency type to fix the error
  type SkillProficiency = {
    skill: string;
    level: number;
    competence: string;
  };
  const [skillProficiencies, setSkillProficiencies] = useState<SkillProficiency[]>([]);
  const competenceLevels = [
    { value: 'Basic', level: 1, color: 'bg-gray-100 text-gray-700', selectedColor: 'bg-gray-500 text-white' },
    { value: 'Working', level: 2, color: 'bg-blue-100 text-blue-700', selectedColor: 'bg-blue-500 text-white' },
    { value: 'Proficient', level: 3, color: 'bg-green-100 text-green-700', selectedColor: 'bg-green-500 text-white' },
    { value: 'Advanced', level: 4, color: 'bg-purple-100 text-purple-700', selectedColor: 'bg-purple-500 text-white' },
    { value: 'Expert', level: 5, color: 'bg-red-100 text-red-700', selectedColor: 'bg-red-500 text-white' }
  ];

  const getSkillLevelLabel = (level: number) => {
    return competenceLabels[level - 1];
  };

  const skillTypeColors = {
    technical: {
      dot: (level: number) => `bg-blue-${level * 200}`,
      badge: 'bg-blue-100 text-blue-800',
      hex: '#3b82f6'
    },
    domain: {
      dot: (level: number) => `bg-green-${level * 200}`,
      badge: 'bg-green-100 text-green-800',
      hex: '#10b981'
    },
    process: {
      dot: (level: number) => `bg-purple-${level * 200}`,
      badge: 'bg-purple-100 text-purple-800',
      hex: '#6366f1'
    },
    managerial: {
      dot: (level: number) => `bg-yellow-${level * 200}`,
      badge: 'bg-yellow-100 text-yellow-800',
      hex: '#eab308'
    },
    collaboration: {
      dot: (level: number) => `bg-pink-${level * 200}`,
      badge: 'bg-pink-100 text-pink-800',
      hex: '#ec4899'
    }
  };

  const skillTypeHexColors = {
    technical: '#3b82f6',   // blue-500
    domain: '#10b981',     // green-500
    process: '#6366f1',    // purple-500
    managerial: '#eab308',   // yellow-500
    collaboration: '#ec4899' // pink-500
  };

  // Add missing state at the top of the component
  const [skillCategories, setSkillCategories] = useState<{type: string, skills: string[], competence: string}[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);

  // Helper component for consistent skill level display
  const SkillLevelDisplay = ({ level, type }: { level: number, type: string }) => {
    const typeKey = type.toLowerCase() as keyof typeof skillTypeColors;
    const colors = skillTypeColors[typeKey] || skillTypeColors.technical;
    
    // Find skills for this category
    const category = skillCategories.find(c => c.type.toLowerCase() === type.toLowerCase());
    const includedSkills = category?.skills.join(', ') || 'Not specified';
    const hexColor = skillTypeHexColors[typeKey] || '#3b82f6';
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${colors.dot(level)}`}></div>
            {type.charAt(0).toUpperCase() + type.slice(1)} Skills
          </label>
          <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-medium`}>
            {getSkillLevelLabel(level)}
          </span>
        </div>
        
        <div className="space-y-2">
       
          <input
  type="range"
  min="1"
  max="5"
  value={level}
  onChange={(e) => {
    const newLevel = parseInt(e.target.value);
    if (typeKey === 'technical') setTechnicalLevel(newLevel);
    else if (typeKey === 'domain') setDomainLevel(newLevel);
    else if (typeKey === 'process') setProcessLevel(newLevel);
    else if (typeKey === 'managerial') setManagerialLevel(newLevel);
    else if (typeKey === 'collaboration') setCollaborationLevel(newLevel);
  }}
  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    background: `linear-gradient(to right, ${hexColor} 0%, ${hexColor} ${((level - 1) / 4) * 100}%, #e5e7eb ${((level - 1) / 4) * 100}%, #e5e7eb 100%)`
  }}
/>

        
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-medium">Includes:</span> {includedSkills}
        </div>
      </div>
    );
  };

  // 🧠 API Integration
  const classifySkills = async (skills: string[], roleContext: string) => {
    setLoadingSkills(true);
    try {
      const response = await fetch('http://localhost:8001/classify-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, role_context: roleContext })
      });
      const result = await response.json();
      setSkillCategories(result.categories || []);
    } catch (error) {
      setSkillCategories([]);
    } finally {
      setLoadingSkills(false);
    }
  };

  // Effects
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Example: Call classifySkills when the component mounts or when skills change
  useEffect(() => {
    // Example skills and role context
    const skills = ['Python', 'Project Management', 'Teamwork'];
    const roleContext = selectedRoleName || '';
    classifySkills(skills, roleContext);
  }, [selectedRoleName]);

  // Load data from localStorage and fetch from backend if needed
  useEffect(() => {
    const loadRequirements = async () => {
      setIsLoading(true);
      try {
        // Check localStorage for requirements source and data
        const storedData = localStorage.getItem('selectedRole');
        const requirementsSource = localStorage.getItem('requirementsSource');
        const parsedData = storedData ? JSON.parse(storedData) : null;
        
        console.log('Stored data:', parsedData);
        console.log('Requirements source:', requirementsSource);
        
        // Handle document upload flow
        if (requirementsSource === 'uploaded_document' && parsedData?.documentId) {
          setRequirementsSource('uploaded_document');
          console.log('Loading requirements from uploaded document:', parsedData.documentId);
          
          // Fetch requirement profile by document ID
          console.log('Making API request to:', `/api/v1/requirement-profiles?documentId=${parsedData.documentId}`);
          const response = await fetch(`/api/v1/requirement-profiles?documentId=${parsedData.documentId}`);
          console.log('API Response status:', response.status, response.statusText);
          if (response.ok) {
            const profiles = await response.json();
            if (profiles.length > 0) {
              const profile = profiles[0]; // Take the first matching profile
              setRequirementProfileId(profile.id);
              setSkillExperience(profile.skillExperience || 2);
              setSkillCompetence(profile.skillCompetence || 'Proficient');
              setTimeline(profile.timeline || 6);
              setBudget(profile.budget || 25000);
              setTechnicalLevel(profile.technicalLevel || 3);
              setDomainLevel(profile.domainLevel || 4);
              setProcessLevel(profile.processLevel || 2);
              setManagerialLevel(profile.managerialLevel || 1);
              setCollaborationLevel(profile.collaborationLevel || 3);
              console.log('Loaded requirement profile from backend:', profile);
            } else {
              console.log('No requirement profile found for document ID:', parsedData.documentId);
              // Set default values for document upload scenario without existing profile
              setSkillExperience(2);
              setSkillCompetence('Proficient');
              setTimeline(6);
              setBudget(25000);
              setTechnicalLevel(3);
              setDomainLevel(4);
              setProcessLevel(2);
              setManagerialLevel(1);
              setCollaborationLevel(3);
            }
          } else {
            console.error('Failed to fetch requirement profile:', response.statusText);
          }
        }
        // Handle manual role selection flow  
        else if (parsedData?.roleId && parsedData?.roleName) {
          setRequirementsSource('manual');
          console.log('Manual requirements mode for role:', parsedData.roleName);
          
          // Try to fetch existing requirements for this role if any
          try {
            const response = await fetch(`/api/v1/requirement-profiles?roleId=${parsedData.roleId}`);
            if (response.ok) {
              const profiles = await response.json();
              if (profiles.length > 0) {
                const profile = profiles[0];
                setRequirementProfileId(profile.id);
                setSkillExperience(profile.skillExperience || 2);
                setSkillCompetence(profile.skillCompetence || 'Proficient');
                setTimeline(profile.timeline || 6);
                setBudget(profile.budget || 25000);
                setTechnicalLevel(profile.technicalLevel || 3);
                setDomainLevel(profile.domainLevel || 4);
                setProcessLevel(profile.processLevel || 2);
                setManagerialLevel(profile.managerialLevel || 1);
                setCollaborationLevel(profile.collaborationLevel || 3);
                console.log('Loaded existing requirement profile for role:', profile);
              }
            }
          } catch (err) {
            console.log('No existing requirements found for this role, using defaults');
          }
        }
        else {
          setRequirementsSource('manual');
          console.log('Default manual requirements mode');
        }
      } catch (err) {
        console.error('Failed to load requirements:', err);
        setError(err instanceof Error ? err : new Error('Failed to load requirements'));
      } finally {
        setIsLoading(false);
      }
    };

    loadRequirements();
  }, []);


  // Save requirement profile to backend
  const saveRequirementProfile = async () => {
    setIsSaving(true);
    try {
      const storedData = localStorage.getItem('selectedRole');
      const parsedData = storedData ? JSON.parse(storedData) : null;
      
      const profileData: RequirementProfile = {
        skillExperience,
        skillCompetence,
        timeline,
        budget,
        technicalLevel,
        domainLevel,
        processLevel,
        managerialLevel,
        collaborationLevel,
        documentId: parsedData?.documentId || undefined,
        roleId: parsedData?.roleId || selectedRoleId || undefined
      };

      let response;
      if (requirementProfileId) {
        // Update existing profile
        console.log('Updating existing profile:', requirementProfileId, profileData);
        response = await fetch(`/api/v1/requirement-profiles/${requirementProfileId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });
      } else {
        // Create new profile
        console.log('Creating new profile:', profileData);
        response = await fetch('/api/v1/requirement-profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });
      }
      console.log('Save response status:', response.status, response.statusText);

      if (response.ok) {
        const savedProfile = await response.json();
        setRequirementProfileId(savedProfile.id);
        console.log('Requirement profile saved successfully:', savedProfile);
        
        // Update localStorage with the saved profile ID
        if (parsedData) {
          parsedData.requirementProfileId = savedProfile.id;
          localStorage.setItem('selectedRole', JSON.stringify(parsedData));
        }
      } else {
        throw new Error(`Failed to save requirement profile: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Failed to save requirement profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to save requirement profile'));
    } finally {
      setIsSaving(false);
    }
  };

  // Error boundary handler
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-red-600">Something went wrong</CardTitle>
            <CardDescription>
              An error occurred while loading this component.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                {error?.message || 'Unknown error occurred'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Reload Page
              </Button>
              {onBack && (
                <Button 
                  variant="outline" 
                  onClick={onBack}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Debug logging for props
  console.log('RequirementsBuilder props:', {
    selectedRoleId,
    selectedRoleName,
    requirementsSource,
    document
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Loading Requirements...</CardTitle>
            <CardDescription>
              {requirementsSource === 'uploaded_document' ? 'Fetching data from uploaded document' : 'Preparing requirement builder'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Update experienceLevelColors to include both filled and outline styles
  const experienceLevelColors = [
    { filled: 'bg-gray-500 text-white border-gray-500', outline: 'bg-gray-100 text-gray-700 border-gray-300' },
    { filled: 'bg-blue-500 text-white border-blue-500', outline: 'bg-blue-100 text-blue-700 border-blue-300' },
    { filled: 'bg-green-500 text-white border-green-500', outline: 'bg-green-100 text-green-700 border-green-300' },
    { filled: 'bg-purple-500 text-white border-purple-500', outline: 'bg-purple-100 text-purple-700 border-purple-300' },
    { filled: 'bg-red-500 text-white border-red-500', outline: 'bg-red-100 text-red-700 border-red-300' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        {/* Centered Header */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
            Requirements Builder
          </h1>
          {loadingSkills && (
            <div className="flex flex-col items-center mt-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
              <div className="text-base font-medium text-blue-700">AI is defining the skill requirements and experience levels...</div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Level */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Experience Level
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Select the target experience level for this role
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {experienceLabels.map((label, index) => (
                      <Button
                        key={index}
                        variant={skillExperience === index ? "default" : "outline"}
                        onClick={() => setSkillExperience(index)}
                        className={`flex-1 min-w-fit transition-all duration-200 border font-semibold ${
                          skillExperience === index
                            ? experienceLevelColors[index].filled + ' shadow-lg'
                            : experienceLevelColors[index].outline + ' opacity-80 hover:opacity-100'
                        }`}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="text-sm text-emerald-800">
                      <span className="font-semibold">Current selection:</span> {experienceLabels[skillExperience]}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Competence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Skill Competence</h3>
                  <p className="text-gray-600">What depth of knowledge is expected?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-3 mb-6">
                {competenceLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSkillCompetence(level.value)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 ${
                      skillCompetence === level.value 
                        ? `${level.selectedColor} shadow-lg transform scale-105` 
                        : level.color + ' hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-sm font-semibold">{level.value}</div>
                    <div className="text-xs mt-1 opacity-75">Level {level.level}</div>
                  </button>
                ))}
              </div>

              {/* Detailed Skill Competence Sliders */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Detailed Competence Levels</h4>
                  
                {skillCategories.length > 0 ? (
                  <div className="space-y-6">
                    {skillCategories.map((category) => (
                      <SkillLevelDisplay 
                        key={category.type}
                        level={
                          category.type.toLowerCase() === 'technical' ? technicalLevel :
                          category.type.toLowerCase() === 'domain' ? domainLevel :
                          category.type.toLowerCase() === 'process' ? processLevel :
                          category.type.toLowerCase() === 'managerial' ? managerialLevel :
                          category.type.toLowerCase() === 'collaboration' ? collaborationLevel :
                          3 // Default
                        }
                        type={category.type}
                      />
                    ))}
                  </div>
                ) : (
                  !loadingSkills && (
                    <div className="text-center py-4 text-gray-500">
                      No skill categories available. Please ensure skills are properly defined.
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Timeline & Budget */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Project Parameters
                </CardTitle>
                <CardDescription className="text-amber-100">
                  Set timeline and budget constraints
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700">Timeline (months)</label>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-4 mb-2">
                        <input
                          type="range"
                          min="1"
                          max="24"
                          value={timeline}
                          onChange={(e) => setTimeline(Number(e.target.value))}
                          className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-lg font-bold text-amber-700 min-w-[3rem]">{timeline}m</span>
                      </div>
                      <div className="flex justify-between text-xs text-amber-600">
                        <span>1m</span>
                        <span>12m</span>
                        <span>24m</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700">Budget ($)</label>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-4 mb-2">
                        <input
                          type="range"
                          min="5000"
                          max="100000"
                          step="5000"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-lg font-bold text-amber-700 min-w-[4rem]">${budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-amber-600">
                        <span>$5K</span>
                        <span>$50K</span>
                        <span>$100K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Requirements Preview
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Summary of your current settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                      <span className="text-sm">🎯</span>
                      Experience Level
                    </h4>
                    <p className="text-sm text-indigo-700 font-medium">{experienceLabels[skillExperience]}</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <span className="text-sm">⭐</span>
                      Competence Required
                    </h4>
                    <p className="text-sm text-purple-700 font-medium">{skillCompetence}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-sm">📊</span>
                      Skill Focus Areas
                    </h4>
                    <div className="space-y-2 text-sm">
                      {skillCategories.length === 0 ? (
                        <div className="text-gray-400 italic">No skill focus areas available.</div>
                      ) : (
                        skillCategories.map((category) => (
                          <div key={category.type} className="flex justify-between items-center">
                            <span className="text-gray-600">{category.type}:</span>
                            <span className="font-medium text-gray-900 text-xs">{category.competence}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <span className="text-sm">⏱️</span>
                      Project Scope
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Timeline:</span>
                        <span className="font-medium text-gray-900">{timeline} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium text-gray-900">${budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Only Continue to Analysis button at the bottom left */}
                <div className="flex justify-center mt-8">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 shadow-lg transition-all duration-300" 
                    onClick={onNext} 
                  >
                    Continue to Analysis
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
