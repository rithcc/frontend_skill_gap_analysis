
import { Card } from "@/components/ui/card";
import { Globe, Building2, Users, Target } from "lucide-react";

interface BenchmarkingScenarioProps {
  selectedScenario: string | null;
  onSelectScenario: (scenario: string) => void;
}

const BenchmarkingScenario = ({ selectedScenario, onSelectScenario }: BenchmarkingScenarioProps) => {
  const scenarios = [
    {
      id: "ecosystem",
      icon: Globe,
      title: "Global Ecosystem",
      subtitle: "Industry Trends & Future Direction",
      description: "Benchmark against emerging technologies and global market leaders. Stay ahead of industry disruption with forward-looking insights.",
      features: ["Emerging Technologies", "Global Standards", "Future Skills Map", "Innovation Trends"],
      color: "bg-modern-green",
      disabled: true
    },
    {
      id: "competitors",
      icon: Building2, 
      title: "Competitive Intelligence",
      subtitle: "Market Leaders & Direct Competitors",
      description: "Analyze competitor capabilities and market positioning. Understand what top performers prioritize and demand in your space.",
      features: ["Competitor Analysis", "Market Intelligence", "Skill Benchmarks", "Talent Strategies"],
      color: "bg-modern-blue",
      disabled: false
    },
    {
      id: "company",
      icon: Users,
      title: "Internal Excellence", 
      subtitle: "Organizational Standards & Best Practices",
      description: "Benchmark against your organization's top performers. Maintain consistency while identifying internal growth opportunities.",
      features: ["Internal Standards", "Best Practices", "Career Frameworks", "Cultural Alignment"],
      color: "bg-modern-purple",
      disabled: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Define Your <span className="modern-blue">Benchmark</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Choose your benchmarking approach to establish skill requirements. Each method provides unique 
          insights and perspectives for building comprehensive, future-ready competency frameworks.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`group relative overflow-hidden transition-all duration-300 ${
              scenario.disabled 
                ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                : `cursor-pointer hover:shadow-xl hover:-translate-y-2 ${
                    selectedScenario === scenario.id
                      ? 'ring-2 ring-modern-blue shadow-xl'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`
            }`}
            onClick={() => !scenario.disabled && onSelectScenario(scenario.id)}
          >
            {scenario.disabled && (
              <div className="absolute inset-0 bg-gray-200 opacity-30 z-10"></div>
            )}
            {scenario.disabled && (
              <div className="absolute top-4 right-4 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
                Coming Soon
              </div>
            )}
            <div className="p-8">
              <div className={`w-16 h-16 ${scenario.disabled ? 'bg-gray-400' : scenario.color} rounded-2xl flex items-center justify-center mb-6 ${!scenario.disabled ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                <scenario.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {scenario.title}
              </h3>
              
              <p className="text-sm font-semibold modern-blue mb-4">
                {scenario.subtitle}
              </p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {scenario.description}
              </p>

              <div className="space-y-3">
                <div className={`text-sm font-semibold mb-3 ${scenario.disabled ? 'text-gray-400' : 'modern-blue'}`}>
                  Intelligence Sources:
                </div>
                {scenario.features.map((feature, index) => (
                  <div key={index} className={`flex items-center text-sm ${scenario.disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 ${scenario.disabled ? 'bg-gray-400' : scenario.color} rounded-full mr-3`}></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedScenario === scenario.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-modern-blue rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkingScenario;