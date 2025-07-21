
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, TrendingUp, Users, Target, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface SkillGapDemoProps {
  onBack: () => void;
}

const SkillGapDemo = ({ onBack }: SkillGapDemoProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const skillCategories = [
    {
      category: "Technical Skills",
      icon: Brain,
      color: "bg-modern-blue",
      skills: [
        { name: "JavaScript/TypeScript", level: "Expert", gap: 0, trend: "stable" },
        { name: "React Development", level: "Advanced", gap: 15, trend: "growing" },
        { name: "Python Programming", level: "Intermediate", gap: 35, trend: "growing" },
        { name: "Machine Learning", level: "Beginner", gap: 65, trend: "critical" },
        { name: "Cloud Architecture", level: "Intermediate", gap: 40, trend: "growing" },
        { name: "DevOps Practices", level: "Beginner", gap: 55, trend: "critical" }
      ]
    },
    {
      category: "Soft Skills",
      icon: Users,
      color: "bg-modern-green",
      skills: [
        { name: "Leadership", level: "Advanced", gap: 20, trend: "stable" },
        { name: "Communication", level: "Intermediate", gap: 25, trend: "improving" },
        { name: "Project Management", level: "Advanced", gap: 10, trend: "stable" },
        { name: "Problem Solving", level: "Expert", gap: 5, trend: "stable" },
        { name: "Team Collaboration", level: "Advanced", gap: 15, trend: "improving" },
        { name: "Adaptability", level: "Intermediate", gap: 30, trend: "growing" }
      ]
    },
    {
      category: "Industry Knowledge",
      icon: TrendingUp,
      color: "bg-modern-purple",
      skills: [
        { name: "FinTech Regulations", level: "Intermediate", gap: 35, trend: "critical" },
        { name: "Digital Banking", level: "Advanced", gap: 20, trend: "growing" },
        { name: "Cybersecurity", level: "Beginner", gap: 60, trend: "critical" },
        { name: "Data Analytics", level: "Intermediate", gap: 30, trend: "growing" },
        { name: "Customer Experience", level: "Advanced", gap: 15, trend: "stable" },
        { name: "Market Research", level: "Intermediate", gap: 25, trend: "improving" }
      ]
    }
  ];

  const handleSkillToggle = (skillName: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const runAnalysis = () => {
    setShowAnalysis(true);
  };

  const getGapColor = (gap: number) => {
    if (gap === 0) return "text-modern-green";
    if (gap <= 20) return "text-modern-yellow";
    if (gap <= 40) return "text-modern-orange";
    return "text-modern-red";
  };

  const getGapBadge = (gap: number) => {
    if (gap === 0) return { text: "No Gap", color: "bg-modern-green" };
    if (gap <= 20) return { text: "Minor Gap", color: "bg-modern-yellow" };
    if (gap <= 40) return { text: "Moderate Gap", color: "bg-modern-orange" };
    return { text: "Critical Gap", color: "bg-modern-red" };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "critical": return <AlertCircle className="w-4 h-4 text-modern-red" />;
      case "growing": return <TrendingUp className="w-4 h-4 text-modern-orange" />;
      case "improving": return <CheckCircle className="w-4 h-4 text-modern-green" />;
      case "stable": return <Target className="w-4 h-4 text-modern-blue" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Skill Gap Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select skills to analyze and see how our AI identifies gaps, trends, and recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={selectedSkills.includes(skill.name)}
                      onCheckedChange={() => handleSkillToggle(skill.name)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 truncate">{skill.name}</span>
                        {getTrendIcon(skill.trend)}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{skill.level}</span>
                        <Badge className={`${getGapBadge(skill.gap).color} text-white text-xs`}>
                          {skill.gap === 0 ? "✓" : `${skill.gap}% gap`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {selectedSkills.length > 0 && (
          <div className="text-center mb-8">
            <Card className="inline-block p-6 bg-white shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-900">
                  {selectedSkills.length} skills selected for analysis
                </div>
                <Button 
                  onClick={runAnalysis}
                  className="bg-modern-blue hover:bg-modern-blue/90 text-white"
                >
                  Run AI Analysis
                </Button>
              </div>
            </Card>
          </div>
        )}

        {showAnalysis && selectedSkills.length > 0 && (
          <Card className="p-8 bg-white shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis Results</h2>
              <p className="text-gray-600">Based on your selected skills, here's what our AI discovered:</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSkills.map((skillName) => {
                const skill = skillCategories
                  .flatMap(cat => cat.skills)
                  .find(s => s.name === skillName);
                
                if (!skill) return null;

                const gapBadge = getGapBadge(skill.gap);

                return (
                  <Card key={skillName} className="p-6 border-l-4 border-l-modern-blue">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      {getTrendIcon(skill.trend)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Level:</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Gap Analysis:</span>
                        <Badge className={`${gapBadge.color} text-white`}>
                          {gapBadge.text}
                        </Badge>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            skill.gap === 0 ? 'bg-modern-green' :
                            skill.gap <= 20 ? 'bg-modern-yellow' :
                            skill.gap <= 40 ? 'bg-modern-orange' : 'bg-modern-red'
                          }`}
                          style={{ width: `${100 - skill.gap}%` }}
                        />
                      </div>

                      <div className="text-xs text-gray-500 mt-2">
                        {skill.gap === 0 ? 
                          "✓ No training needed" :
                          `Recommended: ${skill.gap > 40 ? 'Intensive' : skill.gap > 20 ? 'Moderate' : 'Light'} training program`
                        }
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-modern-blue/5 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Priority Training Areas:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedSkills
                      .map(name => skillCategories.flatMap(cat => cat.skills).find(s => s.name === name))
                      .filter(skill => skill && skill.gap > 40)
                      .map(skill => (
                        <li key={skill?.name} className="flex items-center">
                          <AlertCircle className="w-3 h-3 text-modern-red mr-2" />
                          {skill?.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Strengths to Leverage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedSkills
                      .map(name => skillCategories.flatMap(cat => cat.skills).find(s => s.name === name))
                      .filter(skill => skill && skill.gap <= 20)
                      .map(skill => (
                        <li key={skill?.name} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-modern-green mr-2" />
                          {skill?.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillGapDemo;