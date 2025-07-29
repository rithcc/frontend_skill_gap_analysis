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
  Loader2
} from "lucide-react";

interface RequirementItem {
  name: string;
  level: string;
  priority: string;
}

interface ToolItem {
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Tool' | 'Technology';
}

interface ComplianceItem {
  name: string;
  priority: 'High' | 'Medium' | 'Low';
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

const getInitialRequirementsSource = (): 'uploaded_document' | 'defined' | null => {
  const value = localStorage.getItem('requirementsSource');
  if (value === 'uploaded_document' || value === 'defined') return value;
  return null;
};

const GeneratedRequirements = ({ onNext, onBack, selectedRoleId, selectedRoleName }: GeneratedRequirementsProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [eligibility, setEligibility] = useState<string[]>([]);
  const [responsibilityText, setResponsibilityText] = useState('');
  const [eligibilityText, setEligibilityText] = useState('');
  const [newToolItem, setNewToolItem] = useState({ name: '', priority: 'High', type: 'Tool' });
  const [newComplianceItem, setNewComplianceItem] = useState({ name: '', priority: 'High' });
  const [requirementsSource, setRequirementsSource] = useState<'uploaded_document' | 'defined' | null>(getInitialRequirementsSource());
  const [uploadedDocumentId, setUploadedDocumentId] = useState(localStorage.getItem('uploadedDocumentId'));
  const [editingTool, setEditingTool] = useState<{index: number, type: 'Tool' | 'Technology'} | null>(null);
  const [editingCompliance, setEditingCompliance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiError, setAIError] = useState<string | null>(null);

  // Add a Save All button and a function to POST all requirements
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>("idle");

  useEffect(() => {
    // On mount, call the AI requirements API and fill fields
    setIsGenerating(true);
    setLoading(true);
    setError(null);
    setAIError(null);
    const fetchRequirements = async () => {
      try {
        const payload = {
          role_name: localStorage.getItem('selectedRoleName') || '',
          industry: 'Automotive',
          experience_level: 'Mid-level',
          department: '',
          additional_context: ''
        };
        const response = await fetch('http://localhost:8001/generate-requirements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to generate requirements with AI');
        const aiData = await response.json();
        setRoleData((prev) => ({
          ...prev,
          TASKS: aiData.responsibilities?.map((r) => r.description) || [],
          SKILLS: aiData.eligibility?.map((e) => e.description) || [],
          TOOLS: aiData.tools_and_technologies
            ?.filter((t) => t.category === 'Tool')
            .map((t) => ({
              name: t.name,
              priority: t.priority === 'Critical' ? 'High' : (t.priority || 'High'),
              type: 'Tool',
            })) || [],
          TECHNOLOGIES: aiData.tools_and_technologies
            ?.filter((t) => t.category !== 'Tool')
            .map((t) => ({
              name: t.name,
              priority: t.priority === 'Critical' ? 'High' : (t.priority || 'High'),
              type: 'Technology',
            })) || [],
          COMPLIANCES: aiData.compliance?.map((c) => ({
            name: c.name,
            priority: c.priority === 'Critical' ? 'High' : (c.priority || 'High'),
          })) || [],
        }));
        setResponsibilities(aiData.responsibilities?.map((r) => r.description) || []);
        setEligibility(aiData.eligibility?.map((e) => e.description) || []);
        setResponsibilityText((aiData.responsibilities?.map((r) => r.description) || []).join('\n'));
        setEligibilityText((aiData.eligibility?.map((e) => e.description) || []).join('\n'));
        setIsGenerating(false);
        setLoading(false);
      } catch (err) {
        let message = 'AI generation failed';
        if (err instanceof Error) message = err.message;
        setAIError(message);
        setIsGenerating(false);
        setLoading(false);
      }
    };
    fetchRequirements();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Proficient': return 'bg-green-100 text-green-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Understanding': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Remove saveResponsibilities and saveEligibility functions
  // Remove Save buttons for responsibilities and eligibility in the render

  // Add Tool/Technology locally
  const addNewTool = () => {
    if (newToolItem.name.trim() === '' || !roleData) return;
    const newTool: ToolItem = {
      name: newToolItem.name,
      priority: newToolItem.priority as 'High' | 'Medium' | 'Low',
      type: newToolItem.type as 'Tool' | 'Technology'
    };
    const updatedRole = {
      ...roleData,
      [newToolItem.type === 'Tool' ? 'TOOLS' : 'TECHNOLOGIES']: [
        ...(newToolItem.type === 'Tool' ? (roleData.TOOLS || []) : (roleData.TECHNOLOGIES || [])),
        newTool
      ]
    };
    setRoleData(updatedRole);
    setNewToolItem({ name: '', priority: 'High', type: 'Tool' });
  };

  // Remove Tool/Technology locally
  const removeTool = (index: number, type: 'Tool' | 'Technology') => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      [type === 'Tool' ? 'TOOLS' : 'TECHNOLOGIES']: (type === 'Tool' ? roleData.TOOLS : roleData.TECHNOLOGIES)?.filter((_, i) => i !== index) || []
    };
    setRoleData(updatedRole);
  };

  // Update Tool/Technology locally
  const updateTool = (index: number, type: 'Tool' | 'Technology', updatedTool: ToolItem) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      [type === 'Tool' ? 'TOOLS' : 'TECHNOLOGIES']: (type === 'Tool' ? roleData.TOOLS : roleData.TECHNOLOGIES)?.map((item, i) => i === index ? updatedTool : item) || []
    };
    setRoleData(updatedRole);
    setEditingTool(null);
  };

  // Add Compliance locally
  const addNewCompliance = () => {
    if (newComplianceItem.name.trim() === '' || !roleData) return;
    const newCompliance: ComplianceItem = {
      name: newComplianceItem.name,
      priority: newComplianceItem.priority as 'High' | 'Medium' | 'Low'
    };
    const updatedRole = {
      ...roleData,
      COMPLIANCES: [...(roleData.COMPLIANCES || []), newCompliance]
    };
    setRoleData(updatedRole);
    setNewComplianceItem({ name: '', priority: 'High' });
  };

  // Remove Compliance locally
  const removeCompliance = (index: number) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      COMPLIANCES: roleData.COMPLIANCES?.filter((_, i) => i !== index) || []
    };
    setRoleData(updatedRole);
  };

  // Update Compliance locally
  const updateCompliance = (index: number, updatedCompliance: ComplianceItem) => {
    if (!roleData) return;
    const updatedRole = {
      ...roleData,
      COMPLIANCES: roleData.COMPLIANCES?.map((item, i) => i === index ? updatedCompliance : item) || []
    };
    setRoleData(updatedRole);
    setEditingCompliance(null);
  };

  // Save all requirements to backend
  const saveAllRequirements = async () => {
    if (!roleData) return;
    setSaveStatus('saving');
    try {
      const response = await fetch('http://localhost:3000/api/v1/generated-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleName: roleData.ROLE_NAME || '',
          source: requirementsSource === 'uploaded_document' ? 'DOCUMENT' : 'MANUAL',
          responsibilities: responsibilities.map(item => ({
            description: String(item),
          })),
          eligibility: eligibility.map(item => ({
            description: String(item)
          })),
          toolsAndTechnologies: [
            ...(roleData.TOOLS || []).map(tool => ({
              name: tool.name,
              category: 'Tool',
              priority: tool.priority.toUpperCase()
            })),
            ...(roleData.TECHNOLOGIES || []).map(tech => ({
              name: tech.name,
              category: 'Technology',
              priority: tech.priority.toUpperCase()
            }))
          ],
          compliance: (roleData.COMPLIANCES || []).map(comp => ({
            requirement: String(comp.name ?? ''),
            name: String(comp.name ?? ''),
            type: 'Compliance',
            priority: comp.priority.toUpperCase()
          }))
        })
      });
      if (response.ok) {
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
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
              Our AI is analyzing your role to create a complete requirements framework including tools, responsibilities, eligibility, and compliance.
            </p>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Analyzing role requirements...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Generating tools and technologies...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Creating responsibilities framework...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-400">Finalizing compliance requirements...</span>
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
    <div className="max-w-7xl mx-auto">
      {/* Error from LLM generation */}
      {aiError && (
        <div className="mb-4 text-red-600 text-center font-medium">{aiError}</div>
      )}
      {/* Header */}
      <div className="flex items-center justify-center mb-8"></div>
      {/* Move heading to the very top, remove subtitle, and keep requirements source indicator */}
      <div className="text-center font-sans mt-4 mb-10">
        <h2 className="text-2xl font-bold mb-2 text-black">
          Role Requirements for {roleData?.ROLE_NAME || localStorage.getItem('selectedRoleName') || 'Selected Role'}
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-normal mb-2">
          Review and edit the AI-generated requirements for your selected role. You can update responsibilities, eligibility, tools, technologies, and compliance requirements as needed before continuing.
        </p>
        {/* Requirements Source Indicator */}
        {requirementsSource && (
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mt-2 ${
            requirementsSource === 'uploaded_document' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {requirementsSource === 'uploaded_document' ? (
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

      <div className="grid lg:grid-cols-2 gap-8 mb-8 mt-16">
        {/* Left Column - Responsibilities & Eligibility (Bigger Boxes) */}
        <div className="space-y-8 mt-0">
          {/* Responsibilities */}
          <Card className="p-6 bg-white border border-gray-200 text-base">
            <h3 className="text-base font-bold text-black mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Responsibilities
            </h3>
            
            <Textarea
              value={responsibilityText}
              onChange={e => {
                setResponsibilityText(e.target.value);
                setResponsibilities(e.target.value.split('\n').filter(item => item.trim() !== ''));
              }}
              placeholder="Enter responsibilities (one per line)..."
              rows={12}
              className="mb-6 text-sm leading-relaxed"
            />
            
            {/* Removed Save Responsibilities button */}
          </Card>

          {/* Eligibility Criteria */}
          <Card className="p-6 bg-white border border-gray-200 text-base">
            <h3 className="text-base font-bold text-black mb-4 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              Eligibility Criteria
            </h3>
            
            <Textarea
              value={eligibilityText}
              onChange={e => {
                setEligibilityText(e.target.value);
                setEligibility(e.target.value.split('\n').filter(item => item.trim() !== ''));
              }}
              placeholder="Enter eligibility criteria (one per line)..."
              rows={12}
              className="mb-6 text-sm leading-relaxed"
            />
            
            {/* Removed Save Eligibility button */}
          </Card>
        </div>

        {/* Right Column - Tools, Technologies & Compliance */}
        <div className="space-y-8 mt-0">
          {/* Tools & Technologies */}
          <Card className="p-6 bg-white border border-gray-200 text-base">
            <h3 className="text-base font-bold text-black mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              Tools & Technologies
            </h3>
            
            <div className="space-y-3 mb-4">
              {roleData?.TOOLS?.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs">
                  {editingTool?.index === index && editingTool?.type === 'Tool' ? (
                    // Edit mode for tools
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => {
                          const updatedTools = [...(roleData?.TOOLS || [])];
                          updatedTools[index] = { ...tool, name: e.target.value };
                          setRoleData({ ...roleData, TOOLS: updatedTools });
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select
                        value={tool.priority}
                        onChange={(e) => {
                          const updatedTools = [...(roleData?.TOOLS || [])];
                          updatedTools[index] = { ...tool, priority: e.target.value as 'High' | 'Medium' | 'Low' };
                          setRoleData({ ...roleData, TOOLS: updatedTools });
                        }}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateTool(index, 'Tool', tool)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // View mode for tools
                    <>
                      <span 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => setEditingTool({index, type: 'Tool'})}
                        title="Click to edit"
                      >
                        {tool.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Tool
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(tool.priority)}`}>
                          {tool.priority}
                        </span>
                        <button
                          onClick={() => removeTool(index, 'Tool')}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove tool"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {roleData?.TECHNOLOGIES?.map((tech, index) => (
                <div key={`tech-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs">
                  {editingTool?.index === index && editingTool?.type === 'Technology' ? (
                    // Edit mode for technologies
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={tech.name}
                        onChange={(e) => {
                          const updatedTechs = [...(roleData?.TECHNOLOGIES || [])];
                          updatedTechs[index] = { ...tech, name: e.target.value };
                          setRoleData({ ...roleData, TECHNOLOGIES: updatedTechs });
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select
                        value={tech.priority}
                        onChange={(e) => {
                          const updatedTechs = [...(roleData?.TECHNOLOGIES || [])];
                          updatedTechs[index] = { ...tech, priority: e.target.value as 'High' | 'Medium' | 'Low' };
                          setRoleData({ ...roleData, TECHNOLOGIES: updatedTechs });
                        }}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateTool(index, 'Technology', tech)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // View mode for technologies
                    <>
                      <span 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => setEditingTool({index, type: 'Technology'})}
                        title="Click to edit"
                      >
                        {tech.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Technology
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(tech.priority)}`}>
                          {tech.priority}
                        </span>
                        <button
                          onClick={() => removeTool(index, 'Technology')}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
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
            
            {/* Add New Tool/Technology */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add new tool or technology"
                  value={newToolItem.name}
                  onChange={(e) => setNewToolItem({ ...newToolItem, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  value={newToolItem.type}
                  onChange={(e) => setNewToolItem({ ...newToolItem, type: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Tool">Tool</option>
                  <option value="Technology">Technology</option>
                </select>
                <select
                  value={newToolItem.priority}
                  onChange={(e) => setNewToolItem({ ...newToolItem, priority: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button 
                  onClick={addNewTool}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>

          {/* Compliance Requirements */}
          <Card className="p-6 bg-white border border-gray-200 text-base">
            <h3 className="text-lg font-bold text-black mb-4 flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Compliance Requirements
            </h3>
            
            <div className="space-y-3 mb-4">
              {roleData?.COMPLIANCES?.map((comp, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs">
                  {editingCompliance === index ? (
                    // Edit mode for compliance
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) => {
                          const updatedCompliances = [...(roleData?.COMPLIANCES || [])];
                          updatedCompliances[index] = { ...comp, name: e.target.value };
                          setRoleData({ ...roleData, COMPLIANCES: updatedCompliances });
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select
                        value={comp.priority}
                        onChange={(e) => {
                          const updatedCompliances = [...(roleData?.COMPLIANCES || [])];
                          updatedCompliances[index] = { ...comp, priority: e.target.value as 'High' | 'Medium' | 'Low' };
                          setRoleData({ ...roleData, COMPLIANCES: updatedCompliances });
                        }}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <button
                        onClick={() => updateCompliance(index, comp)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCompliance(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // View mode for compliance
                    <>
                      <span 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => setEditingCompliance(index)}
                        title="Click to edit"
                      >
                        {comp.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Compliance
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(comp.priority)}`}>
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
                  placeholder="Add new compliance requirement"
                  value={newComplianceItem.name}
                  onChange={(e) => setNewComplianceItem({ ...newComplianceItem, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  value={newComplianceItem.priority}
                  onChange={(e) => setNewComplianceItem({ ...newComplianceItem, priority: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button 
                  onClick={addNewCompliance}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-8 border-t border-gray-200">
        <div className="flex space-x-4">
          <Button 
            onClick={saveAllRequirements}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save All Requirements'}
          </Button>
          <Button 
            onClick={() => {
              if (saveStatus === 'success' && onNext) {
                onNext();
              }
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={saveStatus !== 'success'}
          >
            Continue to Requirements Builder
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedRequirements;
