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
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
            color: white;
            padding: 40px;
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
                            <span>Duration</span>
                        </div>
                        <div class="plan-item">
                            <span class="value">${data.trainingPlan.cost}</span>
                            <span>Investment</span>
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
      {/* Modern Header with Glassmorphism */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                AI-Powered Report Generation
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
        {/* Hero Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              AI-Powered Report Generation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your skill analysis into a comprehensive, stakeholder-ready report with interactive visualizations and actionable insights
            </p>
          </div>
        </div>

        {/* Report Features Grid */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              What Your Report Will Include
            </h2>
            <p className="text-gray-600 mb-8">Comprehensive analysis tailored for executive decision-making</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportFeatures.map((feature, index) => (
                <div key={index} className="group bg-white/80 rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Progress */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-400/10 to-emerald-400/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Generation Progress
            </h2>
            <p className="text-gray-600 mb-8">AI is processing your data to create insights</p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                  index <= generationStep && isGenerating
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                    : index === generationStep && isGenerating
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                    index < generationStep && isGenerating
                      ? 'bg-green-500 text-white'
                      : index === generationStep && isGenerating
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < generationStep && isGenerating ? '✓' : step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${
                      index <= generationStep && isGenerating ? 'text-green-800' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      index <= generationStep && isGenerating ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {index === generationStep && isGenerating && (
                    <div className="w-8 h-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isGenerating && generationStep < steps.length - 1 && (
              <div className="text-center mt-8">
                <button
                  onClick={startGeneration}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start AI Report Generation
                </button>
              </div>
            )}

            {!isGenerating && generationStep === steps.length - 1 && (
              <div className="text-center mt-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Report Generated Successfully!</h3>
                  <p className="text-gray-600">Your comprehensive skill analysis report is ready for review</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={downloadSampleReport}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Sample Report
                  </button>
                  <button 
                    onClick={openPreview}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center"
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
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={onBack || (() => window.history.back())}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Report View
            </button>
            
            {!isGenerating && generationStep === steps.length - 1 && (
              <button
                onClick={onNext || (() => console.log('Navigate to SGA Analysis'))}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                View Team Analysis
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Report Preview</h2>
              <button 
                onClick={closePreview}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Preview Content */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{sampleReportData.title}</h3>
                  <p className="text-gray-600">Generated on {sampleReportData.date} | {sampleReportData.company}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Candidate</div>
                    <div className="font-semibold text-lg">{sampleReportData.candidate}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Role</div>
                    <div className="font-semibold text-lg">{sampleReportData.role}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className="font-semibold text-2xl text-green-600">{sampleReportData.overallScore}%</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-4">Skill Gap Analysis</h4>
                  <div className="space-y-3">
                    {sampleReportData.skillGaps.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{skill.skill}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                              style={{ width: `${skill.current}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-600">{skill.current}% / {skill.required}%</div>
                          <div className="text-sm text-red-600 font-medium">{skill.gap}% gap</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-4 text-yellow-800">Recommendations</h4>
                  <ul className="space-y-2">
                    {sampleReportData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-4 text-purple-800">Training Plan</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{sampleReportData.trainingPlan.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{sampleReportData.trainingPlan.cost}</div>
                      <div className="text-sm text-gray-600">Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{sampleReportData.trainingPlan.expectedImprovement}</div>
                      <div className="text-sm text-gray-600">Expected Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{sampleReportData.trainingPlan.roi}</div>
                      <div className="text-sm text-gray-600">ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex justify-between items-center">
              <button 
                onClick={closePreview}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close Preview
              </button>
              <button 
                onClick={downloadSampleReport}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
