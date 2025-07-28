"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Member {
  name: string;
  gaps: number;
  level: "minimal" | "moderate" | "significant";
  fitmentScore: number;
}

interface SGAAnalysisProps {
  onBack?: () => void;
  onNext?: (memberName?: string) => void;
}

export default function SGAAnalysis({ onBack, onNext }: SGAAnalysisProps) {
  // State for dynamic data
  const [roleName, setRoleName] = useState(
    "ADAS Computer Vision Engineer - Automotive Industry"
  );
  const [teamData, setTeamData] = useState({
    totalMembers: 0,
    roleReady: 0,
    minimalUpskilling: 0,
    fullTraining: 0,
    averageSkillGap: 0,
    teamPotential: 0,
  });

  const [skillGapMembers, setSkillGapMembers] = useState<Member[]>([]);

  // Load dynamic data from localStorage on component mount
  useEffect(() => {
    try {
      // Get role name from selectedRole
      const selectedRole = localStorage.getItem("selectedRole");
      if (selectedRole) {
        const roleData = JSON.parse(selectedRole);
        if (roleData.ROLE_NAME) {
          setRoleName(roleData.ROLE_NAME);
        }
      }

      // Get resume analysis results
      const allResumeResults = localStorage.getItem("allResumeAnalysisResults");
      if (allResumeResults) {
        const results = JSON.parse(allResumeResults);
        console.log("Loaded resume analysis results:", results);

        if (results && results.length > 0) {
          const totalMembers = results.length;
          let roleReady = 0;
          let minimalUpskilling = 0;
          let fullTraining = 0;
          let totalSkillGap = 0;
          let totalFitmentScore = 0;
          let validSkillGapCount = 0;
          const members: Member[] = [];

          results.forEach(
            (
              result: {
                skillGapPercentage?: number;
                fitmentScore?: number;
                fitment_score?: number;
                name?: string;
                avg_skill_gap?: number;
                resume_text?: string;
              },
              index: number
            ) => {
              const fitmentScore = Number(result.fitment_score) || 0;
              const skillGap = Number(result.avg_skill_gap);

              console.log(`Processing resume ${index + 1}:`, {
                fitmentScore,
                skillGap,
                originalSkillGap: result.avg_skill_gap,
                isSkillGapValid: !isNaN(skillGap),
              });

              // Calculate readiness categories based on fitment score
              if (fitmentScore >= 60) {
                roleReady++;
              } else if (fitmentScore >= 40) {
                minimalUpskilling++;
              } else {
                fullTraining++;
              }

              // Only include valid skill gap values in calculation
              if (!isNaN(skillGap)) {
                totalSkillGap += skillGap;
                validSkillGapCount++;
                console.log(
                  `Valid skill gap added: ${skillGap}, Running total: ${totalSkillGap}, Count: ${validSkillGapCount}`
                );
              } else {
                console.log(
                  `Invalid skill gap skipped for resume ${index + 1}:`,
                  result.avg_skill_gap
                );
              }

              totalFitmentScore += fitmentScore;

              // Extract member name from resume or use index
              let memberName = `Resume ${index + 1}`;
              if (result.resume_text) {
                // Try to extract name from resume text (simple heuristic)
                const nameMatch = result.resume_text.match(
                  /Name\s*:?\s*([A-Za-z\s]+)/i
                );
                if (nameMatch) {
                  memberName = nameMatch[1].trim();
                }
              }

              const finalSkillGap = skillGap && !isNaN(skillGap) ? skillGap : 0;
              members.push({
                name: memberName,
                gaps: Math.floor(finalSkillGap),
                level:
                  finalSkillGap <= 1
                    ? "minimal"
                    : finalSkillGap <= 3
                    ? "moderate"
                    : "significant",
                fitmentScore,
              });
            }
          );

          // Calculate average skill gap with proper handling of invalid values
          const averageSkillGap =
            validSkillGapCount > 0
              ? parseFloat((totalSkillGap / validSkillGapCount).toFixed(1))
              : 0;

          setTeamData({
            totalMembers,
            roleReady,
            minimalUpskilling,
            fullTraining,
            averageSkillGap,
            teamPotential: Math.round(totalFitmentScore / totalMembers),
          });

          setSkillGapMembers(members);
        }
      }
    } catch (error) {
      console.error("Error loading dynamic data:", error);
    }
  }, []);

  const kpis = [
    {
      label: "Role Ready",
      value: Math.round((teamData.roleReady / teamData.totalMembers) * 100),
      count: teamData.roleReady,
      icon: "✓",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Minimal Upskilling",
      value: Math.round(
        (teamData.minimalUpskilling / teamData.totalMembers) * 100
      ),
      count: teamData.minimalUpskilling,
      icon: "↗",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Full Training Required",
      value: Math.round((teamData.fullTraining / teamData.totalMembers) * 100),
      count: teamData.fullTraining,
      icon: "📚",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      label: "Avg Skill Gap",
      value: teamData.averageSkillGap,
      suffix: " skills",
      icon: "📊",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  // State for selected heatmap box
  const [selectedBox, setSelectedBox] = useState<{ row: number; col: number } | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
        {/* Centered Title and Description */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-black text-center mb-2">
            Team Skill Gap Analysis
          </h1>
          <p className="text-base text-gray-700 text-center max-w-2xl mb-2">
            Comprehensive skill gap analysis for your team.
          </p>
        </div>
        {/* Hero Section */}
          {/* Team Readiness Overview */}

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Team Readiness Overview</h2>
              <span className="text-base text-gray-600 mb-8 text-center">Current skill alignment for {roleName} role</span>
              {/* KPIs horizontal alignment */}
              <div className="flex flex-row items-stretch justify-center gap-8 mb-8">
                {/* Role Ready */}
                <div className="flex flex-col items-center justify-center w-64">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeDasharray={`${
                          teamData.totalMembers > 0
                            ? (teamData.roleReady / teamData.totalMembers) * 314
                            : 0
                        } 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-green-600">
                        {teamData.totalMembers > 0
                          ? Math.round(
                              (teamData.roleReady / teamData.totalMembers) * 100
                            )
                          : 0}
                        %
                      </span>
                      <span className="text-xs text-gray-500">
                        {teamData.roleReady}/{teamData.totalMembers}
                      </span>
                    </div>
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-1">
                    Role Ready
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    All skills met
                  </div>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ready to deploy
                  </div>
                </div>
                {/* Minimal Upskilling */}
                <div className="flex flex-col items-center justify-center w-64">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        strokeDasharray={`${
                          teamData.totalMembers > 0
                            ? (teamData.minimalUpskilling /
                                teamData.totalMembers) *
                              314
                            : 0
                        } 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {teamData.totalMembers > 0
                        ? Math.round(
                            (teamData.minimalUpskilling /
                              teamData.totalMembers) *
                              100
                          )
                        : 0}
                      %
                    </span>
                    <span className="text-xs text-gray-500">
                      {teamData.minimalUpskilling}/{teamData.totalMembers}
                    </span>
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-1">
                    Minimal Upskilling
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    1-2 skills needed
                  </div>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2-4 weeks training
                  </div>
                </div>
                {/* Full Training Required */}
                <div className="flex flex-col items-center justify-center w-64">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="8"
                        strokeDasharray={`${
                          teamData.totalMembers > 0
                            ? (teamData.fullTraining / teamData.totalMembers) *
                              314
                            : 0
                        } 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-amber-600">
                        {teamData.totalMembers > 0
                          ? Math.round(
                              (teamData.fullTraining / teamData.totalMembers) *
                                100
                            )
                          : 0}
                        %
                      </span>
                      <span className="text-xs text-gray-500">
                        {teamData.fullTraining}/{teamData.totalMembers}
                      </span>
                    </div>
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-1">
                    Full Training Required
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Full training needed
                  </div>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    8-12 weeks program
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {teamData.averageSkillGap}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Avg Skill Gap
                </div>
                <div className="text-xs text-gray-500">skills per person</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  6-8
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Weeks to Full Readiness
                </div>
                <div className="text-xs text-gray-500">estimated timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {teamData.teamPotential}%
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Team Potential
                </div>
                <div className="text-xs text-gray-500">
                  with targeted training
                </div>
              </div>
            </div>
          </div>

          {/* Main Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Current vs Required Skills Spider Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Current vs Required Skills
              </h3>
              <div className="relative h-80 flex items-center justify-center">
                {/* Spider Chart Container */}
                <div className="relative w-64 h-64">
                  {/* Chart Background */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 200"
                  >
                    {/* Grid Lines */}
                    <g className="opacity-20">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <polygon
                          key={level}
                          points="100,20 173,65 173,135 100,180 27,135 27,65"
                          fill="none"
                          stroke="#6B7280"
                          strokeWidth="1"
                          transform={`scale(${level * 0.2}) translate(${
                            100 - level * 20
                          }, ${100 - level * 20})`}
                        />
                      ))}
                      {/* Axis Lines */}
                      {[
                        "100,20",
                        "173,65",
                        "173,135",
                        "100,180",
                        "27,135",
                        "27,65",
                      ].map((point, i) => (
                        <line
                          key={i}
                          x1="100"
                          y1="100"
                          x2={point.split(",")[0]}
                          y2={point.split(",")[1]}
                          stroke="#6B7280"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Required Skills (Red) */}
                    <polygon
                      points="100,30 160,70 160,130 100,170 40,130 40,70"
                      fill="rgba(239, 68, 68, 0.2)"
                      stroke="#EF4444"
                      strokeWidth="2"
                    />

                    {/* Current Skills (Blue) */}
                    <polygon
                      points="100,50 140,80 140,120 100,150 60,120 60,80"
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Skill Labels */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                    Computer Vision
                  </div>
                  <div className="absolute top-12 right-2 text-xs font-medium text-gray-700">
                    Deep Learning
                  </div>
                  <div className="absolute bottom-12 right-2 text-xs font-medium text-gray-700">
                    ADAS Systems
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                    Sensor Fusion
                  </div>
                  <div className="absolute bottom-12 left-2 text-xs font-medium text-gray-700">
                    Embedded Systems
                  </div>
                  <div className="absolute top-12 left-2 text-xs font-medium text-gray-700">
                    C++/Python
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Current Skills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Required Skills</span>
                </div>
              </div>
            </div>

            {/* Skill Gaps by Team Member */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Skill Gaps by Team Member
              </h3>
              <div className="space-y-4">
                {[...skillGapMembers,
                  { name: "Arjun Kumar", gaps: 1, level: "minimal", fitmentScore: 65 },
                  { name: "Priya Sharma", gaps: 2, level: "moderate", fitmentScore: 50 },
                  { name: "Rahul Verma", gaps: 3, level: "significant", fitmentScore: 35 },
                  { name: "Ananya Reddy", gaps: 0, level: "minimal", fitmentScore: 70 },
                  { name: "Vikram Singh", gaps: 2, level: "moderate", fitmentScore: 45 },
                  { name: "Neha Desai", gaps: 1, level: "minimal", fitmentScore: 60 },
                  { name: "Arjun Iyer", gaps: 4, level: "significant", fitmentScore: 30 },
                  { name: "Divya Malhotra", gaps: 2, level: "moderate", fitmentScore: 48 }
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-[11px] font-medium text-gray-600">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 text-[13px]">
                        {member.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-28">
                        <div
                          className={`h-2 rounded-full ${
                            member.level === "minimal"
                              ? "bg-green-500"
                              : member.level === "moderate"
                              ? "bg-yellow-500"
                              : "bg-red-500"}
                          }`}
                          style={{ width: `${(member.gaps / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                          member.level === "minimal"
                            ? "bg-green-100 text-green-800"
                            : member.level === "moderate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"}
                        }`}
                      >
                        {member.gaps} gap{member.gaps !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Gaps Heatmap */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Skill Gaps Heatmap
            </h3>
            <div className="space-y-4">
              {/* Single skill labels row, bold and evenly spaced */}
              <div className="grid grid-cols-7 gap-6 mb-4 w-full">
                <div></div>
                <div className="text-center text-sm font-bold text-gray-900">Computer Vision</div>
                <div className="text-center text-sm font-bold text-gray-900">Deep Learning</div>
                <div className="text-center text-sm font-bold text-gray-900">ADAS Systems</div>
                <div className="text-center text-sm font-bold text-gray-900">Sensor Fusion</div>
                <div className="text-center text-sm font-bold text-gray-900">Embedded Systems</div>
                <div className="text-center text-sm font-bold text-gray-900">C++/Python</div>
              </div>
              {/* Member rows */}
              {[
                { name: "Arjun kumar", skills: [0, 1, 0, 2, 0, 1] },
                { name: "Priya", skills: [1, 1, 0, 0, 0, 3] },
                { name: "Rahul", skills: [1, 2, 1, 1, 0, 1] },
                { name: "Ananya Reddy", skills: [0, 0, 0, 0, 2, 2] },
                { name: "Vikram", skills: [2, 1, 1, 0, 1, 0] },
                { name: "Neha Desai", skills: [0, 1, 0, 0, 0, 0] },
                { name: "Arjun Iyer", skills: [2, 2, 1, 2, 1, 1] },
                { name: "Divya Malhotra", skills: [1, 0, 1, 1, 0, 0] },
              ].map((member, idx) => {
                const isSelected = selectedBox && selectedBox.row === idx;
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-7 gap-6 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer transition-all duration-200 items-center
                      ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' : 'hover:ring-2 hover:ring-blue-300'}`}
                    onClick={() => setSelectedBox({ row: idx, col: 0 })}
                  >
                    <div className="font-semibold text-blue-700 text-sm underline min-w-[120px] text-left">{member.name}</div>
                    {member.skills.map((gap, skillIdx) => (
                      <div
                        key={skillIdx}
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-xs font-bold mx-auto
                          ${gap === 0
                            ? "bg-green-100 text-green-800"
                            : gap === 1
                            ? "bg-white text-yellow-800 border border-yellow-200"
                            : gap === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"}
                        `}
                      >
                        {gap}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm text-gray-600">0 - No Gap</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white border border-yellow-200 rounded"></div>
                <span className="text-sm text-gray-600">1 - Minor Gap</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
                <span className="text-sm text-gray-600">2 - Moderate Gap</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-sm text-gray-600">
                  3+ - Significant Gap
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={onBack}
              className="inline-flex items-center px-6 py-3 font-semibold rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => onNext && onNext()}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-lg"
            >
              Walk through Individual Skill Gaps
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
  );
};
