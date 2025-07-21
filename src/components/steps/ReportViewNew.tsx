'use client';
import React from "react";

interface ReportViewProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function ReportView({ onNext, onBack }: ReportViewProps) {
  const reportSummary = {
    candidate: "Sarah Johnson",
    role: "Senior ADAS Computer Vision Engineer",
    overallReadiness: 78,
    skillsReady: 6,
    skillsNeedDevelopment: 8,
    estimatedWeeks: "12-16",
    criticalGaps: 4,
    priority: "High"
  };

  const keyMetrics = [
    { label: "Technical Skills", score: 82, color: "from-blue-500 to-cyan-500" },
    { label: "Domain Knowledge", score: 65, color: "from-purple-500 to-pink-500" },
    { label: "ADAS Experience", score: 45, color: "from-red-500 to-orange-500" },
    { label: "Leadership Potential", score: 88, color: "from-green-500 to-emerald-500" }
  ];

  const recommendations = [
    {
      priority: "Critical",
      skill: "ADAS System Architecture",
      duration: "4-6 weeks",
      impact: "High",
      color: "from-red-500 to-orange-500"
    },
    {
      priority: "High",
      skill: "Sensor Fusion Algorithms",
      duration: "3-4 weeks",
      impact: "High",
      color: "from-orange-500 to-yellow-500"
    },
    {
      priority: "Medium",
      skill: "Deep Learning Enhancement",
      duration: "2-3 weeks",
      impact: "Medium",
      color: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header with Glassmorphism */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                Comprehensive Skills Report
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Skills Report Dashboard
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Individual Skills Assessment Report
              </h1>
              <p className="text-xl text-gray-600">Comprehensive analysis and development roadmap</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Candidate Summary */}
              <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    SJ
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{reportSummary.candidate}</h3>
                    <p className="text-gray-600">{reportSummary.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Overall Readiness</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${reportSummary.overallReadiness}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-emerald-600">{reportSummary.overallReadiness}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{reportSummary.skillsReady}</div>
                      <div className="text-sm text-gray-600">Skills Ready</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{reportSummary.skillsNeedDevelopment}</div>
                      <div className="text-sm text-gray-600">Need Development</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="space-y-6">
                  {keyMetrics.map((metric, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">{metric.label}</span>
                        <span className="text-lg font-bold text-gray-800">{metric.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${metric.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:scale-105`}
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Recommendations */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Priority Learning Recommendations
            </h2>
            <p className="text-gray-600 mb-8">AI-powered development roadmap tailored for ADAS expertise</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="group bg-white/80 rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full text-white bg-gradient-to-r ${rec.color}`}>
                      {rec.priority}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-bold text-gray-800">{rec.duration}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {rec.skill}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Impact:</span>
                      <span className={`text-sm font-medium ${
                        rec.impact === 'High' ? 'text-red-600' : 
                        rec.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {rec.impact}
                      </span>
                    </div>
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Generation CTA */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate Detailed Report?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Create a comprehensive PDF report with detailed analysis, learning paths, and implementation timeline 
              for stakeholder review and development planning.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Executive Summary</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Detailed Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Action Plan</span>
              </div>
            </div>
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
              Back to Recommendations
            </button>
            <button
              onClick={onNext || (() => console.log('Navigate to report generation'))}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
