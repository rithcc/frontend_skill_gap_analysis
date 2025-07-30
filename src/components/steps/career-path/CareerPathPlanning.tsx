import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareerPathPlanningProps {
  onNext?: () => void;
  onTeamLevelNext?: () => void;
  onBack?: () => void;
}

export default function CareerPathPlanning({ onNext, onTeamLevelNext, onBack }: CareerPathPlanningProps) {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-start justify-center bg-white font-sans pt-7 overflow-hidden">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        <div className="text-center w-full mb-0">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Career Path Planning
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-1xl mx-auto leading-normal">
            Select whether you want to plan career paths for an individual employee or develop strategic team-level capabilities
          </p>
        </div>
        <div className="h-4" />
        <div className="grid lg:grid-cols-2 gap-6 w-full flex-1 mt-0">
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[260px] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50"></div>
            <div className="relative p-6 flex flex-col flex-1 items-center justify-center">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Individual Employee</h3>
              <p className="text-gray-600 mb-5 leading-normal text-sm text-center">Focus on a specific employee's career development, aspirations, and growth path</p>
              <ul className="space-y-2 flex-1 text-left">
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Employee aspirations and goals</li>
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />High potential employee grooming</li>
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Succession planning</li>
              </ul>
              <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl" onClick={onNext}>Select Individual Path</Button>
            </div>
          </Card>
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[260px] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50"></div>
            <div className="relative p-6 flex flex-col flex-1 items-center justify-center">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Team Level</h3>
              <p className="text-gray-600 mb-5 leading-normal text-sm text-center">Build strategic team capabilities and prepare for future roles and use cases</p>
              <ul className="space-y-2 flex-1 text-left">
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Role-based team readiness</li>
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Use case building capabilities</li>
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Strategic workforce planning</li>
              </ul>
              <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl" onClick={onTeamLevelNext}>Select Team Path</Button>
            </div>
          </Card>
        </div>
        <div className="w-full max-w-2xl mt-12">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <h4 className="text-lg font-bold text-gray-900 mb-4">How It Works</h4>
            <div className="grid grid-cols-4 gap-4 w-full">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 font-bold text-blue-700">1</div>
                <span className="text-xs text-gray-700 font-semibold">Select Approach</span>
                <span className="text-xs text-gray-500 text-center">Choose individual or team planning</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 font-bold text-blue-700">2</div>
                <span className="text-xs text-gray-700 font-semibold">Define Requirements</span>
                <span className="text-xs text-gray-500 text-center">Identify roles and capabilities needed</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 font-bold text-blue-700">3</div>
                <span className="text-xs text-gray-700 font-semibold">Get Recommendations</span>
                <span className="text-xs text-gray-500 text-center">AI-powered career path suggestions</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 font-bold text-blue-700">4</div>
                <span className="text-xs text-gray-700 font-semibold">Execute & Track</span>
                <span className="text-xs text-gray-500 text-center">Implement learning paths and monitor progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
