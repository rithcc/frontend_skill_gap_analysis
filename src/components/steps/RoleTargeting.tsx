import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Cog,
  Loader2,
  ArrowLeft
} from "lucide-react";

// Interface for the API response
interface Technology {
  id: string;
  name: string;
}

interface Role {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
  location: string;
  experience: string;
  tags: string[];
  technologies: Technology[];
  createdAt: string;
  updatedAt: string;
}

interface RoleTargetingProps {
  selectedRole: string | null;
  onSelectRole: (roleId: string, roleTitle: string) => void;
  onRequirementChoice?: (choice: 'have' | 'define') => void;
  onBack?: () => void;
}

const RoleTargeting = ({ selectedRole, onSelectRole, onRequirementChoice, onBack }: RoleTargetingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasRequirements, setHasRequirements] = useState<boolean | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/v1/roles?search=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        setError('Failed to load roles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [searchTerm]);

  // Filter roles based on search term
  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    role.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading roles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
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

      {/* No roles found */}
      {filteredRoles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `No roles found matching "${searchTerm}"`
                : "No roles available"
              }
            </p>
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm("")}
                variant="outline"
              >
                Clear search
              </Button>
            )}
          </div>
        </div>
      )}

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
            onClick={() => onSelectRole(role.id, role.title)}
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

      {/* Requirements Section - Only show if roles are available */}
      {roles.length > 0 && (
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
      )}
    </div>
  );
};

export default RoleTargeting;
