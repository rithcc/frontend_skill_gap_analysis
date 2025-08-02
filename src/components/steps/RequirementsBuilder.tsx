"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  // Experience level color logic matches competenceLevels
  const experienceLevels = [
    { label: 'Entry (0-1y)', color: 'bg-teal-50 text-teal-700', selectedColor: 'bg-teal-400 text-white' },
    { label: 'Junior (1-3y)', color: 'bg-blue-100 text-blue-700', selectedColor: 'bg-blue-500 text-white' },
    { label: 'Mid (3-5y)', color: 'bg-green-100 text-green-700', selectedColor: 'bg-green-500 text-white' },
    { label: 'Senior (5-8y)', color: 'bg-purple-100 text-purple-700', selectedColor: 'bg-purple-500 text-white' },
    { label: 'Expert (8y+)', color: 'bg-red-100 text-red-700', selectedColor: 'bg-red-500 text-white' },
  ];
const competenceLabels = ['Basic', 'Working', 'Proficient', 'Advanced', 'Expert'];

// 🔹 Main Component
export default function RequirementsBuilder({ onNext, onBack, selectedRoleId, selectedRoleName }: RequirementsBuilderProps) {
  // Fetch input and output from localStorage
  interface InputData {
    ROLE_NAME?: string;
    roleName?: string;
    type?: string;
    description?: string;
    roleDescription?: string;
    eligibility?: string[] | undefined;
    SKILLS?: string[] | undefined;
    requirements?: string[] | undefined;
    TASKS?: string[] | undefined;
    TOOLS?: { name?: string }[] | undefined;
    TECHNOLOGIES?: { name?: string }[] | undefined;
    priority?: string;
  }
  const [inputData, setInputData] = useState<InputData | null>(null);
  interface OutputData {
    total_skills?: number;
    processed_at?: string;
    skills?: {
      skill: string;
      type: string;
      competence: string;
      score: number;
      justification: string;
    }[];
    categories?: {
      type: string;
      skills: string[];
      mean_score: number;
      competence: string;
      count: number;
    }[];
  }
  const [outputData, setOutputData] = useState<OutputData | null>(null);

  useEffect(() => {
    try {
      const inputRaw = localStorage.getItem('requirementsData');
      if (inputRaw) setInputData(JSON.parse(inputRaw));
      const outputRaw = localStorage.getItem('requirementsOutput');
      if (outputRaw) setOutputData(JSON.parse(outputRaw));
    } catch {
      // Intentionally ignoring errors when parsing experience level from localStorage
    }
  }, []);
  console.log('RequirementsBuilder rendering...', { onNext, onBack });

  // State management
  // Auto-populate experience level from selectedRoleSeniority in localStorage if available, else fallback
  const getInitialSkillExperience = () => {
    try {
      // Prefer 'selectedRoleSeniority' if present
      const seniority = localStorage.getItem('selectedRoleSeniority');
      if (seniority) {
        const map: Record<string, number> = {
          'Entry': 0,
          'Entry Level': 0,
          'Junior': 1,
          'Mid': 2,
          'Mid-level': 2,
          'Mid Level': 2,
          'Senior': 3,
          'Expert': 4
        };
        const found = Object.entries(map).find(([k]) => k.toLowerCase() === seniority.toLowerCase());
        if (found) return found[1];
      }
      // Fallback to previous logic
      const stored = localStorage.getItem('selectedRole');
      if (stored) {
        const parsed = JSON.parse(stored);
        const levelStr = parsed.experience_level || parsed.experienceLevel || parsed.level || parsed.seniority || '';
        if (typeof levelStr === 'string' && levelStr) {
          const map: Record<string, number> = {
            'Entry': 0,
            'Entry Level': 0,
            'Junior': 1,
            'Mid': 2,
            'Mid-level': 2,
            'Mid Level': 2,
            'Senior': 3,
            'Expert': 4
          };
          const found = Object.entries(map).find(([k]) => k.toLowerCase() === levelStr.toLowerCase());
          if (found) return found[1];
        }
      }
    } catch {
      // Intentionally ignoring errors when parsing experience level from localStorage
    }
    return 2; // Default to 'Mid (3-5y)'
  };
  const [skillExperience, setSkillExperience] = useState<number>(getInitialSkillExperience());
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
    { value: 'Basic', level: 1, color: 'bg-teal-50 text-teal-700', selectedColor: 'bg-teal-400 text-white' },
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
    // All dots are black and smaller
    const dotClass = "w-1.5 h-1.5 rounded-full mr-1 bg-black";
    // Find skills for this category
    const category = skillCategories.find(c => c.type.toLowerCase() === type.toLowerCase());
    const includedSkills = category?.skills.join(', ') || 'Not specified';
    // Map level to color
    let sliderColor = '#22c55e'; // default light green (Basic)
    let thumbColor = '#22c55e';
    let badgeBg = 'bg-teal-50 text-teal-700';
    if (level === 1) { sliderColor = '#bbf7d0'; thumbColor = '#bbf7d0'; badgeBg = 'bg-teal-50 text-teal-700'; } // Basic
    else if (level === 2) { sliderColor = '#3b82f6'; thumbColor = '#3b82f6'; badgeBg = 'bg-blue-100 text-blue-700'; } // Working
    else if (level === 3) { sliderColor = '#22c55e'; thumbColor = '#22c55e'; badgeBg = 'bg-green-100 text-green-700'; } // Proficient
    else if (level === 4) { sliderColor = '#a78bfa'; thumbColor = '#a78bfa'; badgeBg = 'bg-purple-100 text-purple-700'; } // Advanced
    else if (level === 5) { sliderColor = '#ef4444'; thumbColor = '#ef4444'; badgeBg = 'bg-red-100 text-red-700'; } // Expert
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <div className={dotClass}></div>
            {type.charAt(0).toUpperCase() + type.slice(1)} Skills
          </label>
          <span className={`${badgeBg} px-3 py-1 rounded-full text-xs font-medium`}>
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
              background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${((level - 1) / 4) * 100}%, #e5e7eb ${((level - 1) / 4) * 100}%, #e5e7eb 100%)`,
              accentColor: thumbColor
            }}
          />
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              background: ${thumbColor};
            }
            input[type='range']::-moz-range-thumb {
              background: ${thumbColor};
            }
            input[type='range']::-ms-thumb {
              background: ${thumbColor};
            }
          `}</style>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-medium">Includes:</span> {includedSkills}
        </div>
      </div>
    );
  };

 // 🧠 API Integration
  // Helper to map competence string to slider value (1-5)
  const competenceToLevel = (competence: string): number => {
    switch ((competence || '').toLowerCase()) {
      case 'basic': return 1;
      case 'working': return 2;
      case 'proficient': return 3;
      case 'advanced': return 4;
      case 'expert': return 5;
      default: return 3;
    }
  };


  const classifySkills = useCallback(async (skills: string[], roleContext: string) => {
    setLoadingSkills(true);
    try {
      const response = await fetch('http://localhost:8001/classify-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, role_context: roleContext })
      });
      const result = await response.json();
      setSkillCategories(result.categories || []);

      // Auto-populate each skill category's slider based on returned competence
      if (Array.isArray(result.categories)) {
        let maxLevel = 0;
        let maxCompetence = 'Proficient';
        result.categories.forEach((category: { type: string; competence: string }) => {
          const level = competenceToLevel(category.competence);
          if (level > maxLevel) {
            maxLevel = level;
            maxCompetence = category.competence;
          }
          switch ((category.type || '').toLowerCase()) {
            case 'technical':
              setTechnicalLevel(level);
              break;
            case 'domain':
              setDomainLevel(level);
              break;
            case 'process':
              setProcessLevel(level);
              break;
            case 'managerial':
              setManagerialLevel(level);
              break;
            case 'collaboration':
              setCollaborationLevel(level);
              break;
            default:
              break;
          }
        });
        // Set the main skillCompetence to the highest found
        setSkillCompetence(maxCompetence);
      }
    } catch (error) {
      setSkillCategories([]);
    } finally {
      setLoadingSkills(false);
    }
  }, []);

  // Effects
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Call classifySkills only when both experience level and skills/requirements are available from localStorage
  useEffect(() => {
    // Try to get all relevant requirements from localStorage
    const selectedRole = localStorage.getItem('selectedRole');
    let skills: string[] = [];
    if (selectedRole) {
      try {
        const parsed = JSON.parse(selectedRole);
        // Tools (category: Tool)
        if (Array.isArray(parsed.TOOLS)) {
          skills.push(...parsed.TOOLS.map((t: { name?: string }) => t.name || '').filter(Boolean));
        }
        // Technologies (category: Technology)
        if (Array.isArray(parsed.TECHNOLOGIES)) {
          skills.push(...parsed.TECHNOLOGIES.map((t: { name?: string }) => t.name || '').filter(Boolean));
        }
        // Eligibility (description)
        if (Array.isArray(parsed.ELIGIBILITY)) {
          skills.push(...parsed.ELIGIBILITY.map((e: { description?: string }) => e.description || '').filter(Boolean));
        } else if (Array.isArray(parsed.SKILLS)) {
          // Some flows use SKILLS for eligibility
          skills.push(...parsed.SKILLS.filter(Boolean));
        }
        // Compliance (name)
        if (Array.isArray(parsed.COMPLIANCES)) {
          skills.push(...parsed.COMPLIANCES.map((c: { name?: string }) => c.name || '').filter(Boolean));
        }
      } catch { /* ignore error */ }
    }
    // Fallback: also include selectedRoleSkills if present
    if (skills.length === 0) {
      const skillsRaw = localStorage.getItem('selectedRoleSkills');
      if (skillsRaw) {
        try {
          const parsed: unknown = JSON.parse(skillsRaw);
          if (Array.isArray(parsed)) {
            if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null && 'name' in parsed[0]) {
              skills = (parsed as { name?: string }[]).map((s) => s.name || '').filter(Boolean);
            } else {
              skills = (parsed as unknown[]).filter((s): s is string => typeof s === 'string');
            }
          }
        } catch {
          skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
    }
    // Only classify if we have at least one skill and a valid experience level
    if (skills.length > 0 && typeof skillExperience === 'number') {
      const roleContext = selectedRoleName || '';
      classifySkills(skills, roleContext);
    }
  }, [selectedRoleName, skillExperience, classifySkills]);

  // Auto-update experience level if selectedRoleSeniority or selectedRole changes in localStorage
  useEffect(() => {
    try {
      // Prefer 'selectedRoleSeniority' if present
      const seniority = localStorage.getItem('selectedRoleSeniority');
      if (seniority) {
        const map: Record<string, number> = {
          'Entry': 0,
          'Entry Level': 0,
          'Junior': 1,
          'Mid': 2,
          'Mid-level': 2,
          'Mid Level': 2,
          'Senior': 3,
          'Expert': 4
        };
        const found = Object.entries(map).find(([k]) => k.toLowerCase() === seniority.toLowerCase());
        if (found && skillExperience !== found[1]) {
          setSkillExperience(found[1]);
          return;
        }
      }
      // Fallback to previous logic
      const stored = localStorage.getItem('selectedRole');
      if (stored) {
        const parsed = JSON.parse(stored);
        const levelStr = parsed.experience_level || parsed.experienceLevel || parsed.level || parsed.seniority || '';
        if (typeof levelStr === 'string' && levelStr) {
          const map: Record<string, number> = {
            'Entry': 0,
            'Entry Level': 0,
            'Junior': 1,
            'Mid': 2,
            'Mid-level': 2,
            'Mid Level': 2,
            'Senior': 3,
            'Expert': 4
          };
          const found = Object.entries(map).find(([k]) => k.toLowerCase() === levelStr.toLowerCase());
          if (found && skillExperience !== found[1]) {
            setSkillExperience(found[1]);
          }
        }
      }
    } catch { /* ignore error */ }
  }, [skillExperience]);

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
        if (requirementsSource === 'uploaded_document' && parsedData?.id) {
          setRequirementsSource('uploaded_document');
          console.log('Loading requirements from uploaded document:', parsedData.id);
          // Use requirements from uploaded document (parsedData.requirements)
          if (parsedData.requirements) {
            // Set your state here using parsedData.requirements as needed
            // Example: setRequirements(parsedData.requirements);
            // You may need to map/transform as per your UI
            // ...
          }
          // Optionally, set other fields from parsedData if needed
          // ...
          setIsLoading(false);
          return;
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
      {/* Removed step-level back button, only header back button remains */}
                  Go Back
                </Button>
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-700 text-center">
            {requirementsSource === 'uploaded_document'
              ? 'Fetching data from uploaded document...'
              : 'Preparing Requirements Builder...'}
          </div>
          <div className="text-sm text-gray-500 text-center max-w-xs">
            Please wait while we load your requirements. This may take a few seconds.
          </div>
        </div>
      </div>
    );
  }



  return (
      <div className="max-w-7xl mx-auto w-full">
        {/* Role Summary removed from the top */}

        {/* Output Section */}
        {outputData && (
          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-xl font-bold mb-2 text-blue-900">AI Processed Output</h2>
            <div className="mb-4">
              <span className="font-semibold">Total Skills:</span> {outputData.total_skills}
              <span className="ml-6 font-semibold">Processed At:</span> {outputData.processed_at}
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outputData.skills && outputData.skills.map((skill: {
                  skill: string;
                  type: string;
                  competence: string;
                  score: number;
                  justification: string;
                }, idx: number) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="font-semibold text-blue-700">{skill.skill}</div>
                    <div className="text-xs text-gray-600">Type: {skill.type}</div>
                    <div className="text-xs text-gray-600">Competence: {skill.competence}</div>
                    <div className="text-xs text-gray-600">Score: {skill.score}</div>
                    <div className="text-xs text-gray-600">Justification: {skill.justification}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outputData.categories && outputData.categories.map((cat: {
                  type: string;
                  skills: string[];
                  mean_score: number;
                  competence: string;
                  count: number;
                }, idx: number) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="font-semibold text-purple-700">{cat.type}</div>
                    <div className="text-xs text-gray-600">Skills: {Array.isArray(cat.skills) ? cat.skills.join(', ') : ''}</div>
                    <div className="text-xs text-gray-600">Mean Score: {cat.mean_score}</div>
                    <div className="text-xs text-gray-600">Competence: {cat.competence}</div>
                    <div className="text-xs text-gray-600">Count: {cat.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Centered Header */}
        <div className="mb-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-black">
            Requirement Builder
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-normal mb-2 text-center">
          Define and review the requirements for your selected role. Adjust experience, competence, timeline, budget, and skill focus areas before proceeding to analysis.
        </p>
          {loadingSkills && (
            <div className="flex flex-col items-center mt-2">
              <div className="relative mb-2">
                <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-500 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0V4m0 4c-4.418 0-8 1.79-8 4v2c0 2.21 3.582 4 8 4s8-1.79 8-4v-2c0-2.21-3.582-4-8-4z" />
                  </svg>
                </div>
              </div>
              <div className="text-base font-semibold text-emerald-700 text-center">
                AI is analyzing your role and skills...
              </div>
              <div className="text-xs text-gray-500 text-center max-w-xs mt-1">
                Please wait while our AI defines the skill requirements and experience levels for your selection.
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Level */}
            <Card className="p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 border-0 shadow-xl rounded-2xl text-base">
              <div className="flex items-center mb-4">
                <span className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 12h4m-7 8h10a2 2 0 002-2V8a2 2 0 00-2-2h-3V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-gray-900">Experience Level</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  {experienceLabels.map((label, index) => (
                    <span key={index} className={skillExperience === index ? 'text-blue-600 font-semibold' : ''}>{label}</span>
                  ))}
                </div>
                <div className="relative">
                  <div
                    className="bg-blue-400 absolute top-1/2 left-0 h-2 rounded-lg -translate-y-1/2"
                    style={{ width: `${(skillExperience / 4) * 100}%`, zIndex: 1 }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={skillExperience}
                    onChange={(e) => setSkillExperience(parseInt(e.target.value))}
                    className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer relative"
                    style={{ position: 'relative', zIndex: 10 }}
                  />
                </div>
                <div className="text-center">
                  {/* Removed experience label at the bottom of Experience Level slider */}
                </div>
              </div>
            </Card>

            {/* Skill Competence */}

            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  <span className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  Skill Competence
                </h3>
              </div>
              <div className="mb-4">
                <div className="flex flex-row items-center justify-between gap-2">
                  {competenceLevels.map((level, idx) => (
                    <div key={level.value} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-4 ${level.selectedColor} mb-1`}>
                        {/* Icon for each level */}
                        {level.level === 1 && <span className="text-lg">🌱</span>}
                        {level.level === 2 && <span className="text-lg">🔧</span>}
                        {level.level === 3 && <span className="text-lg">🚀</span>}
                        {level.level === 4 && <span className="text-lg">🎓</span>}
                        {level.level === 5 && <span className="text-lg">🏆</span>}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{level.value}</span>
                      <span className="text-[10px] text-gray-500">Level {level.level}</span>
                      <div className="w-full h-2 flex items-center justify-center">
                        <span className="block w-8 h-1 bg-gray-300 rounded-full mx-auto"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Skill Competence Sliders */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-2 text-xs">Detailed Competence Levels</h4>
                {skillCategories.length > 0 ? (
                  <div className="space-y-4">
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
                    <div className="text-center py-2 text-gray-500 text-xs">
                      No skill categories available. Please ensure skills are properly defined.
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Timeline & Budget */}
            <Card className="bg-white border border-gray-200">
              <div className="flex items-center gap-3 p-4 pb-0">
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                    <span className="w-7 h-7 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center mr-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Project Parameters
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
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
                        <span className="text-xs font-bold text-amber-700 min-w-[2rem]">{timeline}m</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-amber-600">
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
                        <span className="text-xs font-bold text-amber-700 min-w-[3rem]">${budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-amber-600">
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
            {/* Removed Business Criticality Card at the very top */}
            <Card className="bg-white border border-gray-200">
              {/* Requirements Preview Header */}
              <div className="flex items-center gap-3 p-4 pb-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4-4 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Requirements Preview</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Experience Level Box */}
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🎯</span>
                      <span className="font-bold text-black text-base">Experience Level</span>
                    </div>
                    <span className="text-sm text-indigo-700 font-medium">{experienceLabels[skillExperience]}</span>
                  </div>
                  {/* Competence Required Box */}
                  <div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">⭐</span>
                      <span className="font-bold text-black text-base">Competence Required</span>
                    </div>
                    <span className="text-sm text-purple-700 font-medium">{skillCompetence}</span>
                  </div>
                  {/* Skill Focus Areas Box */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">📊</span>
                      <span className="font-bold text-black text-base">Skill Focus Areas</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      {skillCategories.length === 0 ? (
                        <div className="text-gray-400 italic">No skill focus areas available.</div>
                      ) : (
                        skillCategories.map((category) => (
                          <div key={category.type} className="flex justify-between items-center">
                            <span className="text-gray-600">{category.type}:</span>
                            <span className="font-medium text-gray-900">{category.competence}</span>
                          </div>
                        ))
                     ) }
                    </div>
                  </div>
                  {/* Project Scope Box */}
                  <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">⏱️</span>
                      <span className="font-bold text-black text-base">Project Scope</span>
                    </div>
                    <div className="space-y-1 text-sm">
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
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 shadow-lg transition-all duration-300 text-xs" 
                    onClick={onNext} 
                    disabled={isLoading || loadingSkills}
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
  );
}
