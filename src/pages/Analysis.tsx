import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ObjectiveSelection from "@/components/steps/ObjectiveSelection";
import RoleTargeting from "@/components/steps/RoleTargeting";
import BenchmarkingScenario from "@/components/steps/BenchmarkingScenario";
import RequirementsBuilder from "@/components/steps/RequirementsBuilder";
import ResumeUpload from "@/components/steps/ResumeUpload";
import UploadRequirement from "@/components/steps/UploadRequirement";
import GeneratedRequirements from "@/components/steps/GeneratedRequirements";
import EmployeeSkillCards from "@/components/steps/EmployeeSkillCards";
import AnalysisProgress from "@/components/steps/AnalysisProgress";
import IndividualSkillGapAnalysis from "@/components/steps/IndividualSkillGapAnalysis";
import Recommendations from "@/components/steps/Recommendations";
import ReportViewNew from "@/components/steps/ReportViewNew";
import ReportGeneration from "@/components/steps/ReportGeneration";
import SGAAnalysis from "@/components/steps/SGA Analysis";

const Analysis = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [requirementChoice, setRequirementChoice] = useState<
    "have" | "define" | null
  >(null);
  // Add requirementSessionId state to control resume clearing
  const [requirementSessionId, setRequirementSessionId] = useState<string>(() => Date.now().toString());


  const handleNext = () => {
    // If navigating to ResumeUpload (step 6) from any step except 7 or 8, regenerate sessionId
    if (currentStep + 1 === 6 && currentStep !== 5 && currentStep !== 7 && currentStep !== 8) {
      setRequirementSessionId(Date.now().toString());
    }
    if (currentStep < 13) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    // Special case: if on AnalysisProgress (step 8), always go to ResumeUpload (step 6)
    if (currentStep === 8) {
      // Regenerate sessionId when going back to ResumeUpload from AnalysisProgress
      setRequirementSessionId(Date.now().toString());
      setCurrentStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (currentStep > 1) {
      // If going back to ResumeUpload (step 6) from any step except 7 or 8, regenerate sessionId
      if (currentStep - 1 === 6 && currentStep !== 7 && currentStep !== 8) {
        setRequirementSessionId(Date.now().toString());
      }
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on first step, go back to dashboard
      navigate("/dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleObjectiveSelect = (objective: string) => {
    setSelectedObjective(objective);
    // Only auto-advance for upskill/other objectives
    if (objective !== "innovation") {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  // Handler for Career Path Planning flow
  const handleCareerPathNext = () => {
    // Option 1: Navigate to CareerAnalysis page (recommended)
    navigate("/career-analysis");
    // Option 2: Or, if you want to set a special step, you can do:
    // setCurrentStep(100); // or any step number for career path flow
  };

  const handleRoleSelect = (roleId: string, roleName: string) => {
    setSelectedRole(roleName);
    setSelectedRoleId(roleId);
    setSelectedRoleName(roleName);

    // Store in localStorage for downstream steps
    localStorage.setItem("selectedRoleId", roleId);
    localStorage.setItem("selectedRoleName", roleName);
    localStorage.setItem("requirementsSource", "defined");

    // Auto-advance if requirement choice is already made
    if (requirementChoice) {
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  };

  const handleRequirementChoice = (choice: "have" | "define") => {
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
    // Set requirements source to uploaded_document when upload completes
    localStorage.setItem("requirementsSource", "uploaded_document");
    console.log(
      "Document upload completed, set requirementsSource to uploaded_document"
    );
    // Do NOT auto-advance to next step here. Navigation will be handled by the Generate Requirement button click in UploadRequirement.
  };

  const handleGenerateReport = () => {
    setCurrentStep(12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ObjectiveSelection
            selectedObjective={selectedObjective}
            onSelectObjective={handleObjectiveSelect}
            onBack={handleBack}
            onCareerPathNext={handleCareerPathNext}
          />
        );
      case 2:
        return (
          <RoleTargeting
            selectedRole={selectedRole}
            onSelectRole={handleRoleSelect}
            onRequirementChoice={handleRequirementChoice}
            onBack={handleBack}
          />
        );
      case 3:
        if (requirementChoice === "have") {
          return (
            <UploadRequirement
              onUploadComplete={handleUploadComplete}
              onBack={handleBack}
            />
          );
        } else {
          return (
            <BenchmarkingScenario
              selectedScenario={selectedScenario}
              onSelectScenario={handleScenarioSelect}
              onBack={handleBack}
            />
          );
        }
      case 4:
        return (
          <GeneratedRequirements onNext={handleNext} onBack={handleBack} />
        );

      case 5:
        return (
          <RequirementsBuilder
            onNext={() => {
              // Generate a new session ID when starting a new requirement
              setRequirementSessionId(Date.now().toString());
              handleNext();
            }}
            onBack={handleBack}
            selectedRoleId={selectedRoleId ?? undefined}
            selectedRoleName={selectedRoleName ?? undefined}
          />
        );
      case 6:
        return (
          <ResumeUpload
            onNext={() => {
              if (localStorage.getItem("showEmployeeSkillCard") === "true") {
                localStorage.removeItem("showEmployeeSkillCard");
                setCurrentStep(7); // go to EmployeeSkillCards
              } else {
                setCurrentStep(8); // skip to AnalysisProgress
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBack={handleBack}
            requirementSessionId={requirementSessionId}
          />
        );

      case 7:
        return (
          <EmployeeSkillCards
            onNext={handleNext}
            onBack={() => {
              // Go back to ResumeUpload
              setCurrentStep(6);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );

      case 8:
        return (
          <AnalysisProgress
            onNext={handleNext}
            onBack={() => {
              alert("Going back will reset the analysis progress. Are you sure you want to go back?");
              setCurrentStep(6);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );

      case 9:
        return <SGAAnalysis onNext={handleNext} onBack={handleBack} />;
      case 10:
        return (
          <IndividualSkillGapAnalysis onNext={handleNext} onBack={handleBack} />
        );
      case 11:
        return <Recommendations onNext={handleNext} onBack={handleBack} />;
      case 12:
        return <ReportGeneration onNext={handleNext} onBack={handleBack} />;
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
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
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
        {/* Only render step content, not an extra back button here */}
        {renderStep()}
      </div>
    </div>
  );
};

export default Analysis;
