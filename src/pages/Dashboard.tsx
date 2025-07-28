import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Award, 
  LogOut, 
  Plus, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2,
  FileText,
  Star,
  Brain,
  Zap,
  Calendar,
  ArrowRight,
  Building2,
  MapPin,
  Code,
  Server,
  Palette,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [showTrackAnalysis, setShowTrackAnalysis] = useState(false);

  // Dummy data for team members and previous analyses
  const teamMembers = [
    { name: "John Smith", role: "Frontend Developer", avatar: "JS", color: "bg-blue-500" },
    { name: "Sarah Johnson", role: "Senior React Developer", avatar: "SJ", color: "bg-green-500" },
    { name: "Michael King", role: "Backend Developer", avatar: "MK", color: "bg-purple-500" },
    // ...add more members as needed
  ];

  const previousAnalyses = [
    {
      id: 1,
      title: "Frontend Assessment",
      date: "2024-06-01",
      duration: "2h",
      status: "Completed",
      overallScore: 95,
      skillsAnalyzed: ["React", "TypeScript", "CSS"],
      gapsIdentified: "State Management",
      gapsClosed: 2,
      recommendations: ["Review Redux Toolkit", "Practice Context API"],
      nextSteps: "Schedule advanced React training."
    },
    {
      id: 2,
      title: "Backend Assessment",
      date: "2024-05-20",
      duration: "1.5h",
      status: "Completed",
      overallScore: 88,
      skillsAnalyzed: ["Node.js", "Express", "MongoDB"],
      gapsIdentified: "Database Indexing",
      gapsClosed: 1,
      recommendations: ["Deep dive into MongoDB indexes"],
      nextSteps: "Assign MongoDB optimization project."
    },
    // ...add more analyses as needed
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleAnalysisClick = () => {
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
              alt="CreamCollar Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:border-red-300 hover:text-red-600 text-base px-4 py-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-visible">
        {/* Welcome Section */}
        <div className="mb-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome Back Cream Collar! 👋
          </h2>
        </div>

        {/* Company Profile Section - removed as per user request */}

        {/* Team Size Card */}
        <div className="mb-8">
          <Card 
            className="p-4 hover:shadow-xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 animate-fade-in cursor-pointer transition-all"
            onClick={() => setShowTeamMembers(true)}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Team Size</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">24</p>
                <p className="text-xs text-blue-600 mt-1">Active Members - Click to view</p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">JS</div>
                    <div className="w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">SJ</div>
                    <div className="w-7 h-7 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">MK</div>
                    <div className="w-7 h-7 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">+21</div>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

            {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* Quick Actions */}
          <Card className="p-3 border-0 shadow flex flex-col justify-between h-[320px] min-h-[320px] max-h-[320px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Quick Actions</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              <Button 
                className="h-14 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow group"
                onClick={handleAnalysisClick}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-3" />
                    <span className="font-semibold">New Analysis</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 text-base border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 group"
                onClick={() => setShowTrackAnalysis(true)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3 text-gray-600 group-hover:text-orange-600" />
                    <span className="font-semibold text-gray-700 group-hover:text-orange-600">Track Analysis</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-orange-600" />
                </div>
              </Button>
              <Button variant="outline" className="h-14 text-base border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">View Reports</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-blue-600" />
                </div>
              </Button>
            </div>
          </Card>
          {/* Recent Activity */}
          <Card className="p-3 border-0 shadow-lg animate-fade-in flex flex-col justify-between h-[320px] min-h-[320px] max-h-[320px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 pr-1" style={{maxHeight: '220px'}}>
              {/* ...existing activity items... */}
              <div className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">JS</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Smith completed Frontend Assessment</p>
                  <p className="text-sm text-gray-500 mt-1">Score: 95% • 2 hours ago</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div className="bg-blue-600 h-1 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">SJ</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson joined the team</p>
                  <p className="text-sm text-gray-500 mt-1">Position: Senior React Developer • Yesterday</p>
                  <span className="inline-block mt-2 px-2 py-1 text-sm bg-green-100 text-green-700 rounded-full">New Member</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">React Advanced Training scheduled</p>
                  <p className="text-sm text-gray-500 mt-1">15 participants enrolled • Starts Monday</p>
                  <span className="inline-block mt-2 px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">Training</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">AI generated 12 new skill recommendations</p>
                  <p className="text-sm text-gray-500 mt-1">Based on project requirements • 1 day ago</p>
                  <span className="inline-block mt-2 px-2 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">AI Insight</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Team achieved 94% completion rate milestone</p>
                  <p className="text-sm text-gray-500 mt-1">Q4 2024 goals exceeded • 3 days ago</p>
                  <span className="inline-block mt-2 px-2 py-1 text-sm bg-red-100 text-red-700 rounded-full">Achievement</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2 text-sm">
              View All Activity
            </Button>
          </Card>
        </div>

        {/* Team Members Modal */}
        <Dialog open={showTeamMembers} onOpenChange={setShowTeamMembers}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                Team Members (24)
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-9 h-9 ${member.color} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Track Analysis Modal */}
        <Dialog open={showTrackAnalysis} onOpenChange={setShowTrackAnalysis}>
          <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-orange-600" />
                Track Analysis & Reports
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {previousAnalyses.map((analysis) => (
                  <Card key={analysis.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{analysis.title}</h3>
                          <p className="text-sm text-gray-500">Started: {analysis.date} • Duration: {analysis.duration}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          analysis.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {analysis.status}
                        </span>
                      </div>

                      {/* Progress & Score */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-700">Overall Score</span>
                          <span className="text-2xl font-bold text-blue-600">{analysis.overallScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              analysis.overallScore >= 80 
                                ? 'bg-green-500' 
                                : analysis.overallScore >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${analysis.overallScore}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Skills, Gaps, Recommendations, Next Steps */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">Skills Analyzed</p>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {analysis.skillsAnalyzed.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">Gaps Identified</p>
                          <p className="text-sm text-red-600 font-bold">{analysis.gapsIdentified}</p>
                          <p className="text-xs text-green-600 mt-1">Closed: {analysis.gapsClosed}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Recommendations</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {analysis.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Next Steps</p>
                        <p className="text-sm text-blue-700">{analysis.nextSteps}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

export default Dashboard;