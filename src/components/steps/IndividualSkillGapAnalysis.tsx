'use client';
import React from "react";

interface IndividualSkillGapAnalysisProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function IndividualSkillGapAnalysis({ onNext, onBack }: IndividualSkillGapAnalysisProps) {
  const employee = {
    name: 'Sarah Johnson',
    role: 'Computer Vision Engineer',
    targetRole: 'Senior ADAS Computer Vision Engineer',
    avatar: 'SJ',
    overallReadiness: 78,
    experience: '8 years',
    department: 'Automotive R&D'
  };

  const skillsSummary = {
    ready: 6,
    needsDevelopment: 8,
    weeks: '12-16'
  };

  const skillCompetencies = [
    {
      skill: "Computer Vision",
      required: 4,
      actual: 3,
      requiredLabel: "Architect CV Pipelines",
      actualLabel: "Optimize CV Algorithms",
      gap: 1,
      category: "technical"
    },
    {
      skill: "Deep Learning",
      required: 4,
      actual: 2,
      requiredLabel: "Design Neural Networks",
      actualLabel: "Implement Models",
      gap: 2,
      category: "technical"
    },
    {
      skill: "ADAS Systems",
      required: 5,
      actual: 2,
      requiredLabel: "Lead ADAS Development",
      actualLabel: "Basic Understanding",
      gap: 3,
      category: "domain"
    },
    {
      skill: "Sensor Fusion",
      required: 4,
      actual: 1,
      requiredLabel: "Architect Fusion Systems",
      actualLabel: "Basic Concepts",
      gap: 3,
      category: "domain"
    },
    {
      skill: "Embedded Systems",
      required: 3,
      actual: 3,
      requiredLabel: "Optimize Performance",
      actualLabel: "Optimize Performance",
      gap: 0,
      category: "technical"
    },
    {
      skill: "C++/Python",
      required: 4,
      actual: 4,
      requiredLabel: "Expert Implementation",
      actualLabel: "Expert Implementation",
      gap: 0,
      category: "technical"
    }
  ];

  const criticalMissingSkills = [
    { skill: "ADAS System Architecture", priority: "Critical", impact: "Cannot design end-to-end ADAS solutions" },
    { skill: "Sensor Fusion Algorithms", priority: "Critical", impact: "Unable to integrate multi-sensor data effectively" },
    { skill: "ISO 26262 Compliance", priority: "High", impact: "Cannot ensure functional safety requirements" },
    { skill: "Real-time Processing", priority: "High", impact: "May struggle with performance-critical implementations" }
  ];

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
        {/* Enhanced Employee Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {employee.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h1>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{employee.role}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{employee.targetRole}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-40 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${employee.overallReadiness}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-gray-800">{employee.overallReadiness}% Ready</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {employee.experience} experience
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {employee.department}
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onBack || (() => window.history.back())}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Critical Missing Skills */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-400/10 to-orange-400/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              Critical Skills Required by Role
            </h3>
            <p className="text-gray-600 mb-8">High-priority skills that need immediate attention</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {criticalMissingSkills.map((skill, index) => (
                <div key={index} className={`relative group border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                  skill.priority === 'Critical' 
                    ? 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50 hover:border-red-300' 
                    : 'border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:border-orange-300'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-red-700 transition-colors">{skill.skill}</h4>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full shadow-sm ${
                      skill.priority === 'Critical' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      {skill.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{skill.impact}</p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Skill Analysis Map */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Skill Competency Analysis Map
            </h3>
            <p className="text-gray-600 mb-8">Interactive visualization of current vs required skill levels</p>
            
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Radar Chart with Enhanced Interactivity */}
              <div className="relative group">
                <svg width="450" height="450" viewBox="0 0 450 450" className="drop-shadow-lg">
                  {/* Background circles with gradient */}
                  {[1, 2, 3, 4, 5].map((level) => (
                    <circle
                      key={level}
                      cx="225"
                      cy="225"
                      r={level * 35}
                      fill="none"
                      stroke={level === 5 ? "#EF4444" : level === 4 ? "#F97316" : level === 3 ? "#EAB308" : level === 2 ? "#22C55E" : "#10B981"}
                      strokeWidth="2"
                      opacity="0.3"
                      strokeDasharray={level === 5 ? "5,5" : "none"}
                    />
                  ))}
                  
                  {/* Level labels */}
                  {[1, 2, 3, 4, 5].map((level) => (
                    <text
                      key={level}
                      x="225"
                      y={225 - (level * 35) - 5}
                      textAnchor="middle"
                      className="text-xs fill-gray-500 font-medium"
                    >
                      L{level}
                    </text>
                  ))}
                  
                  {/* Skill lines */}
                  {skillCompetencies.map((_, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180)
                    const x2 = 225 + Math.cos(angle) * 175
                    const y2 = 225 + Math.sin(angle) * 175
                    return (
                      <line
                        key={index}
                        x1="225"
                        y1="225"
                        x2={x2}
                        y2={y2}
                        stroke="#E5E7EB"
                        strokeWidth="2"
                      />
                    )
                  })}

                  {/* Required levels (outer ring - dashed red) */}
                  <polygon
                    points={skillCompetencies.map((skill, index) => {
                      const angle = (index * 60 - 90) * (Math.PI / 180)
                      const x = 225 + Math.cos(angle) * (skill.required * 35)
                      const y = 225 + Math.sin(angle) * (skill.required * 35)
                      return `${x},${y}`
                    }).join(' ')}
                    fill="rgba(239, 68, 68, 0.1)"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                  />

                  {/* Actual levels (inner ring - solid blue) */}
                  <polygon
                    points={skillCompetencies.map((skill, index) => {
                      const angle = (index * 60 - 90) * (Math.PI / 180)
                      const x = 225 + Math.cos(angle) * (skill.actual * 35)
                      const y = 225 + Math.sin(angle) * (skill.actual * 35)
                      return `${x},${y}`
                    }).join(' ')}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="#3B82F6"
                    strokeWidth="4"
                  />

                  {/* Interactive Skill Points with Enhanced Tooltips */}
                  {skillCompetencies.map((skill, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180)
                    const actualX = 225 + Math.cos(angle) * (skill.actual * 35)
                    const actualY = 225 + Math.sin(angle) * (skill.actual * 35)
                    const requiredX = 225 + Math.cos(angle) * (skill.required * 35)
                    const requiredY = 225 + Math.sin(angle) * (skill.required * 35)
                    const labelX = 225 + Math.cos(angle) * 200
                    const labelY = 225 + Math.sin(angle) * 200

                    return (
                      <g key={index}>
                        {/* Gap indicator line */}
                        <line
                          x1={actualX}
                          y1={actualY}
                          x2={requiredX}
                          y2={requiredY}
                          stroke="#F59E0B"
                          strokeWidth="3"
                          opacity="0.7"
                        />
                        
                        {/* Required point with enhanced tooltip */}
                        <g className="group/point cursor-pointer">
                          <circle
                            cx={requiredX}
                            cy={requiredY}
                            r="8"
                            fill="#EF4444"
                            stroke="white"
                            strokeWidth="3"
                            className="group-hover/point:r-10 transition-all duration-200 drop-shadow-md"
                          />
                          {/* Enhanced Tooltip for required level */}
                          <g className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                            <rect
                              x={requiredX - 100}
                              y={requiredY - 50}
                              width="200"
                              height="40"
                              fill="rgba(0,0,0,0.9)"
                              rx="8"
                              className="drop-shadow-lg"
                            />
                            <text
                              x={requiredX}
                              y={requiredY - 35}
                              textAnchor="middle"
                              className="text-xs fill-white font-bold"
                            >
                              Required: Level {skill.required}
                            </text>
                            <text
                              x={requiredX}
                              y={requiredY - 20}
                              textAnchor="middle"
                              className="text-xs fill-gray-200"
                            >
                              {skill.requiredLabel}
                            </text>
                          </g>
                        </g>
                        
                        {/* Actual point with enhanced tooltip */}
                        <g className="group/point cursor-pointer">
                          <circle
                            cx={actualX}
                            cy={actualY}
                            r="8"
                            fill="#3B82F6"
                            stroke="white"
                            strokeWidth="3"
                            className="group-hover/point:r-10 transition-all duration-200 drop-shadow-md"
                          />
                          {/* Enhanced Tooltip for actual level */}
                          <g className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                            <rect
                              x={actualX - 100}
                              y={actualY - 50}
                              width="200"
                              height="40"
                              fill="rgba(0,0,0,0.9)"
                              rx="8"
                              className="drop-shadow-lg"
                            />
                            <text
                              x={actualX}
                              y={actualY - 35}
                              textAnchor="middle"
                              className="text-xs fill-white font-bold"
                            >
                              Current: Level {skill.actual}
                            </text>
                            <text
                              x={actualX}
                              y={actualY - 20}
                              textAnchor="middle"
                              className="text-xs fill-gray-200"
                            >
                              {skill.actualLabel}
                            </text>
                          </g>
                        </g>

                        {/* Skill label with enhanced styling */}
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-bold fill-gray-800"
                        >
                          {skill.skill}
                        </text>
                        
                        {/* Gap indicator badge */}
                        <g>
                          <circle
                            cx={labelX}
                            cy={labelY + 20}
                            r="12"
                            fill={skill.gap === 0 ? "#10B981" : skill.gap === 1 ? "#F59E0B" : skill.gap === 2 ? "#F97316" : "#EF4444"}
                            className="drop-shadow-sm"
                          />
                          <text
                            x={labelX}
                            y={labelY + 25}
                            textAnchor="middle"
                            className="text-xs fill-white font-bold"
                          >
                            -{skill.gap}
                          </text>
                        </g>
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Enhanced Legend and Insights */}
              <div className="space-y-6 lg:w-80">
                <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Legend</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Current Skill Level</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-red-500 border-dashed rounded-full"></div>
                      <span className="text-gray-700 font-medium">Required Level</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Skill Gap</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Insights
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-blue-800"><strong>Strong Areas:</strong> C++/Python, Embedded Systems</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="text-blue-800"><strong>Moderate Gap:</strong> Computer Vision architecture</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-blue-800"><strong>Critical Gaps:</strong> ADAS Systems, Sensor Fusion</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">💡 Smart Recommendations</h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    Focus on <strong>ADAS system architecture</strong> and <strong>sensor fusion algorithms</strong> 
                    as priority areas. Your strong programming foundation will accelerate learning in these domains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Skill Competency Breakdown */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              Detailed Skill Competency Breakdown
            </h3>
            <p className="text-gray-600 mb-8">Comprehensive analysis of each skill area with actionable insights</p>
            
            <div className="space-y-6">
              {skillCompetencies.map((skill, index) => (
                <div key={index} className="group bg-white/80 rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${
                        skill.category === 'technical' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {skill.category === 'technical' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{skill.skill}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            skill.category === 'technical' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {skill.category === 'technical' ? 'Technical' : 'Domain Knowledge'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            skill.gap === 0 ? 'bg-green-100 text-green-800' :
                            skill.gap === 1 ? 'bg-yellow-100 text-yellow-800' :
                            skill.gap === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {skill.gap === 0 ? 'READY' : `GAP: ${skill.gap} LEVEL${skill.gap > 1 ? 'S' : ''}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800 mb-1">{skill.actual}/{skill.required}</div>
                      <div className="text-sm text-gray-500">Current/Required</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Current Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Current Level</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-40 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(skill.actual / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">Level {skill.actual}</span>
                      </div>
                    </div>

                    {/* Required Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Required Level</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-40 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(skill.required / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-red-600">Level {skill.required}</span>
                      </div>
                    </div>

                    {/* Competency Labels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h5 className="font-medium text-blue-900 mb-2">Current Competency</h5>
                        <p className="text-sm text-blue-800">{skill.actualLabel}</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <h5 className="font-medium text-red-900 mb-2">Target Competency</h5>
                        <p className="text-sm text-red-800">{skill.requiredLabel}</p>
                      </div>
                    </div>

                    {/* Gap Analysis */}
                    {skill.gap > 0 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <h5 className="font-medium text-yellow-900">Development Required</h5>
                        </div>
                        <p className="text-sm text-yellow-800">
                          {skill.gap === 1 ? 'Moderate skill enhancement needed' : 
                           skill.gap === 2 ? 'Significant development required' : 
                           'Critical skill gap requiring intensive training'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Candidate Summary */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full -translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Candidate Summary
            </h3>
            <p className="text-gray-600 mb-8">Overall assessment and readiness metrics</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-all duration-300 group hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">{skillsSummary.ready}</div>
                <div className="text-sm text-gray-600 font-medium">Skills Ready</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 group hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-1">{skillsSummary.needsDevelopment}</div>
                <div className="text-sm text-gray-600 font-medium">Skills Need Development</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 group hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{skillsSummary.weeks}</div>
                <div className="text-sm text-gray-600 font-medium">Weeks to Role Ready</div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Assessment Summary</h4>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>{employee.name}</strong> demonstrates exceptional technical programming skills and embedded systems expertise. 
                    However, {employee.name?.split(' ')[0] || 'the candidate'} requires focused development in ADAS domain knowledge and sensor fusion capabilities. 
                    With targeted training in automotive systems and hands-on ADAS project experience, {employee.name?.split(' ')[0] || 'she'} can achieve 
                    role readiness within <strong>{skillsSummary.weeks} weeks</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Navigation */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={onBack || (() => window.history.back())}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Analysis
            </button>
            <button
              onClick={onNext || (() => console.log('Navigate to recommendations'))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get AI Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
