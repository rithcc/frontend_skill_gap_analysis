import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
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
  const [showRequirements, setShowRequirements] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const activeRoleRef = React.useRef<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(selectedRole);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchRoles = async () => {
        if (initialLoad) setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/roles?search=${encodeURIComponent(searchTerm)}`
          );
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setRoles(data);
        } catch (err) {
          setError('Failed to load roles. Please try again.');
        } finally {
          setLoading(false);
          setInitialLoad(false);
        }
      };
      fetchRoles();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, initialLoad]);

  
  // Filter roles based on search term
  const filteredRoles =
    searchTerm.trim() === ''
      ? roles
      : roles.filter(role =>
          (role?.title?.toLowerCase() ?? '').startsWith(searchTerm.toLowerCase())
        );

  // Loading state (only for initial load)
  if (initialLoad && loading) {
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
    <section className="w-full flex flex-col items-center bg-white font-sans pt-7 overflow-hidden min-h-[calc(100vh-80px)]">
      <div className="text-center w-full mb-0">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Select Target Role
          </span>
        </h2>
        <p className="text-sm text-gray-600 max-w-1xl mx-auto leading-normal">
          Choose the role you want to analyze for skill gaps
        </p>
      </div>
      {/* Add gap between description and search */}
      <div className="h-4" />
      {/* Search Input - always enabled, no roles available count */}
      <div className="mb-6 w-full flex justify-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search roles or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl shadow-sm transition-all duration-300 pr-10"
          />
          {/* Show a small spinner in the input when searching, but not on initial load */}
          {loading && !initialLoad && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin w-5 h-5" />
          )}
        </div>
      </div>

      {/* No roles found */}
      {filteredRoles.length === 0 && !loading && (
        <div className="text-center py-8 w-full">
          <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto shadow transition-all duration-300">
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
                className="transition-all duration-300"
              >
                Clear search
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Role Cards - Scrollable if more than 4 roles */}
      <div
        className={`space-y-4 w-full max-w-5xl mx-auto mb-6 ${filteredRoles.length > 4 ? 'overflow-y-auto' : ''}`}
        style={filteredRoles.length > 4 ? { maxHeight: '32rem', paddingRight: '4px' } : {}}
      >
        {filteredRoles.map((role) => (
          <Card
            key={role.id}
            className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${
              selectedCard === role.title
                ? 'border-l-blue-500 bg-blue-50 shadow-lg'
                : 'border-l-gray-200 hover:border-l-blue-300 bg-white'
            }`}
            onClick={() => {
              setSelectedCard(role.title);
              setActiveRole(role);
              activeRoleRef.current = role;
              setShowRequirements(true);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${selectedCard === role.title ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <h3 className="text-base font-semibold text-gray-900">{role.title}</h3>
                  </div>
                  <div className="flex items-center ml-4 space-x-2">
                    {role.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
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
              {selectedCard === role.title && (
                <div className="ml-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    {/* You can add a checkmark or icon here to indicate selection */}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Requirements Section - Show as modal popup when a role is clicked */}
      <Dialog
        open={showRequirements}
        onOpenChange={(open) => {
          // Only reset hasRequirements if opening, not closing
          if (open) {
            setShowRequirements(true);
            setHasRequirements(null);
          } else {
            setShowRequirements(false);
          }
        }}
      >
        {showRequirements && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mx-auto relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setShowRequirements(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Cog className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Role Requirements
                </h3>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm">
                  Do you have existing requirements for this role, or would you like our AI to generate comprehensive requirements based on industry standards and future trends?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button
                    variant={hasRequirements === true ? "default" : "outline"}
                    onClick={() => {
                      setHasRequirements(true);
                      const role = activeRoleRef.current;
                      if (role) {
                        onSelectRole(role.id, role.title);
                      }
                      onRequirementChoice?.('have');
                      setShowRequirements(false);
                    }}
                    className="transition-all duration-300"
                  >
                    I have requirements
                  </Button>
                  <Button
                    variant={hasRequirements === false ? "default" : "outline"}
                    onClick={() => {
                      setHasRequirements(false);
                      const role = activeRoleRef.current;
                      if (role) {
                        onSelectRole(role.id, role.title);
                      }
                      onRequirementChoice?.('define');
                      setShowRequirements(false);
                    }}
                    className="transition-all duration-300"
                  >
                    Define requirements
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
};

export default RoleTargeting;
