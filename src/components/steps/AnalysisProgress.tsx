import React, { useState, useEffect } from "react"

interface AnalysisProgressProps {
  onNext?: () => void;
  onBack?: () => void;
}


export default function AnalysisProgress({ onNext, onBack }: AnalysisProgressProps) {
  // State for each step's result
  const [taskSkillMapping, setTaskSkillMapping] = useState<{
    tasks?: string[];
    skills?: string[];
    tools?: string[];
    technologies?: string[];
  } | null>(null);
  const [classifyTasksResult, setClassifyTasksResult] = useState<{ [task: string]: string } | null>(null);
  const [skillsFromResumeResult, setSkillsFromResumeResult] = useState<string[] | null>(null);
  const [jdContextResult, setJDContextResult] = useState<Record<string, string | number | object> | null>(null);
  const [clusterContextTasksResult, setClusterContextTasksResult] = useState<{ [cluster: string]: string[] } | null>(null);
  const [taskImportanceResult, setTaskImportanceResult] = useState<{ [task: string]: number } | null>(null);
  const [skillCompetenceResult, setSkillCompetenceResult] = useState<{ [skill: string]: number } | null>(null);
  const [skillGapAnalysisResult, setSkillGapAnalysisResult] = useState<{ gaps: string[]; matched: string[] } | null>(null);
  const [skillGapScoreResult, setSkillGapScoreResult] = useState<Record<string, unknown> | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Starting analysis...');
  const [steps, setSteps] = useState([
    { id: 1, name: 'Task-to-skill mapping', completed: false, active: false },
    { id: 2, name: 'Task classification', completed: false, active: false },
    { id: 3, name: 'Skills extraction from resume', completed: false, active: false },
    { id: 4, name: 'JD context analysis', completed: false, active: false },
    { id: 5, name: 'Context tasks clustering', completed: false, active: false },
    { id: 6, name: 'Task importance calculation', completed: false, active: false },
    { id: 7, name: 'Skill competence calculation', completed: false, active: false },
    { id: 8, name: 'Skill gap analysis', completed: false, active: false },
    { id: 9, name: 'Generating skill gap scores', completed: false, active: false }
  ]);

  // Ensure parent header back button always goes to ResumeUpload (step 6)
  useEffect(() => {
    localStorage.setItem('analysisProgressActive', 'true');
    return () => {
      localStorage.removeItem('analysisProgressActive');
    };
  }, []);

  // Simulate analysis progress for demo purposes
   // Simulate analysis progress for demo purposes
  useEffect(() => {
    // API endpoints for each step
    const apiBase = 'http://localhost:8001';
    const apiEndpoints = [
      { step: 1, url: `${apiBase}/task-to-skill-mapping`, message: 'Mapping tasks to skills...' },
      { step: 2, url: `${apiBase}/classify-tasks`, message: 'Classifying tasks by categories...' },
      { step: 3, url: `${apiBase}/skills-from-resume`, message: 'Extracting skills from resume...' },
      { step: 4, url: `${apiBase}/jd-context`, message: 'Analyzing job description context...' },
      { step: 5, url: `${apiBase}/cluster-context-tasks`, message: 'Clustering context tasks...' },
      { step: 6, url: `${apiBase}/calculate-task-importance`, message: 'Calculating task importance...' },
      { step: 7, url: `${apiBase}/calculate-skill-competence`, message: 'Calculating skill competence...' },
      { step: 8, url: `${apiBase}/conduct-skill-gap-analysis`, message: 'Conducting skill gap analysis...' },
      { step: 9, url: `${apiBase}/get-skill-gap-score`, message: 'Generating final skill gap scores...' }
    ];
    let cancelled = false;

    // Get input for task-to-skill mapping from localStorage
    const getTaskSkillMappingInput = () => {
      // Get requirements data from GeneratedRequirements page
      type RequirementsDataType = {
        requirements?: { responsibility: string }[];
        tools?: string[];
        technologies?: string[];
      };
      let requirementsData: RequirementsDataType = {};
      try {
        requirementsData = JSON.parse(localStorage.getItem('requirementsData') || '{}');
      } catch {
        // Ignore JSON parse errors and use empty object
      }
      // Get role details from RoleTargeting page
      type RoleDetailsType = { roleName?: string; skills?: string[] };
      let roleDetails: RoleDetailsType = {};
      try {
        roleDetails = JSON.parse(localStorage.getItem('roleDetails') || '{}');
      } catch {
        // Intentionally ignore JSON parse errors and use empty object
      }
      // TASKS (responsibilities), TOOLS, TECHNOLOGIES from requirementsData
      // SKILLS from roleDetails
      return {
        ROLE_NAME: roleDetails?.roleName || '',
        TASKS: requirementsData?.requirements?.map((r: { responsibility: string }) => r.responsibility) || [],
        TOOLS: requirementsData?.tools || [],
        TECHNOLOGIES: requirementsData?.technologies || [],
        SKILLS: roleDetails?.skills || []
      };
    };

    const runAnalysis = async () => {
      for (let i = 0; i < apiEndpoints.length; i++) {
        const { step, url, message } = apiEndpoints[i];
        if (cancelled) break;
        setCurrentStep(message);
        setSteps(prev => prev.map(s => s.id === step ? { ...s, active: true } : { ...s, active: false }));
        setProgress((step / 9) * 100);
        try {
          let postBody: Record<string, unknown> = {};
          if (step === 1) {
            postBody = getTaskSkillMappingInput();
          } else if (step === 2) {
            // For classify-tasks, send skill competencies as 'tasks'
            type RequirementsDataType = {
              requirements?: { skill: string }[];
            };
            let requirementsData: RequirementsDataType = {};
            try {
              requirementsData = JSON.parse(localStorage.getItem('requirementsData') || '{}');
            } catch {
              // Ignore JSON parse errors
            }
            postBody = {
              tasks: requirementsData?.requirements?.map((r: { skill: string }) => r.skill) || []
            };
          } else if (step === 3) {
            // For skills-from-resume, send only the 'skills' array from resume in localStorage
            let skills: string[] = [];
            try {
              const resumeObj = JSON.parse(localStorage.getItem('resume') || '{}');
              if (Array.isArray(resumeObj.skills)) {
                skills = resumeObj.skills;
              }
            } catch {
              skills = [];
            }
            postBody = { skills };
          } else if (step === 4) {
            // For JD context, send job description from roleDetails in localStorage
            let jdText = '';
            try {
              const roleDetails = JSON.parse(localStorage.getItem('roleDetails') || '{}');
              jdText = roleDetails.roleDescription || '';
            } catch {
              jdText = '';
            }
            postBody = { jd_text: jdText };
          } else if (step === 5) {
            // For cluster-context-tasks, send tasks from requirementsData.requirements[].responsibility
            let tasks: string[] = [];
            try {
              const requirementsData = JSON.parse(localStorage.getItem('requirementsData') || '{}');
              if (Array.isArray(requirementsData.requirements)) {
                tasks = requirementsData.requirements.map((r: { responsibility: string }) => r.responsibility);
              }
            } catch {
              tasks = [];
            }
            postBody = { tasks };
          }
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: Object.keys(postBody).length ? JSON.stringify(postBody) : undefined
          });
          if (res.ok) {
            const json = await res.json();
            switch (step) {
              case 1:
                // After step 1, fetch and store the mapping result
                try {
                  const mappingRes = await fetch('http://localhost:8001/task-to-skill-mapping', { method: 'GET' });
                  if (mappingRes.ok) {
                    const mappingJson = await mappingRes.json();
                    setTaskSkillMapping({
                      tasks: mappingJson.tasks || [],
                      skills: mappingJson.skills || [],
                      tools: mappingJson.tools || [],
                      technologies: mappingJson.technologies || []
                    });
                  } else {
                    setTaskSkillMapping(null);
                  }
                } catch (err) {
                  setTaskSkillMapping(null);
                }
                break;
              case 2:
                setClassifyTasksResult(json.classifications || null);
                break;
              case 3:
                setSkillsFromResumeResult(json.skills || null);
                break;
              case 4:
                setJDContextResult(json.context || null);
                break;
              case 5:
                setClusterContextTasksResult(json.clusters || null);
                break;
              case 6:
                setTaskImportanceResult(json.importance || null);
                break;
              case 7:
                setSkillCompetenceResult(json.competence || null);
                break;
              case 8:
                setSkillGapAnalysisResult({
                  gaps: json.gaps || [],
                  matched: json.matched || []
                });
                break;
              case 9:
                setSkillGapScoreResult(json || null);
                break;
              default:
                break;
            }
          }
        } catch (err) {
          // Optionally handle error (show error message, etc.)
        }
        setSteps(prev => prev.map(s => s.id === step ? { ...s, completed: true, active: false } : s));
        if (step === 9) {
          setCurrentStep('Analysis complete!');
        }
        // Small delay for UI smoothness
        await new Promise(res => setTimeout(res, 400));
      }
    };

    runAnalysis();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 font-sans">
      {/* Step Results UI */}
      <div className="max-w-4xl mx-auto">
        {taskSkillMapping && (
          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Task-to-Skill Mapping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="font-semibold text-blue-700 mb-2">Tasks</div>
                {taskSkillMapping.tasks && taskSkillMapping.tasks.length > 0 ? (
                  <ul className="list-disc ml-6 text-gray-800">
                    {taskSkillMapping.tasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                ) : <div className="text-gray-500">No tasks found.</div>}
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="font-semibold text-blue-700 mb-2">Skills</div>
                {taskSkillMapping.skills && taskSkillMapping.skills.length > 0 ? (
                  <ul className="list-disc ml-6 text-gray-800">
                    {taskSkillMapping.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                ) : <div className="text-gray-500">No skills found.</div>}
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="font-semibold text-blue-700 mb-2">Tools</div>
                {taskSkillMapping.tools && taskSkillMapping.tools.length > 0 ? (
                  <ul className="list-disc ml-6 text-gray-800">
                    {taskSkillMapping.tools.map((tool, idx) => (
                      <li key={idx}>{tool}</li>
                    ))}
                  </ul>
                ) : <div className="text-gray-500">No tools found.</div>}
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <div className="font-semibold text-blue-700 mb-2">Technologies</div>
                {taskSkillMapping.technologies && taskSkillMapping.technologies.length > 0 ? (
                  <ul className="list-disc ml-6 text-gray-800">
                    {taskSkillMapping.technologies.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                ) : <div className="text-gray-500">No technologies found.</div>}
              </div>
            </div>
          </div>
        )}
        {classifyTasksResult && (
          <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-200">
            <h2 className="text-xl font-bold mb-4 text-green-900">Task Classification</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {Object.entries(classifyTasksResult).map(([task, classification], idx) => (
                <li key={idx}><span className="font-semibold text-green-700">{task}:</span> {classification}</li>
              ))}
            </ul>
          </div>
        )}
        {skillsFromResumeResult && (
          <div className="mb-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h2 className="text-xl font-bold mb-4 text-yellow-900">Skills Extracted from Resume</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {skillsFromResumeResult.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {jdContextResult && (
          <div className="mb-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
            <h2 className="text-xl font-bold mb-4 text-purple-900">JD Context Analysis</h2>
            <div className="space-y-2">
              {Object.entries(jdContextResult).map(([key, value], idx) => (
                <div key={idx}><span className="font-semibold text-purple-700">{key}:</span> {typeof value === 'string' ? value : JSON.stringify(value)}</div>
              ))}
            </div>
          </div>
        )}
        {clusterContextTasksResult && (
          <div className="mb-8 p-6 bg-pink-50 rounded-xl border border-pink-200">
            <h2 className="text-xl font-bold mb-4 text-pink-900">Clustered Context Tasks</h2>
            <div className="space-y-2">
              {Object.entries(clusterContextTasksResult).map(([cluster, tasks], idx) => (
                <div key={idx}><span className="font-semibold text-pink-700">{cluster}:</span> {tasks.join(', ')}</div>
              ))}
            </div>
          </div>
        )}
        {taskImportanceResult && (
          <div className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
            <h2 className="text-xl font-bold mb-4 text-indigo-900">Task Importance</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {Object.entries(taskImportanceResult).map(([task, score], idx) => (
                <li key={idx}><span className="font-semibold text-indigo-700">{task}:</span> {score}</li>
              ))}
            </ul>
          </div>
        )}
        {skillCompetenceResult && (
          <div className="mb-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
            <h2 className="text-xl font-bold mb-4 text-teal-900">Skill Competence</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {Object.entries(skillCompetenceResult).map(([skill, score], idx) => (
                <li key={idx}><span className="font-semibold text-teal-700">{skill}:</span> {score}</li>
              ))}
            </ul>
          </div>
        )}
        {skillGapAnalysisResult && (
          <div className="mb-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-900">Skill Gap Analysis</h2>
            <div className="mb-2"><span className="font-semibold text-orange-700">Gaps:</span> {skillGapAnalysisResult.gaps.join(', ') || 'None'}</div>
            <div><span className="font-semibold text-orange-700">Matched:</span> {skillGapAnalysisResult.matched.join(', ') || 'None'}</div>
          </div>
        )}
        {skillGapScoreResult && (
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Skill Gap Score</h2>
            <pre className="bg-white rounded-lg p-4 border border-gray-100 text-sm text-gray-800 overflow-x-auto">{JSON.stringify(skillGapScoreResult, null, 2)}</pre>
          </div>
        )}
      </div>
      {/* Modern Header removed as per user request */}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Analyzing Your Skills
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-1xl mx-auto leading-normal">
            Our AI is processing your resume and conducting comprehensive skill gap analysis
            to provide detailed insights and recommendations.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base font-semibold text-gray-800">Analysis Progress</span>
              <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              {progress < 100 ? (
                <div className="relative">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-10 h-10 border-4 border-purple-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className={`font-semibold text-base text-gray-900 mb-1 ${progress === 100 ? 'font-normal' : ''}`}>
              {currentStep}
            </h3>
            <p className={`text-gray-600 text-sm ${progress === 100 ? 'font-normal' : ''}`}>
              {progress < 100 ? 'Please wait while we process your data...' : 'Analysis completed successfully!'}
            </p>
          </div>

          {/* Analysis Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {steps.map((step) => (
              <div key={step.id} className={`p-4 rounded-2xl border transition-all duration-300 ${
                step.completed ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md' : 
                step.active ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md' : 
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                    step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' : 
                    step.active ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' : 
                    'bg-gray-300'
                  }`}>
                    {step.completed ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : step.active ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-600">Step {step.id}</span>
                </div>
                <h4 className={`font-semibold text-sm transition-all duration-300 ${
                  step.completed ? 'text-green-800' : 
                  step.active ? 'text-blue-800' : 'text-gray-600'
                }`}>
                  {step.name}
                </h4>
              </div>
            ))}
          </div>

          {/* Estimated Time */}
          {progress < 100 && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 mb-8 font-sans">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center">
                  <span className="text-blue-800 font-semibold text-base">
                    {progress < 20 ? 'Initializing analysis systems...' : 
                     progress < 60 ? 'Deep learning algorithms processing...' : 
                     progress < 90 ? 'Finalizing calculations...' :
                     'Almost complete...'}
                  </span>
                  <p className="text-blue-600 text-sm mt-1">
                    {progress < 50 ? 'Estimated time: 3-4 minutes' : 'Nearly finished...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onNext || (() => window.location.href = '/index.html?screen=SGAAnalysis')}
              className={`w-44 h-11 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm border border-blue-700 ${progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={progress < 100}
            >
              {progress < 100 ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Complete Report
                </div>
              )}
            </button>
          </div>
        </div>

        {/* ...existing code... (Insights Preview removed) */}
      </div>
    </div>
  )
}


