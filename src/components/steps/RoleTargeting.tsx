import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Cog // ✅ Import this icon
} from "lucide-react";

interface RoleTargetingProps {
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
  onRequirementChoice?: (choice: 'have' | 'define') => void;
}

const RoleTargeting = ({ selectedRole, onSelectRole, onRequirementChoice }: RoleTargetingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasRequirements, setHasRequirements] = useState<boolean | null>(null); // ✅ Define this state

  const roles = [
    {
      id: "adas-ml-engineer",
      title: "ADAS AI/ML Engineer",
      category: "Engineering",
      description: "The ADAS AI/ML Engineer develops and implements deep learning solutions for advanced driver-assistance systems...",
      technologies: ["Linux", "Deep Learning", "Reinforcement Learning", "Python", "PyTorch"],
      level: "Senior (5+ years)",
      location: "Remote/Hybrid",
      experience: "+7 years",
      tags: ["ADAS", "Junior"]
    },
    {
      id: "senior-frontend-developer",
      title: "Senior Frontend Developer",
      category: "Engineering",
      description: "Lead frontend development using modern frameworks like React...",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      level: "Senior (5+ years)",
      location: "Remote/On-site",
      experience: "+5 years",
      tags: ["Frontend", "Senior"]
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      category: "Data & Analytics",
      description: "Extract insights from complex datasets using statistical analysis and machine learning...",
      technologies: ["Python", "R", "SQL", "TensorFlow", "Pandas"],
      level: "Mid-level (3-5 years)",
      location: "Remote/Hybrid",
      experience: "+3 years",
      tags: ["ML", "Analytics"]
    },
    {
      id: "product-manager",
      title: "Product Manager",
      category: "Product & Design",
      description: "Drive product strategy and roadmap development...",
      technologies: ["Figma", "Jira", "Analytics", "User Research", "Agile"],
      level: "Mid-level (3-5 years)",
      location: "On-site/Hybrid",
      experience: "+4 years",
      tags: ["Product", "Strategy"]
    }
  ];

  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Select Target Role
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the role you want to analyze for skill gaps
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search roles or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">
          {filteredRoles.length} roles available
        </p>
      </div>

      {/* Role Cards */}
      <div className="space-y-4">
        {filteredRoles.map((role) => (
          <Card
            key={role.id}
            className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${
              selectedRole === role.title
                ? 'border-l-blue-500 bg-blue-50 shadow-lg'
                : 'border-l-gray-200 hover:border-l-blue-300 bg-white'
            }`}
            onClick={() => onSelectRole(role.title)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${selectedRole === role.title ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                  </div>
                  <div className="flex items-center ml-4 space-x-2">
                    {role.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {role.description}
                </p>

                {/* Technologies */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {role.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role Meta Info */}
                <div className="flex items-center text-sm text-gray-500 space-x-6">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {role.level}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {role.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {role.experience}
                  </div>
                </div>
              </div>

              {/* Selected Marker */}
              {selectedRole === role.title && (
                <div className="ml-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Requirements Section */}
      <Card className="p-8 bg-white border border-gray-200 shadow-lg mt-10">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Cog className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Role Requirements
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Do you have existing requirements for this role, or would you like our AI to generate comprehensive requirements based on industry standards and future trends?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              variant={hasRequirements === true ? "default" : "outline"}
              onClick={() => {
                setHasRequirements(true);
                onRequirementChoice?.('have');
              }}
            >
              I have requirements
            </Button>
            <Button
              variant={hasRequirements === false ? "default" : "outline"}
              onClick={() => {
                setHasRequirements(false);
                onRequirementChoice?.('define');
              }}
            >
              Define requirements
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoleTargeting;
