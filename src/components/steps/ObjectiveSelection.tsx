import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Menu,
  User,
  Target,
  Lightbulb,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle,
  Zap,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface ObjectiveSelectionProps {
  selectedObjective: string | null;
  onSelectObjective: (objective: string) => void;
  onBack?: () => void;
}

const ObjectiveSelection = ({
  selectedObjective,
  onSelectObjective,
  onBack,
}: ObjectiveSelectionProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const strategicPaths = [
    {
      id: "team-productivity",
      title: "Improve Team Productivity",
      subtitle: "Enhance team performance and efficiency",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      features: [
        { icon: "🎯", title: "Project Fit Recommendations" },
        { icon: "📚", title: "Learning Path Creation" },
        { icon: "👥", title: "Mentor Matching" },
        { icon: "📋", title: "Curriculum Design" },
        { icon: "🚀", title: "Upskill for New Role", active: true },
      ],
    },
    {
      id: "innovation",
      title: "Drive Innovation",
      subtitle: "Foster a culture of innovation and growth",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: [
        { icon: "🌟", title: "Career Path Planning" },
        { icon: "💎", title: "High Potential Development" },
      ],
    },
    {
      id: "business-strategy",
      title: "Align with Business Strategy",
      subtitle: "Make informed decisions on talent development",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      features: [
        { icon: "⚖️", title: "Build vs Buy vs Borrow" },
        { icon: "🎓", title: "New Skill Development" },
        { icon: "🔄", title: "Role Transition" },
        { icon: "📖", title: "Strategic Curriculum" },
        { icon: "🏆", title: "Learning Programs" },
        { icon: "👑", title: "Succession Planning" },
      ],
    },
  ];

  const handleUpskillClick = () => {
    // Select the team-productivity objective to enable continue button
    onSelectObjective("team-productivity");
    
    if (!isAuthenticated) {
      setShowAuth(true);
    } else {
      setShowAnalysis(true);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-start justify-center bg-white font-sans pt-7 overflow-hidden">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        <div className="text-center w-full mb-0">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Choose Your Strategic Path
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-1xl mx-auto leading-normal">
            Select your objective and unlock tailored intelligence for your organization's unique goals
          </p>
        </div>
        {onBack && (
          <div className="mb-8">{/* Removed step-level back button, only header back button remains */}</div>
        )}
        <div className="grid lg:grid-cols-3 gap-6 w-full flex-1 mt-0">
          {strategicPaths.map((path, index) => (
            <Card
              key={path.id}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[340px] h-full"
            >
              <div className={`absolute inset-0 ${path.bgColor} opacity-50`}></div>
              <div className="relative p-6 flex flex-col flex-1">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <path.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {path.title}
                </h3>
                <p className="text-gray-600 mb-5 leading-normal text-sm">
                  {path.subtitle}
                </p>
                <div className="space-y-3 flex-1">
                  {path.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 ${
                        feature.active
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 cursor-pointer hover:shadow-md"
                          : "bg-gray-50 cursor-default"
                      }`}
                      onClick={feature.active ? handleUpskillClick : undefined}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{feature.icon}</span>
                        <span
                          className={`font-medium ${
                            feature.active ? "text-blue-700" : "text-gray-600"
                          } text-sm`}
                        >
                          {feature.title}
                        </span>
                      </div>
                      {feature.active && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectiveSelection;
