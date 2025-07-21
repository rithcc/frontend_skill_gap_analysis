
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, FileText, Target, Settings, Upload, Users, BarChart3, TrendingUp, FileBarChart, Download, Network } from "lucide-react";
import ObjectiveSelection from "./steps/ObjectiveSelection";
import RoleTargeting from "./steps/RoleTargeting";
import BenchmarkingScenario from "./steps/BenchmarkingScenario";
import RequirementsBuilder from "./steps/RequirementsBuilder";
import ResumeUpload from "./steps/ResumeUpload";
import UploadRequirement from "./steps/UploadRequirement";
import GeneratedRequirements from "./steps/GeneratedRequirements";
import EmployeeSkillCards from "./steps/EmployeeSkillCards";
import AnalysisProgress from "./steps/AnalysisProgress";
import IndividualSkillGapAnalysis from "./steps/IndividualSkillGapAnalysis";
import Recommendations from "./steps/Recommendations";
import ReportViewNew from "./steps/ReportViewNew";
import ReportGeneration from "./steps/ReportGeneration";
import SGAAnalysis from "./steps/SGA Analysis";

interface SkillAnalysisFlowProps {
  onBack: () => void;
}

const SkillAnalysisFlow = ({ onBack }: SkillAnalysisFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [requirementChoice, setRequirementChoice] = useState<'have' | 'define' | null>(null);

  const handleNext = () => {
    if (currentStep < 13) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleObjectiveSelect = (objective: string) => {
    setSelectedObjective(objective);
    // Auto-advance to next step
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Auto-advance if requirement choice is already made
    if (requirementChoice) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleRequirementChoice = (choice: 'have' | 'define') => {
    setRequirementChoice(choice);
    // Auto-advance if role is already selected
    if (selectedRole) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario);
    // Auto-advance to next step
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleUploadComplete = () => {
    // Auto-advance to next step when upload is complete
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ObjectiveSelection 
            selectedObjective={selectedObjective}
            onSelectObjective={handleObjectiveSelect}
          />
        );
      case 2:
        return (
          <RoleTargeting 
            selectedRole={selectedRole}
            onSelectRole={handleRoleSelect}
            onRequirementChoice={handleRequirementChoice}
          />
        );
      case 3:
        if (requirementChoice === 'have') {
          return <UploadRequirement onUploadComplete={handleUploadComplete} />;
        } else {
          return (
            <BenchmarkingScenario 
              selectedScenario={selectedScenario}
              onSelectScenario={handleScenarioSelect}
            />
          );
        }
      case 4:
        return <GeneratedRequirements onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <RequirementsBuilder onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <ResumeUpload onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <EmployeeSkillCards onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <AnalysisProgress onNext={handleNext} onBack={handleBack} />;
      case 9:
        return <IndividualSkillGapAnalysis onNext={handleNext} onBack={handleBack} />;
      case 10:
        return <Recommendations onNext={handleNext} onBack={handleBack} />;
      case 11:
        return <ReportViewNew onNext={handleNext} onBack={handleBack} />;
      case 12:
        return <ReportGeneration onNext={handleNext} onBack={handleBack} />;
      case 13:
        return <SGAAnalysis />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img 
                  src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
                  alt="CreamCollar - Crafting Futures" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default SkillAnalysisFlow;