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

  // Effects
  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button 
                  variant="outline" 
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Requirements Builder
                  {(() => {
                    // Get role name from props, localStorage, or extracted document data
                    const storedData = localStorage.getItem('selectedRole');
                    const parsedData = storedData ? JSON.parse(storedData) : null;
                    
                    const displayRoleName = selectedRoleName || 
                                          parsedData?.roleName || 
                                          parsedData?.roleTitle || 
                                          parsedData?.ROLE_NAME || 
                                          null;
                    
                    return displayRoleName ? (
                      <span className="text-base font-normal ml-3 text-gray-500">
                        for {displayRoleName}
                      </span>
                    ) : null;
                  })()}
                </h1>
                <p className="text-gray-600 mt-2">
                  {(() => {
                    // Get role name for display
                    const storedData = localStorage.getItem('selectedRole');
                    const parsedData = storedData ? JSON.parse(storedData) : null;
                    
                    const displayRoleName = selectedRoleName || 
                                          parsedData?.roleName || 
                                          parsedData?.roleTitle || 
                                          parsedData?.ROLE_NAME || 
                                          null;
                    
                    return displayRoleName ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                        🎯 {displayRoleName}
                      </span>
                    ) : null;
                  })()}
                  {requirementsSource === 'uploaded_document' 
                    ? 'Review and edit requirements extracted from your document'
                    : 'Define your skill requirements and experience levels'
                  }
                </p>
                {requirementsSource === 'uploaded_document' && (
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    📄 Requirements loaded from uploaded document
                  </div>
                )}
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
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
                        className={`flex-1 min-w-fit transition-all duration-200 ${
                          skillExperience === index 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                            : 'hover:bg-emerald-50 hover:border-emerald-300'
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

            {/* Competence Level */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Competence Level
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Define the required competence level
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {competenceLabels.map((label) => (
                      <Button
                        key={label}
                        variant={skillCompetence === label ? "default" : "outline"}
                        onClick={() => setSkillCompetence(label)}
                        className={`flex-1 min-w-fit transition-all duration-200 ${
                          skillCompetence === label 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                            : 'hover:bg-purple-50 hover:border-purple-300'
                        }`}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-800">
                      <span className="font-semibold">Current selection:</span> {skillCompetence}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Categories */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Skill Categories
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Adjust the importance of different skill types
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[
                    { label: 'Technical Skills', value: technicalLevel, setter: setTechnicalLevel, color: 'blue', icon: '⚙️' },
                    { label: 'Domain Knowledge', value: domainLevel, setter: setDomainLevel, color: 'green', icon: '🎯' },
                    { label: 'Process Skills', value: processLevel, setter: setProcessLevel, color: 'purple', icon: '🔄' },
                    { label: 'Managerial Skills', value: managerialLevel, setter: setManagerialLevel, color: 'orange', icon: '👥' },
                    { label: 'Collaboration Skills', value: collaborationLevel, setter: setCollaborationLevel, color: 'pink', icon: '🤝' }
                  ].map((category) => (
                    <div key={category.label} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          {category.label}
                        </label>
                        <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                          category.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          category.color === 'green' ? 'bg-green-100 text-green-700' :
                          category.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          category.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {competenceLabels[category.value - 1]}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Button
                            key={level}
                            variant={category.value === level ? "default" : "outline"}
                            size="sm"
                            onClick={() => category.setter(level)}
                            className={`w-10 h-10 p-0 font-semibold ${
                              category.value === level 
                                ? category.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                                  category.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                                  category.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                                  category.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                                  'bg-pink-500 hover:bg-pink-600'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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

            {/* Action Buttons - Moved to bottom of main content */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 shadow-lg transition-all duration-300" 
                    onClick={onNext} 
                    disabled={!onNext}
                  >
                    Continue to Analysis
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 hover:bg-gray-50 transition-all duration-200"
                    onClick={saveRequirementProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        💾 {requirementProfileId ? 'Update Profile' : 'Save Draft'}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 hover:bg-gray-50 transition-all duration-200">
                    📄 Export Settings
                  </Button>
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
                      {[
                        { label: 'Technical', value: technicalLevel, color: 'blue' },
                        { label: 'Domain', value: domainLevel, color: 'green' },
                        { label: 'Process', value: processLevel, color: 'purple' },
                        { label: 'Managerial', value: managerialLevel, color: 'orange' },
                        { label: 'Collaboration', value: collaborationLevel, color: 'pink' }
                      ].map((skill) => (
                        <div key={skill.label} className="flex justify-between items-center">
                          <span className="text-gray-600">{skill.label}:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= skill.value
                                      ? skill.color === 'blue' ? 'bg-blue-500' :
                                        skill.color === 'green' ? 'bg-green-500' :
                                        skill.color === 'purple' ? 'bg-purple-500' :
                                        skill.color === 'orange' ? 'bg-orange-500' :
                                        'bg-pink-500'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-gray-900 text-xs">
                              {competenceLabels[skill.value - 1]}
                            </span>
                          </div>
                        </div>
                      ))}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
