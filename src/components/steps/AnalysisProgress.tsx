


'use client';
import React, { useState, useEffect } from "react"

interface AnalysisProgressProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function AnalysisProgress({ onNext, onBack }: AnalysisProgressProps) {
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

  // Simulate analysis progress for demo purposes
  useEffect(() => {
    const simulateProgress = () => {
      const intervals = [
        { step: 1, delay: 500, message: 'Mapping tasks to skills...' },
        { step: 2, delay: 1000, message: 'Classifying tasks by categories...' },
        { step: 3, delay: 1500, message: 'Extracting skills from resume...' },
        { step: 4, delay: 2000, message: 'Analyzing job description context...' },
        { step: 5, delay: 2500, message: 'Clustering context tasks...' },
        { step: 6, delay: 3000, message: 'Calculating task importance...' },
        { step: 7, delay: 3500, message: 'Calculating skill competence...' },
        { step: 8, delay: 4000, message: 'Conducting skill gap analysis...' },
        { step: 9, delay: 4500, message: 'Generating final skill gap scores...' }
      ];

      intervals.forEach(({ step, delay, message }) => {
        setTimeout(() => {
          setCurrentStep(message);
          setSteps(prev => prev.map(s => 
            s.id === step ? { ...s, active: true } : { ...s, active: false }
          ));
          setProgress((step / 9) * 100);
          
          setTimeout(() => {
            setSteps(prev => prev.map(s => 
              s.id === step ? { ...s, completed: true, active: false } : s
            ));
            
            if (step === 9) {
              setCurrentStep('Analysis complete!');
            }
          }, 400);
        }, delay);
      });
    };

    simulateProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      {/* Modern Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Skill Gap Analysis
                </h1>
                <p className="text-sm text-gray-600">AI-powered comprehensive analysis in progress</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">Processing Phase</div>
              <div className="text-xs text-gray-500 mt-1">Advanced Analytics Engine</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing Your Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI is processing your resume and conducting comprehensive skill gap analysis
            to provide detailed insights and recommendations.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-800">Analysis Progress</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStep}
            </h3>
            <p className="text-gray-600 text-lg">
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
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 mb-8">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center">
                  <span className="text-blue-800 font-semibold text-lg">
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
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                progress < 100 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={progress < 100}
            >
              {progress < 100 ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Complete Report
                </div>
              )}
            </button>
            <button 
              onClick={onBack || (() => window.location.href = '/index.html?screen=EmployeeSkillCards')}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              disabled={progress >= 100}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Insights Preview */}
        {progress >= 80 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Analysis Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 mb-1">95%</div>
                <div className="text-sm text-blue-600">Skill Match Rate</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-700 mb-1">8.7/10</div>
                <div className="text-sm text-green-600">Competency Score</div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-700 mb-1">Strong Fit</div>
                <div className="text-sm text-purple-600">Overall Rating</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


