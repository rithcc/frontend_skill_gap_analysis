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

  /*  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Choose Your <span className="modern-blue">Strategic Path</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Select your primary objective to unlock personalized AI-driven
          insights and recommendations tailored to your organization's unique
          goals and challenges.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {objectives.map((objective) => (
          <Card
            key={objective.id}
            className={`group relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 ${
              selectedObjective === objective.id
                ? "ring-2 ring-modern-blue shadow-xl"
                : "border border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectObjective(objective.id)}
          >
            <div className="p-8">
              {selectedObjective === objective.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-modern-blue rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`w-16 h-16 ${objective.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <objective.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {objective.title}
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {objective.subtitle}
              </p>

              <div className="space-y-3">
                <div className="text-sm font-semibold modern-blue mb-3">
                  Key Capabilities:
                </div>
                {objective.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <div
                      className={`w-2 h-2 ${objective.color} rounded-full mr-3`}
                    ></div>
                    {feature.icon ? (
                      <span className="mr-2">{feature.icon}</span>
                    ) : (
                      <span className="mr-2">
                        <Sparkles className="inline w-4 h-4 text-modern-blue" />
                      </span>
                    )}
                    {feature.title}
                    {feature.active && (
                      <span className="ml-2 text-modern-blue font-semibold">
                        (Active)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ); */

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {onBack && (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
        )}
        
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Choose Your Strategic Path
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select your objective and unlock tailored intelligence for your
            organization's unique goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {strategicPaths.map((path, index) => (
            <Card
              key={path.id}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl"
            >
              <div
                className={`absolute inset-0 ${path.bgColor} opacity-50`}
              ></div>
              <div className="relative p-8">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <path.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {path.title}
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {path.subtitle}
                </p>

                <div className="space-y-4">
                  {path.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        feature.active
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 cursor-pointer hover:shadow-md"
                          : "bg-gray-50 cursor-default"
                      }`}
                      onClick={feature.active ? handleUpskillClick : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{feature.icon}</span>
                        <span
                          className={`font-medium ${
                            feature.active ? "text-blue-700" : "text-gray-600"
                          }`}
                        >
                          {feature.title}
                        </span>
                      </div>
                      {feature.active && (
                        <div className="flex items-center space-x-2">
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
