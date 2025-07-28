'use client';
import React, { useState, useEffect } from "react";

interface ReportGenerationProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function ReportGeneration({ onNext, onBack }: ReportGenerationProps) {
  const [generationStep, setGenerationStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 1, title: "Analyzing Skills Data", description: "Processing individual skill assessments", icon: "📊" },
    { id: 2, title: "Generating Insights", description: "Creating AI-powered recommendations", icon: "🧠" },
    { id: 3, title: "Building Visual Charts", description: "Designing interactive skill maps", icon: "📈" },
    { id: 4, title: "Compiling Report", description: "Assembling comprehensive document", icon: "📄" },
    { id: 5, title: "Finalizing PDF", description: "Optimizing for stakeholder review", icon: "✅" }
  ];

  const reportFeatures = [
    { title: "Executive Summary", description: "High-level overview for leadership", color: "from-blue-500 to-cyan-500" },
    { title: "Detailed Analysis", description: "In-depth skill gap assessment", color: "from-purple-500 to-pink-500" },
    { title: "Visual Analytics", description: "Interactive charts and radar maps", color: "from-green-500 to-emerald-500" },
    { title: "Learning Pathways", description: "Customized development roadmaps", color: "from-orange-500 to-red-500" },
    { title: "Implementation Plan", description: "Timeline and resource allocation", color: "from-indigo-500 to-purple-500" },
    { title: "ROI Projections", description: "Cost-benefit analysis", color: "from-teal-500 to-blue-500" }
  ];

  // Sample report data
  const sampleReportData = {
    title: "Comprehensive Skill Gap Analysis Report",
    date: new Date().toLocaleDateString(),
    company: "CreamCollar Technologies",
    role: "ADAS Computer Vision Engineer",
    candidate: "John Doe",
    overallScore: 72,
    skillGaps: [
      { skill: "Deep Learning", current: 65, required: 90, gap: 25 },
      { skill: "Computer Vision", current: 80, required: 95, gap: 15 },
      { skill: "Python", current: 85, required: 90, gap: 5 },
      { skill: "Machine Learning", current: 70, required: 85, gap: 15 },
      { skill: "ADAS Systems", current: 60, required: 90, gap: 30 },
      { skill: "Reinforcement Learning", current: 45, required: 80, gap: 35 }
    ],
    recommendations: [
      "Enroll in advanced Deep Learning specialization course",
      "Complete Computer Vision certification program",
      "Participate in ADAS systems hands-on workshop",
      "Practice Reinforcement Learning with real-world projects"
    ],
    trainingPlan: {
      duration: "6 months",
      cost: "$12,000",
      expectedImprovement: "35%",
      roi: "250%"
    }
  };

  const downloadSampleReport = () => {
    const reportContent = generateReportHTML(sampleReportData);
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Skill_Gap_Analysis_Report_${sampleReportData.candidate.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportHTML = (data: typeof sampleReportData) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 text-base">
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #4F46E5;
            font-size: 1.8em;
            margin-bottom: 20px;
            border-bottom: 3px solid #E5E7EB;
            padding-bottom: 10px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .info-card {
            background: #F8FAFC;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
        }
        .info-card strong {
            color: #4F46E5;
            display: block;
            margin-bottom: 5px;
        }
        .score-display {
            text-align: center;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
        }
        .score-display .score {
            font-size: 4em;
            font-weight: 700;
            margin: 0;
        }
        .skills-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .skills-table th,
        .skills-table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #E5E7EB;
        }
        .skills-table th {
            background: #F8FAFC;
            color: #4F46E5;
            font-weight: 600;
        }
        .skill-bar {
            width: 100%;
            height: 20px;
            background: #E5E7EB;
            border-radius: 10px;
            overflow: hidden;
            margin: 5px 0;
        }
        .skill-progress {
            height: 100%;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 10px;
            transition: width 0.3s ease;
        }
        .gap-indicator {
            color: #EF4444;
            font-weight: 600;
        }
        .recommendations {
            background: #FEF3C7;
            border-left: 4px solid #F59E0B;
            padding: 20px;
            border-radius: 8px;
        }
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        .recommendations li {
            margin-bottom: 10px;
        }
        .training-plan {
            background: linear-gradient(135deg, #EC4899 0%, #BE185D 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-top: 30px;
        }
        .training-plan h3 {
            margin-top: 0;
            font-size: 1.5em;
        }
        .plan-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .plan-item {
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
        }
        .plan-item .value {
            font-size: 1.5em;
            font-weight: 700;
            display: block;
        }
        .footer {
            background: #F8FAFC;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
        }
        .footer p {
            margin: 0;
            color: #6B7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.title}</h1>
            <p>Generated on ${data.date} | ${data.company}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Candidate Overview</h2>
                <div class="info-grid">
                    <div class="info-card">
                        <strong>Candidate Name:</strong>
                        ${data.candidate}
                    </div>
                    <div class="info-card">
                        <strong>Target Role:</strong>
                        ${data.role}
                    </div>
                    <div class="info-card">
                        <strong>Assessment Date:</strong>
                        ${data.date}
                    </div>
                </div>
                
                <div class="score-display">
                    <div class="score">${data.overallScore}%</div>
                    <p>Overall Skill Match Score</p>
                </div>
            </div>

            <div class="section">
                <h2>Detailed Skill Gap Analysis</h2>
                <table class="skills-table">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Current Level</th>
                            <th>Required Level</th>
                            <th>Gap</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.skillGaps.map(skill => `
                            <tr>
                                <td><strong>${skill.skill}</strong></td>
                                <td>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: ${skill.current}%"></div>
                                    </div>
                                    ${skill.current}%
                                </td>
                                <td>${skill.required}%</td>
                                <td class="gap-indicator">${skill.gap}% gap</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>AI-Powered Recommendations</h2>
                <div class="recommendations">
                    <h3>Recommended Learning Path</h3>
                    <ul>
                        ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2>Training Implementation Plan</h2>
                <div class="training-plan">
                    <h3>6-Month Development Program</h3>
                    <div class="plan-grid">
                        <div class="plan-item">
                            <span class="value">${data.trainingPlan.duration}</span>
    }
                        </div>
                        <div class="plan-item">
                            <span class="value">${data.trainingPlan.expectedImprovement}</span>
                            <span>Expected Improvement</span>
                        </div>
                        <div class="plan-item">
                            <span class="value">${data.trainingPlan.roi}</span>
                            <span>ROI</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Generated by CreamCollar AI Analytics | AI-Powered Skill Gap Analysis</p>
        </div>
    
</body>
</html>
    `;
  };

  const openPreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsGenerating(false);
            clearInterval(interval);
            return prev;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isGenerating, steps.length]);

  const startGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">


      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8 relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-black mb-3">
              AI-Powered Report Generation
            </h1>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              Transform your skill analysis into a comprehensive, stakeholder-ready report with interactive visualizations and actionable insights
            </p>
          </div>
        </div>

        {/* Report Features Grid */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-6 relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              What Your Report Will Include
            </h2>
            <p className="text-sm text-gray-600 mb-4">Comprehensive analysis tailored for executive decision-making</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reportFeatures.map((feature, index) => (
                <div key={index} className="group bg-white/80 rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md">
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Progress - AnalysisProgress Style */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-10 mb-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Generation Progress</span>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {Math.round(((generationStep + (isGenerating ? 1 : 0)) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-5 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                style={{ width: `${((generationStep + (isGenerating ? 1 : 0)) / steps.length) * 100}%` }}
              >
                <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              {generationStep < steps.length - 1 || isGenerating ? (
                <div className="relative">
                  <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-10 h-10 border-4 border-emerald-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className={`font-semibold text-lg text-gray-900 mb-2`}>
              {isGenerating ? steps[generationStep].title : (generationStep === steps.length - 1 ? 'Report Generation Complete!' : 'Ready to Generate Report')}
            </h3>
            <p className={`text-gray-600 text-base`}>
              {isGenerating ? steps[generationStep].description : (generationStep === steps.length - 1 ? 'Your report is ready for review.' : 'Click to start AI-powered report generation.')}
            </p>
          </div>

          {/* Generation Steps - Custom Layout */}
          <div className="mb-8">
            {/* First row: steps 1, 2, 3 */}
            <div className="flex flex-row justify-center gap-8 mb-8">
              {[0,1,2].map(idx => {
                const step = steps[idx];
                const completed = idx < generationStep;
                const active = idx === generationStep && isGenerating;
                return (
                  <div key={step.id} className={`w-64 p-6 rounded-2xl border transition-all duration-300 text-center ${
                    completed ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md' : 
                    active ? 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 shadow-md' : 
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex flex-col items-center mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        completed ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' : 
                        active ? 'bg-gradient-to-r from-blue-500 to-green-500 shadow-lg' : 
                        'bg-gray-300'
                      }`}>
                        {completed ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : active ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        ) : (
                          <span className="text-lg">{step.icon}</span>
                        )}
                      </div>
                      <span className="text-base font-medium text-gray-600">Step {step.id}</span>
                    </div>
                    <h4 className={`font-semibold text-base transition-all duration-300 ${
                      completed ? 'text-green-800' : 
                      active ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Second row: step 4 under 1 & 2, step 5 under 2 & 3 */}
            <div className="flex flex-row justify-center gap-8">
              <div className="w-64"></div>
              {[3,4].map((idx, i) => {
                const step = steps[idx];
                const completed = idx < generationStep;
                const active = idx === generationStep && isGenerating;
                return (
                  <div key={step.id} className={`w-64 p-6 rounded-2xl border transition-all duration-300 text-center ${
                    completed ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md' : 
                    active ? 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 shadow-md' : 
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex flex-col items-center mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        completed ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' : 
                        active ? 'bg-gradient-to-r from-blue-500 to-green-500 shadow-lg' : 
                        'bg-gray-300'
                      }`}>
                        {completed ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : active ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        ) : (
                          <span className="text-lg">{step.icon}</span>
                        )}
                      </div>
                      <span className="text-base font-medium text-gray-600">Step {step.id}</span>
                    </div>
                    <h4 className={`font-semibold text-base transition-all duration-300 ${
                      completed ? 'text-green-800' : 
                      active ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{step.description}</p>
                  </div>
                );
              })}
              <div className="w-64"></div>
            </div>
          </div>

          {/* Estimated Time/Status */}
          {isGenerating && generationStep < steps.length - 1 && (
            <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 mb-10 font-sans">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center">
                  <span className="text-green-800 font-semibold text-lg">
                    {generationStep < 2 ? 'Initializing report systems...' : 
                     generationStep < 4 ? 'AI algorithms processing...' : 
                     generationStep < steps.length - 1 ? 'Finalizing calculations...' :
                     'Almost complete...'}
                  </span>
                  <p className="text-green-600 text-base mt-2">
                    {generationStep < 3 ? 'Estimated time: 2-3 minutes' : 'Nearly finished...'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

            {!isGenerating && generationStep < steps.length - 1 && (
              <div className="text-center mt-10">
                <button
                  onClick={startGeneration}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg flex items-center mx-auto text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start AI Report Generation
                </button>
              </div>
            )}

            {!isGenerating && generationStep === steps.length - 1 && (
              <div className="text-center mt-10">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-green-800 mb-3">Report Generated Successfully!</h3>
                  <p className="text-lg text-gray-600">Your comprehensive skill analysis report is ready for review</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button 
                    onClick={downloadSampleReport}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg flex items-center text-base"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Sample Report
                  </button>
                  <button 
                    onClick={openPreview}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center text-base"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Report
                  </button>
                </div>
              </div>
            )}
        {/* Navigation removed as requested */}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Report Preview</h2>
              <button 
                onClick={closePreview}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Preview Content */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{sampleReportData.title}</h3>
                  <p className="text-lg text-gray-600">Generated on {sampleReportData.date} | {sampleReportData.company}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-base text-gray-600">Candidate</div>
                    <div className="font-semibold text-xl">{sampleReportData.candidate}</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-base text-gray-600">Role</div>
                    <div className="font-semibold text-xl">{sampleReportData.role}</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-base text-gray-600">Overall Score</div>
                    <div className="font-semibold text-3xl text-green-600">{sampleReportData.overallScore}%</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <h4 className="text-2xl font-bold mb-6">Skill Gap Analysis</h4>
                  <div className="space-y-3">
                    {sampleReportData.skillGaps.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{skill.skill}</div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" 
                              style={{ width: `${skill.current}%` }}>
                            </div>
                          </div>
                          <div className="text-base text-red-600 font-semibold mt-2">{skill.gap}% gap</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
                  <h4 className="text-2xl font-bold mb-6 text-yellow-800">Recommendations</h4>
                  <ul className="space-y-3">
                    {sampleReportData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8">
                  <h4 className="text-2xl font-bold mb-6 text-purple-800">Training Plan</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{sampleReportData.trainingPlan.duration}</div>
                      <div className="text-base text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{sampleReportData.trainingPlan.cost}</div>
                      <div className="text-base text-gray-600">Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{sampleReportData.trainingPlan.expectedImprovement}</div>
                      <div className="text-base text-gray-600">Expected Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{sampleReportData.trainingPlan.roi}</div>
                      <div className="text-base text-gray-600">ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 flex justify-between items-center">
              <button 
                onClick={closePreview}
                className="px-6 py-3 text-lg text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close Preview
              </button>
              <button 
                onClick={downloadSampleReport}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg flex items-center text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
  );
}
