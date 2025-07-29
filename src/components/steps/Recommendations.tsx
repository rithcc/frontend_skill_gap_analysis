'use client';
import React from "react";

interface RecommendationsProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function Recommendations({ onNext, onBack }: RecommendationsProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-[15px] md:text-[16px]">
      {/* Header removed as requested */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Title and Description only, no icon or box */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          AI-Powered Learning Recommendations
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2 max-w-2xl mx-auto">
          Personalized strategies and curated learning paths for Sarah Johnson to become a Senior ADAS Computer Vision Engineer.
        </p>
      </div>

        {/* Enhanced Priority Recommendations */}
        <div className="mb-8">
          <div className="bg-white/90 rounded-3xl shadow-2xl border border-white/20 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-400/10 to-orange-400/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative">
              <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                Critical Learning Priorities
              </h3>
              <p className="text-gray-600 mb-4 ml-10 text-sm">Focus areas requiring immediate attention for role readiness</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ADAS Systems Recommendation */}
                <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-red-200 p-6 hover:shadow-2xl hover:border-red-300 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-400/20 to-orange-400/20 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">ADAS System Architecture</h4>
                          <p className="text-gray-600 mt-1 text-sm">Advanced Driver Assistance Systems</p>
                        </div>
                      </div>
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        Critical Gap
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 leading-normal text-sm">
                      Master end-to-end ADAS system design, from sensor integration to safety-critical algorithm implementation for automotive applications.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center bg-blue-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">ADAS Architecture & Design Patterns</span>
                      </div>
                      <div className="flex items-center bg-blue-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">Sensor Fusion & Kalman Filtering</span>
                      </div>
                      <div className="flex items-center bg-blue-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">Real-time Safety Systems</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-sm">12-16 weeks</span>
                      </div>
                      <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                        Start Learning Path →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Computer Vision Recommendation */}
                <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-red-200 p-6 hover:shadow-2xl hover:border-red-300 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-400/20 to-blue-400/20 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Advanced Computer Vision</h4>
                          <p className="text-gray-600 mt-1 text-sm">Deep Learning & Neural Networks</p>
                        </div>
                      </div>
                      <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        Critical Gap
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 leading-normal text-sm">
                      Advance from algorithm optimization to designing and architecting complete computer vision pipelines for automotive applications.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center bg-purple-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">Custom Neural Network Architecture</span>
                      </div>
                      <div className="flex items-center bg-purple-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">Advanced Object Detection & Tracking</span>
                      </div>
                      <div className="flex items-center bg-purple-50 p-3 rounded-xl">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                        <span className="text-gray-800 font-medium text-sm">CV Pipeline Architecture</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-sm">8-10 weeks</span>
                      </div>
                      <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                        Start Learning Path →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-white/20 p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              Recommended Learning Resources
            </h3>
            <p className="text-gray-600 mb-4 ml-10 text-sm">Curated platforms and resources for optimal skill development</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/80 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm">Online Courses</h4>
                <p className="text-xs text-gray-600">Coursera, Udemy, edX</p>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors text-sm">Certifications</h4>
                <p className="text-xs text-gray-600">AWS, NVIDIA, ISO 26262</p>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors text-sm">Communities</h4>
                <p className="text-xs text-gray-600">Stack Overflow, GitHub</p>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors text-sm">Practice Labs</h4>
                <p className="text-xs text-gray-600">Hands-on projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Only Start Learning Journey button centered at bottom */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-4">
            <button
              onClick={onNext || (() => console.log('Generate detailed report'))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Detailed Report
            </button>
            <button
              onClick={() => console.log('Start learning journey')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
              </svg>
              Start Learning Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
