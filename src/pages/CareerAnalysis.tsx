import { useState } from "react";
import { CareerPathPlanning, TeamLevelPlanning, ADASUseCaseSelection } from "@/components/steps/career-path";
import ModernWebDesign from "@/pages/ModernWebDesign";
import ObjectiveSelection from "@/components/steps/ObjectiveSelection";

export default function CareerAnalysis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCareerPathNext = () => {
    setCurrentStep(2); // CareerPathPlanning
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleUpskillNext = () => {
    setCurrentStep(3); // ModernWebDesign
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTeamLevelNext = () => {
    setCurrentStep(3); // TeamLevelPlanning
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleADASUseCaseNext = () => {
    setCurrentStep(4); // ADASUseCaseSelection
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ObjectiveSelection
            selectedObjective={selectedObjective}
            onSelectObjective={setSelectedObjective}
            onNext={handleUpskillNext}
            onCareerPathNext={handleCareerPathNext}
          />
        );
      case 2:
        return <CareerPathPlanning onNext={handleNext} onTeamLevelNext={handleTeamLevelNext} />;
      case 3:
        return <TeamLevelPlanning onBack={() => setCurrentStep(2)} onNext={handleADASUseCaseNext} />;
      case 4:
        return <ADASUseCaseSelection />;
      case 5:
        return <ModernWebDesign onNext={handleNext} onBack={handleBack} />;
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
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <span>Back</span>
              </button>
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
}
