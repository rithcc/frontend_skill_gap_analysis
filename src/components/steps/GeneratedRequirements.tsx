import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  FileText,
  Wrench,
  Shield,
  BookOpen,
  UserCheck,
  Save,
  X,
  Settings,
  Loader2,
} from "lucide-react";

interface RequirementItem {
  name: string;
  level: string;
  priority: string;
}

interface ToolItem {
  name: string;
  priority: "High" | "Medium" | "Low";
  type: "Tool" | "Technology";
}

interface ComplianceItem {
  name: string;
  priority: "High" | "Medium" | "Low";
}

interface RoleData {
  ROLE_NAME?: string;
  TOOLS?: ToolItem[];
  TECHNOLOGIES?: ToolItem[];
  COMPLIANCES?: ComplianceItem[];
  TASKS?: string[];
  SKILLS?: string[];
  id?: string; // Added for API updates
  _id?: string; // Added for API updates
}

interface GeneratedRequirementsProps {
  onNext?: () => void;
  onBack?: () => void;
  selectedRoleId?: string;
  selectedRoleName?: string;
}

interface AIRoleRequirement {
  description: string;
  category?: string;
  priority?: string;
  details?: string;
}

interface AIEligibility {
  description: string;
  priority?: string;
}

interface AIToolTechnology {
  name: string;
  category: string;
  priority?: string;
  details?: string;
}

interface AICompliance {
  name: string;
  priority?: string;
}

interface AIRequirementsResponse {
  responsibilities?: AIRoleRequirement[];
  eligibility?: AIEligibility[];
  tools_and_technologies?: AIToolTechnology[];
  compliance?: AICompliance[];
}

const getInitialRequirementsSource = ():
  | "uploaded_document"
  | "defined"
  | null => {
  const value = localStorage.getItem("requirementsSource");
  if (value === "uploaded_document" || value === "defined") return value;
  return null;
};

const GeneratedRequirements = ({
  onNext,
  onBack,
  selectedRoleId,
  selectedRoleName,
}: GeneratedRequirementsProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [eligibility, setEligibility] = useState<string[]>([]);
  const [responsibilityText, setResponsibilityText] = useState("");
  const [eligibilityText, setEligibilityText] = useState("");
  const [newToolItem, setNewToolItem] = useState({
    name: "",
    priority: "High",
    type: "Tool",
  });
  const [newComplianceItem, setNewComplianceItem] = useState({
    name: "",
    priority: "High",
    type: "Compliance",
  });
  const [requirementsSource, setRequirementsSource] = useState<
    "uploaded_document" | "defined" | null
  >(getInitialRequirementsSource());
  const [uploadedDocumentId, setUploadedDocumentId] = useState(
    localStorage.getItem("uploadedDocumentId")
  );
  const [editingTool, setEditingTool] = useState<{
    index: number;
    type: "Tool" | "Technology";
  } | null>(null);
  const [editingCompliance, setEditingCompliance] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiError, setAIError] = useState<string | null>(null);

  // Store all requirements data in localStorage whenever roleData changes
  useEffect(() => {
    if (roleData) {
      localStorage.setItem('requirementsData', JSON.stringify(roleData));
    }
  }, [roleData]);

  // Add a Save All button and a function to POST all requirements
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  useEffect(() => {
    setIsGenerating(true);
    setLoading(true);
    setError(null);
    setAIError(null);
    if (requirementsSource === "uploaded_document") {
      // Load requirements from localStorage (uploaded document)
      const stored = localStorage.getItem("selectedRole");
      if (stored) {
        try {
          let parsed = JSON.parse(stored);
          // If the object has a 'requirements' property, use that as the requirements object
          if (parsed.requirements) {
            parsed = parsed.requirements;
          }
          // Normalize and set tools, technologies, compliances for both camelCase and UPPERCASE keys
          const tools = parsed.tools || parsed.TOOLS || [];
          const technologies = parsed.technologies || parsed.TECHNOLOGIES || [];
          const compliances = parsed.compliances || parsed.COMPLIANCES || [];
          setRoleData({
            ...parsed,
            TOOLS: tools,
            TECHNOLOGIES: technologies,
            COMPLIANCES: compliances,
            TASKS: parsed.tasks || parsed.TASKS || [],
            SKILLS: parsed.eligibility || parsed.skills || parsed.SKILLS || [],
          });
          setResponsibilities(parsed.tasks || parsed.TASKS || []);
          setEligibility(
            parsed.eligibility || parsed.skills || parsed.SKILLS || []
          );
          setResponsibilityText(
            (parsed.tasks || parsed.TASKS || []).join("\n")
          );
          setEligibilityText(
            (parsed.eligibility || parsed.skills || parsed.SKILLS || []).join(
              "\n"
            )
          );
        } catch (e) {
          setError("Failed to load requirements from uploaded document.");
        }
      }
      setIsGenerating(false);
      setLoading(false);
    } else {
      // Call backend GET /roles/requirements API
      const fetchRequirements = async () => {
        try {
          // Always get roleId, type, and levelOfSeniority from localStorage
          let roleId = localStorage.getItem("selectedRoleId") || "";
          // Remove seniority suffix if present (e.g., STDROLE00001_Mid -> STDROLE00001)
          roleId = roleId.replace(/(_[A-Za-z]+)$/, "");
          const roleType = localStorage.getItem("selectedRoleType") || "";
          const levelOfSeniority = localStorage.getItem("selectedSeniority") || "Mid";
          const url = `http://localhost:3000/api/v1/roles/requirements?roleId=${encodeURIComponent(roleId)}&roleType=${encodeURIComponent(roleType)}&levelOfSeniority=${encodeURIComponent(levelOfSeniority)}`;
          const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) throw new Error("Failed to fetch requirements");
          const data = await response.json();
          // Normalize and set tools, technologies, compliances for both camelCase and UPPERCASE keys
          const tools = data.tools || data.TOOLS || [];
          const technologies = data.technologies || data.TECHNOLOGIES || [];
          const compliances = data.compliances || data.COMPLIANCES || [];
          setRoleData({
            ...data,
            TOOLS: tools,
            TECHNOLOGIES: technologies,
            COMPLIANCES: compliances,
            TASKS: data.tasks || data.TASKS || [],
            SKILLS: data.eligibility || data.skills || data.SKILLS || [],
          });
          setResponsibilities(data.tasks || data.TASKS || []);
          setEligibility(data.eligibility || data.skills || data.SKILLS || []);
          setResponsibilityText((data.tasks || data.TASKS || []).join("\n"));
          setEligibilityText((data.eligibility || data.skills || data.SKILLS || []).join("\n"));
          setIsGenerating(false);
          setLoading(false);
        } catch (err) {
          let message = "Requirements fetch failed";
          if (err instanceof Error) message = err.message;
          setAIError(message);
          setIsGenerating(false);
          setLoading(false);
        }
      };
      fetchRequirements();
    }
  }, [requirementsSource]);

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800";
      case "Advanced":
        return "bg-blue-100 text-blue-800";
      case "Proficient":
        return "bg-green-100 text-green-800";
      case "Basic":
        return "bg-gray-100 text-gray-800";
      case "Understanding":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Remove saveResponsibilities and saveEligibility functions
  // Remove Save buttons for responsibilities and eligibility in the render

  // Add Tool/Technology locally
  const addNewTool = () => {
    if (newToolItem.name.trim() === "" || !roleData) return;
    const newTool: ToolItem = {
      name: newToolItem.name,
      priority: newToolItem.priority as "High" | "Medium" | "Low",
      type: newToolItem.type as "Tool" | "Technology",
    };
    const updatedRole = {
      ...roleData,
      [newToolItem.type === "Tool" ? "TOOLS" : "TECHNOLOGIES"]: [
        ...(newToolItem.type === "Tool"
          ? roleData.TOOLS || []
          : roleData.TECHNOLOGIES || []),
        newTool,
      ],
    };
    setRoleData(updatedRole);
    setNewToolItem({ name: "", priority: "High", type: "Tool" });
  };

  // Remove Tool/Technology locally
  const removeTool = (index: number, type: "Tool" | "Technology") => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      [type === "Tool" ? "TOOLS" : "TECHNOLOGIES"]:
        (type === "Tool" ? roleData.TOOLS : roleData.TECHNOLOGIES)?.filter(
          (_, i) => i !== index
        ) || [],
    };
    setRoleData(updatedRole);
  };

  // Update Tool/Technology locally
  const updateTool = (
    index: number,
    type: "Tool" | "Technology",
    updatedTool: ToolItem
  ) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      [type === "Tool" ? "TOOLS" : "TECHNOLOGIES"]:
        (type === "Tool" ? roleData.TOOLS : roleData.TECHNOLOGIES)?.map(
          (item, i) => (i === index ? updatedTool : item)
        ) || [],
    };
    setRoleData(updatedRole);
    setEditingTool(null);
  };

  // Add Compliance locally
  const addNewCompliance = () => {
    if (newComplianceItem.name.trim() === "" || !roleData) return;
    const newCompliance: ComplianceItem = {
      name: newComplianceItem.name,
      priority: newComplianceItem.priority as "High" | "Medium" | "Low",
    };
    const updatedRole = {
      ...roleData,
      COMPLIANCES: [...(roleData.COMPLIANCES || []), newCompliance],
    };
    setRoleData(updatedRole);
    setNewComplianceItem({ name: "", priority: "High", type: "Compliance" });
  };

  // Remove Compliance locally
  const removeCompliance = (index: number) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      COMPLIANCES: roleData.COMPLIANCES?.filter((_, i) => i !== index) || [],
    };
    setRoleData(updatedRole);
  };

  // Update Compliance locally
  const updateCompliance = (
    index: number,
    updatedCompliance: ComplianceItem
  ) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      COMPLIANCES:
        roleData.COMPLIANCES?.map((item, i) =>
          i === index ? updatedCompliance : item
        ) || [],
    };
    setRoleData(updatedRole);
    setEditingCompliance(null);
  };

  // Save all requirements to backend
  const saveAllRequirements = async () => {
    if (!roleData) return;
    setSaveStatus("saving");
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/generated-requirements",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roleName: roleData.ROLE_NAME || "",
            source:
              requirementsSource === "uploaded_document"
                ? "DOCUMENT"
                : "MANUAL",
            responsibilities: responsibilities.map((item) => ({
              description: String(item),
            })),
            eligibility: eligibility.map((item) => ({
              description: String(item),
            })),
            toolsAndTechnologies: [
              ...(roleData.TOOLS || []).map((tool) => ({
                name: tool.name,
                category: "Tool",
                priority: tool.priority.toUpperCase(),
              })),
              ...(roleData.TECHNOLOGIES || []).map((tech) => ({
                name: tech.name,
                category: "Technology",
                priority: tech.priority.toUpperCase(),
              })),
            ],
            compliance: (roleData.COMPLIANCES || []).map((comp) => ({
              requirement: String(comp.name ?? ""),
              name: String(comp.name ?? ""),
              type: "Compliance",
              priority: comp.priority.toUpperCase(),
            })),
          }),
        }
      );
      if (response.ok) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
    }
  };

  // Removed manual AI generation function

  if (isGenerating || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12 font-sans">
            <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Generating Comprehensive Requirements
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-normal mb-8">
              Our AI is analyzing your role to create a complete requirements
              framework including tools, responsibilities, eligibility, and
              compliance.
            </p>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Analyzing role requirements...
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">
                      Generating tools and technologies...
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">
                      Creating responsibilities framework...
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-400">
                      Finalizing compliance requirements...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
      {/* Error from LLM generation */}
      {aiError && (
        <div className="mb-4 text-red-600 text-center font-medium">
          {aiError}
        </div>
      )}
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Role Requirements
            <span className="ml-2 text-gray-700 font-normal text-lg">
              for{" "}
              {roleData?.ROLE_NAME ||
                localStorage.getItem("selectedRoleName") ||
                "Selected Role"}
            </span>
          </h2>
          <p className="text-base text-gray-500 max-w-2xl text-center mb-1">
            Review and edit the requirements for your selected role. Update
            responsibilities, eligibility, tools, technologies, and compliance
            before continuing.
          </p>
          {requirementsSource && (
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mt-2 shadow-sm border ${
                requirementsSource === "uploaded_document"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {requirementsSource === "uploaded_document" ? (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Requirements loaded from uploaded document
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  AI Defined Requirements
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* Left Column - Responsibilities & Eligibility */}
        <div className="space-y-8">
          {/* Responsibilities */}
          <Card className="p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 border-0 shadow-xl rounded-2xl text-base">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Responsibilities
            </h3>
            <Textarea
              value={responsibilityText}
              onChange={(e) => {
                setResponsibilityText(e.target.value);
                setResponsibilities(
                  e.target.value
                    .split("\n")
                    .filter((item) => item.trim() !== "")
                );
              }}
              placeholder="Enter responsibilities (one per line)..."
              rows={10}
              className="mb-4 text-sm leading-relaxed bg-white/80 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />
          </Card>

          {/* Eligibility Criteria */}
          <Card className="p-8 bg-gradient-to-br from-white via-purple-50 to-purple-100 border-0 shadow-xl rounded-2xl text-base">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-9 h-9 bg-purple-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              Eligibility Criteria
            </h3>
            <Textarea
              value={eligibilityText}
              onChange={(e) => {
                setEligibilityText(e.target.value);
                setEligibility(
                  e.target.value
                    .split("\n")
                    .filter((item) => item.trim() !== "")
                );
              }}
              placeholder="Enter eligibility criteria (one per line)..."
              rows={10}
              className="mb-4 text-sm leading-relaxed bg-white/80 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm"
            />
          </Card>
        </div>

        {/* Right Column - Tools, Technologies & Compliance */}
        <div className="space-y-8">
          {/* Tools */}
          <Card className="p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 border-0 shadow-xl rounded-2xl text-base">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              Tools
            </h3>
            <div className="space-y-3 mb-4">
              {roleData?.TOOLS?.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white/80 rounded-lg text-xs border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {editingTool?.index === index &&
                  editingTool?.type === "Tool" ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => {
                          const updatedTools = [...(roleData?.TOOLS || [])];
                          updatedTools[index] = {
                            ...tool,
                            name: e.target.value,
                          };
                          setRoleData({ ...roleData, TOOLS: updatedTools });
                        }}
                        className="flex-1 px-2 py-1 border border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base"
                      />
                      <select
                        value={tool.priority}
                        onChange={(e) => {
                          const updatedTools = [...(roleData?.TOOLS || [])];
                          updatedTools[index] = {
                            ...tool,
                            priority: e.target.value as
                              | "High"
                              | "Medium"
                              | "Low",
                          };
                          setRoleData({ ...roleData, TOOLS: updatedTools });
                        }}
                        className="px-2 py-1 border border-blue-200 rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateTool(index, "Tool", tool)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow text-base"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 shadow text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 text-xs"
                        onClick={() => setEditingTool({ index, type: "Tool" })}
                        title="Click to edit"
                      >
                        {tool.name.split("–")[0].trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Tool
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            tool.priority
                          )}`}
                        >
                          {tool.priority}
                        </span>
                        <button
                          onClick={() => removeTool(index, "Tool")}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors text-xs"
                          title="Remove tool"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* Add New Tool */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add new tool"
                  value={newToolItem.type === "Tool" ? newToolItem.name : ""}
                  onChange={(e) =>
                    setNewToolItem({
                      ...newToolItem,
                      name: e.target.value,
                      type: "Tool",
                    })
                  }
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-xs"
                />
                <select
                  value={newToolItem.priority}
                  onChange={(e) =>
                    setNewToolItem({
                      ...newToolItem,
                      priority: e.target.value,
                      type: "Tool",
                    })
                  }
                  className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button
                  onClick={addNewTool}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white shadow text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* Technologies */}
          <Card className="p-8 bg-gradient-to-br from-white via-green-50 to-blue-100 border-0 shadow-xl rounded-2xl text-base">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              Technologies
            </h3>
            <div className="space-y-3 mb-4">
              {roleData?.TECHNOLOGIES?.map((tech, index) => (
                <div
                  key={`tech-${index}`}
                  className="flex items-center justify-between p-2 bg-white/80 rounded-lg text-xs border border-green-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {editingTool?.index === index &&
                  editingTool?.type === "Technology" ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={tech.name}
                        onChange={(e) => {
                          const updatedTechs = [
                            ...(roleData?.TECHNOLOGIES || []),
                          ];
                          updatedTechs[index] = {
                            ...tech,
                            name: e.target.value,
                          };
                          setRoleData({
                            ...roleData,
                            TECHNOLOGIES: updatedTechs,
                          });
                        }}
                        className="flex-1 px-2 py-1 border border-green-200 rounded focus:ring-2 focus:ring-green-400 focus:border-green-400 text-base"
                      />
                      <select
                        value={tech.priority}
                        onChange={(e) => {
                          const updatedTechs = [
                            ...(roleData?.TECHNOLOGIES || []),
                          ];
                          updatedTechs[index] = {
                            ...tech,
                            priority: e.target.value as
                              | "High"
                              | "Medium"
                              | "Low",
                          };
                          setRoleData({
                            ...roleData,
                            TECHNOLOGIES: updatedTechs,
                          });
                        }}
                        className="px-2 py-1 border border-green-200 rounded focus:ring-2 focus:ring-green-400 focus:border-green-400 text-base"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateTool(index, "Technology", tech)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow text-base"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 shadow text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className="font-medium text-gray-900 cursor-pointer hover:text-green-600 text-xs"
                        onClick={() =>
                          setEditingTool({ index, type: "Technology" })
                        }
                        title="Click to edit"
                      >
                        {tech.name.split("–")[0].trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Technology
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            tech.priority
                          )}`}
                        >
                          {tech.priority}
                        </span>
                        <button
                          onClick={() => removeTool(index, "Technology")}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors text-xs"
                          title="Remove technology"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* Add New Technology */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add new technology"
                  value={
                    newToolItem.type === "Technology" ? newToolItem.name : ""
                  }
                  onChange={(e) =>
                    setNewToolItem({
                      ...newToolItem,
                      name: e.target.value,
                      type: "Technology",
                    })
                  }
                  className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white/80 text-xs"
                />
                <select
                  value={newToolItem.priority}
                  onChange={(e) =>
                    setNewToolItem({
                      ...newToolItem,
                      priority: e.target.value,
                      type: "Technology",
                    })
                  }
                  className="px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white/80 text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button
                  onClick={addNewTool}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white shadow text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* Compliance Requirements */}
          <Card className="p-8 bg-gradient-to-br from-white via-red-50 to-orange-100 border-0 shadow-xl rounded-2xl text-base">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Compliance Requirements
            </h3>
            <div className="space-y-3 mb-4">
              {roleData?.COMPLIANCES?.map((comp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white/80 rounded-lg text-xs border border-orange-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {editingCompliance === index ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) => {
                          const updatedCompliances = [
                            ...(roleData?.COMPLIANCES || []),
                          ];
                          updatedCompliances[index] = {
                            ...comp,
                            name: e.target.value,
                          };
                          setRoleData({
                            ...roleData,
                            COMPLIANCES: updatedCompliances,
                          });
                        }}
                        className="flex-1 px-2 py-1 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <select
                        value={comp.priority}
                        onChange={(e) => {
                          const updatedCompliances = [
                            ...(roleData?.COMPLIANCES || []),
                          ];
                          updatedCompliances[index] = {
                            ...comp,
                            priority: e.target.value as
                              | "High"
                              | "Medium"
                              | "Low",
                          };
                          setRoleData({
                            ...roleData,
                            COMPLIANCES: updatedCompliances,
                          });
                        }}
                        className="px-2 py-1 border border-orange-200 rounded focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateCompliance(index, comp)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 shadow"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCompliance(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 shadow"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className="font-medium text-gray-900 cursor-pointer hover:text-orange-600"
                        onClick={() => setEditingCompliance(index)}
                        title="Click to edit"
                      >
                        {comp.name.split("–")[0].trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Compliance
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            comp.priority
                          )}`}
                        >
                          {comp.priority}
                        </span>
                        <button
                          onClick={() => removeCompliance(index)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove compliance"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
             {/* Add New Compliance */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add new compliance"
                  value={newComplianceItem.type === "Compliance" ? newComplianceItem.name : ""}
                  onChange={(e) =>
                    setNewComplianceItem({
                      ...newComplianceItem,
                      name: e.target.value,
                      type: "Tool",
                    })
                  }
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-xs"
                />
                <select
                  value={newToolItem.priority}
                  onChange={(e) =>
                    setNewToolItem({
                      ...newToolItem,
                      priority: e.target.value,
                      type: "Tool",
                    })
                  }
                  className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button
                  onClick={addNewTool}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white shadow text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        </div>

      {/* Add larger gap below Compliance Requirements card for separation */}
      <div className="w-full h-16" />

      {/* Action Button slightly up from the bottom, at the corner */}
      <div className="w-full flex justify-end items-end mt-10 mb-2 pr-8">
        <Button
          onClick={onNext}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center"
        >
          Continue to Requirements Builder
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </div>
    </div>
    </div>
  );
}

export default GeneratedRequirements;
