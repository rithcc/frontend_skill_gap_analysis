import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TeamLevelPlanningProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function TeamLevelPlanning({
  onBack,
  onNext,
}: TeamLevelPlanningProps) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-start justify-center bg-gradient-to-b from-cyan-50 to-blue-50 font-sans pt-7 overflow-hidden">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        <div className="text-center w-full mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Team Level Planning
          </h2>
          <p className="text-base text-black max-w-2xl mx-auto mt-2 font-sans">
            Choose Your Team Planning Approach
          </p>
          <p className="text-base text-black max-w-2xl mx-auto mt-2 font-sans">
            Select whether you want to plan for specific roles or build capabilities for complete use cases
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-10">
          <Card className="p-6 flex flex-col items-center bg-white shadow-xl rounded-2xl border-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-blue-700 font-bold">🔵</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Role Level</h3>
            <p className="text-gray-600 mb-4 text-center">
              Focus on building specific roles within your team based on
              strategy, needs and trends.
            </p>
            <ul className="text-blue-700 text-sm space-y-1 mb-4">
              <li>Target specific role requirements</li>
              <li>Strategic workforce planning</li>
              <li>Industry relevant development</li>
              <li>Individual role development</li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
              onClick={onNext}
            >
              Select Role Planning
            </Button>
          </Card>
          <Card className="p-6 flex flex-col items-center bg-white shadow-xl rounded-2xl border-0">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-purple-700 font-bold">🟣</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Use Case Level
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Build comprehensive team capabilities to implement complex use
              cases and projects.
            </p>
            <ul className="text-purple-700 text-sm space-y-1 mb-4">
              <li>Embedded project capabilities</li>
              <li>Multiple role coordination</li>
              <li>Cross-functional learning</li>
              <li>Complete solution delivery</li>
            </ul>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
              onClick={onNext}
            >
              Select Use Case Planning
            </Button>
          </Card>
        </div>
        <div className="w-full bg-white rounded-2xl shadow p-6 mb-10">
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Planning Approach Comparison</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-xl text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 bg-gradient-to-r from-blue-100 via-gray-50 to-purple-100 border-l-4 border-blue-400 rounded-tl-2xl">Aspect</th>
                  <th className="py-4 px-6 text-center font-semibold bg-blue-50 text-blue-700">Role Level</th>
                  <th className="py-4 px-6 text-center font-semibold bg-purple-50 text-purple-700 rounded-tr-2xl">Use Case Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-4 px-6 font-medium text-gray-700">Focus</td>
                  <td className="py-4 px-6 text-center">Individual role mastery</td>
                  <td className="py-4 px-6 text-center">Complete project delivery</td>
                </tr>
                <tr className="even:bg-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-4 px-6 font-medium text-gray-700">Scope</td>
                  <td className="py-4 px-6 text-center">Single role requirements</td>
                  <td className="py-4 px-6 text-center">Multiple interconnected roles</td>
                </tr>
                <tr className="even:bg-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-4 px-6 font-medium text-gray-700">Timeline</td>
                  <td className="py-4 px-6 text-center">3-12 months</td>
                  <td className="py-4 px-6 text-center">6-24 months</td>
                </tr>
                <tr className="even:bg-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-4 px-6 font-medium text-gray-700">Team Size</td>
                  <td className="py-4 px-6 text-center">1-3 people</td>
                  <td className="py-4 px-6 text-center">5-15 people</td>
                </tr>
                <tr className="even:bg-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-4 px-6 font-medium text-gray-700 rounded-bl-2xl">Complexity</td>
                  <td className="py-4 px-6 text-center">Medium</td>
                  <td className="py-4 px-6 text-center rounded-br-2xl">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full bg-white rounded-2xl shadow p-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Happens Next</h4>
          <div className="flex flex-col md:flex-row justify-between gap-8 text-sm items-start bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-xl p-8 shadow-inner">
            <div className="flex-1 bg-white rounded-xl shadow p-6 mr-0 md:mr-4 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 mr-3">
                  {/* Briefcase icon for Role Level */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#2563eb" className="w-6 h-6">
                    <rect x="3" y="7" width="18" height="13" rx="2" className="stroke-current" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" className="stroke-current" />
                  </svg>
                </span>
                <span className="font-bold text-blue-700 text-lg">Role Level Process</span>
              </div>
              <ol className="list-decimal ml-6 text-blue-900">
                <li className="mb-3">
                  <span className="font-semibold">Requirements Definition</span>
                  <div className="text-gray-600 text-xs">Upload existing or build new role requirements</div>
                </li>
                <li className="mb-3">
                  <span className="font-semibold">Skill Gap Analysis</span>
                  <div className="text-gray-600 text-xs">Identify current team capabilities vs requirements</div>
                </li>
                <li className="mb-3">
                  <span className="font-semibold">Career Path Planning</span>
                  <div className="text-gray-600 text-xs">Create targeted development plans</div>
                </li>
              </ol>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-6 ml-0 md:ml-4">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 mr-3">
                  {/* Target icon for Use Case Level */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#9333ea" className="w-6 h-6">
                    <circle cx="12" cy="12" r="9" className="stroke-current" />
                    <circle cx="12" cy="12" r="4" className="stroke-current" />
                  </svg>
                </span>
                <span className="font-bold text-purple-700 text-lg">Use Case Level Process</span>
              </div>
              <ol className="list-decimal ml-6 text-purple-900">
                <li className="mb-3">
                  <span className="font-semibold">Use Case Selection</span>
                  <div className="text-gray-600 text-xs">Choose target use case for implementation</div>
                </li>
                <li className="mb-3">
                  <span className="font-semibold">Role Mapping</span>
                  <div className="text-gray-600 text-xs">Identify all required roles and team structure</div>
                </li>
                <li className="mb-3">
                  <span className="font-semibold">Team Development</span>
                  <div className="text-gray-600 text-xs">Build comprehensive team capabilities</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* Removed Back to Planning Type Selection button as requested */}
      </div>
    </section>
  );
}
