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

    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{letterSpacing: '-0.01em', lineHeight: '1.2'}}>
          Individual Skills Assessment Report
        </h1>
        <p className="text-base text-gray-600">Comprehensive analysis and development roadmap</p>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full max-w-5xl mx-auto">
        {/* Candidate Summary */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 relative overflow-hidden flex-1 min-w-[280px]">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
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
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm">
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
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 relative overflow-hidden flex-1 min-w-[280px]">
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
      {/* End of flex row */}

      {/* Priority Recommendations */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Priority Learning Recommendations
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-6">AI-powered development roadmap tailored for ADAS expertise</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="group bg-white/80 rounded-2xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full text-white bg-gradient-to-r ${rec.color}`}>
                    {rec.priority}
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-800">{rec.duration}</div>
                  </div>
                </div>
                
                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                  {rec.skill}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Impact:</span>
                    <span className={`text-xs font-medium ${
                      rec.impact === 'High' ? 'text-red-600' : 
                      rec.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Generation CTA */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-3 mb-6 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-7 translate-x-7"></div>
        <div className="relative text-center w-full">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Ready to Generate Detailed Report?</h2>
          <p className="text-sm md:text-base text-gray-700 mb-4 max-w-xl mx-auto">Create a comprehensive PDF report with detailed analysis, learning paths, and implementation timeline for stakeholder review and development planning.</p>
          <button
            onClick={onNext || (() => console.log('Navigate to report generation'))}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm mx-auto"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Detailed Report
          </button>
        </div>
      </div>

      {/* Navigation */}
      {/* Navigation removed as requested */}
    </div>
  </div>
  );
}
