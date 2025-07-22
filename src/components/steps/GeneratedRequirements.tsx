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
  Settings
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

const GeneratedRequirements = ({ onNext, onBack, selectedRoleId, selectedRoleName }: GeneratedRequirementsProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [eligibility, setEligibility] = useState<string[]>([]);
  const [responsibilityText, setResponsibilityText] = useState('');
  const [eligibilityText, setEligibilityText] = useState('');
  const [newToolItem, setNewToolItem] = useState({ name: '', priority: 'High', type: 'Tool' });
  const [newComplianceItem, setNewComplianceItem] = useState({ name: '', priority: 'High' });
  const [requirementsSource, setRequirementsSource] = useState<'uploaded_document' | 'defined' | null>(null);
  const [editingTool, setEditingTool] = useState<{index: number, type: 'Tool' | 'Technology'} | null>(null);
  const [editingCompliance, setEditingCompliance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only use localStorage for requirementsSource, uploadedDocumentId, and selectedRoleId
    const loadRoleData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedSource = localStorage.getItem('requirementsSource') as 'uploaded_document' | 'defined' | null;
        const storedDocumentId = localStorage.getItem('uploadedDocumentId');
        const storedRoleId = localStorage.getItem('selectedRoleId');
        setRequirementsSource(storedSource);

        if (storedSource === 'uploaded_document' && storedDocumentId) {
          try {
            const response = await fetch(`http://localhost:3000/api/v1/upload-requirements/document/${storedDocumentId}`);
            if (response.ok) {
              const profileData = await response.json();
              setRoleData(profileData);
              setResponsibilities(profileData.TASKS || []);
              setEligibility(profileData.SKILLS || []);
              setResponsibilityText((profileData.TASKS || []).join('\n'));
              setEligibilityText((profileData.SKILLS || []).join('\n'));
              setLoading(false);
              return;
            } else {
              setError('Failed to fetch requirements from uploaded document.');
            }
          } catch (error) {
            setError('Error fetching requirement profiles by document.');
            console.error('Error fetching requirement profiles by document:', error);
          }
        } else if (storedSource === 'defined' && storedRoleId) {
          try {
            const response = await fetch(`http://localhost:3000/api/v1/roles/${storedRoleId}`);
            if (response.ok) {
              const profileData = await response.json();
              setRoleData(profileData);
              setResponsibilities(profileData.TASKS || []);
              setEligibility(profileData.SKILLS || []);
              setResponsibilityText((profileData.TASKS || []).join('\n'));
              setEligibilityText((profileData.SKILLS || []).join('\n'));
              setLoading(false);
              return;
            } else {
              setError('Failed to fetch requirements for selected role.');
            }
          } catch (error) {
            setError('Error fetching requirement profiles by role.');
            console.error('Error fetching requirement profiles by role:', error);
          }
        } else {
          // If neither, clear data
          setRoleData(null);
          setResponsibilities([]);
          setEligibility([]);
          setResponsibilityText('');
          setEligibilityText('');
          setLoading(false);
        }
      } catch (error) {
        setError('Error loading role data.');
        console.error('Error loading role data:', error);
        setLoading(false);
      }
    };

    // Simulate AI generation process
    const timer = setTimeout(() => {
      setIsGenerating(false);
      loadRoleData();
    }, 3000);

    return () => clearTimeout(timer);
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

  const saveResponsibilities = async () => {
    if (!roleData) return;
    const newResponsibilities = responsibilityText.split('\n').filter(item => item.trim() !== '');
    setResponsibilities(newResponsibilities);
    // Update via API
    try {
      const response = await fetch(`http://localhost:3000/api/v1/requirement-profiles/${roleData.id || roleData._id || ''}/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TASKS: newResponsibilities })
      });
      if (response.ok) {
        const updated = { ...roleData, TASKS: newResponsibilities };
        setRoleData(updated);
      }
    } catch (error) {
      console.error('Failed to update responsibilities:', error);
    }
  };

  const saveEligibility = async () => {
    if (!roleData) return;
    const newEligibility = eligibilityText.split('\n').filter(item => item.trim() !== '');
    setEligibility(newEligibility);
    // Update via API
    try {
      const response = await fetch(`http://localhost:3000/api/v1/requirement-profiles/${roleData.id || roleData._id || ''}/skills`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ SKILLS: newEligibility })
      });
      if (response.ok) {
        const updated = { ...roleData, SKILLS: newEligibility };
        setRoleData(updated);
      }
    } catch (error) {
      console.error('Failed to update eligibility:', error);
    }
  };

  // Remove all add/update/remove API calls for tools, technologies, and compliance
  // Only update state locally for these sections

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

  if (isGenerating || loading) {
    return (
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Generating <span className="modern-blue">Comprehensive Requirements</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Our AI is analyzing your role to create complete requirements framework including tools, responsibilities, eligibility, and compliance
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
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
      </div>
      
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Role Requirements for <span className="modern-blue">
            {roleData?.ROLE_NAME || localStorage.getItem('selectedRoleName') || 'Selected Role'}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          Comprehensive skill requirements and responsibilities framework
        </p>
        
        {/* Requirements Source Indicator */}
        {requirementsSource && (
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
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
                Requirements defined manually
              </>
            )}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Responsibilities & Eligibility (Bigger Boxes) */}
        <div className="space-y-8">
          {/* Responsibilities */}
          <Card className="p-8 bg-white shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Responsibilities
            </h3>
            
            <Textarea
              value={responsibilityText}
              onChange={(e) => setResponsibilityText(e.target.value)}
              placeholder="Enter responsibilities (one per line)..."
              rows={12}
              className="mb-6 text-base leading-relaxed"
            />
            
            <Button 
              onClick={saveResponsibilities} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Responsibilities
            </Button>
          </Card>

          {/* Eligibility Criteria */}
          <Card className="p-8 bg-white shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              Eligibility Criteria
            </h3>
            
            <Textarea
              value={eligibilityText}
              onChange={(e) => setEligibilityText(e.target.value)}
              placeholder="Enter eligibility criteria (one per line)..."
              rows={12}
              className="mb-6 text-base leading-relaxed"
            />
            
            <Button 
              onClick={saveEligibility} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Eligibility Criteria
            </Button>
          </Card>
        </div>

        {/* Right Column - Tools, Technologies & Compliance */}
        <div className="space-y-8">
          {/* Tools & Technologies */}
          <Card className="p-8 bg-white shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              Tools & Technologies
            </h3>
            
            <div className="space-y-3 mb-4">
              {roleData?.TOOLS?.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                <div key={`tech-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
          <Card className="p-8 bg-white shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Compliance Requirements
            </h3>
            
            <div className="space-y-3 mb-4">
              {roleData?.COMPLIANCES?.map((comp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Benchmarking
        </button>
        
        <div className="flex space-x-4">
          <Button 
            onClick={() => {
              // Navigate to Requirements Builder
              if (onNext) {
                onNext();
              }
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
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
