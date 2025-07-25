import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
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

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleAnalysisClick = () => {
    navigate("/analysis");
  };

  const teamMembers = [
    { name: "John Smith", role: "Frontend Developer", avatar: "JS", color: "bg-blue-500" },
    { name: "Sarah Johnson", role: "Senior React Developer", avatar: "SJ", color: "bg-green-500" },
    { name: "Mike Khan", role: "UI/UX Designer", avatar: "MK", color: "bg-purple-500" },
    { name: "Emily Davis", role: "Backend Developer", avatar: "ED", color: "bg-orange-500" },
    { name: "Alex Wilson", role: "DevOps Engineer", avatar: "AW", color: "bg-red-500" },
    { name: "Lisa Chen", role: "Product Manager", avatar: "LC", color: "bg-cyan-500" },
    { name: "David Brown", role: "Full Stack Developer", avatar: "DB", color: "bg-pink-500" },
    { name: "Maria Garcia", role: "Data Analyst", avatar: "MG", color: "bg-indigo-500" },
    { name: "Tom Anderson", role: "QA Engineer", avatar: "TA", color: "bg-yellow-500" },
    { name: "Jennifer Lee", role: "Scrum Master", avatar: "JL", color: "bg-teal-500" },
    { name: "Robert Taylor", role: "Senior Backend Developer", avatar: "RT", color: "bg-gray-500" },
    { name: "Amy White", role: "Technical Writer", avatar: "AW", color: "bg-violet-500" },
  ];

  const previousAnalyses = [
    {
      id: 1,
      title: "Frontend Team React Skills Assessment",
      date: "2024-12-15",
      status: "Completed",
      duration: "3 weeks",
      participants: 8,
      skillsAnalyzed: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
      gapsIdentified: 12,
      gapsClosed: 10,
      overallScore: 87,
      recommendations: [
        "Advanced React Hooks training needed",
        "TypeScript proficiency improvement required",
        "State management optimization"
      ],
      nextSteps: "Schedule advanced React workshop for Q1 2025"
    },
    {
      id: 2,
      title: "Backend API Development Skills",
      date: "2024-12-10",
      status: "In Progress",
      duration: "2 weeks",
      participants: 6,
      skillsAnalyzed: ["Node.js", "Express", "MongoDB", "API Design", "Testing"],
      gapsIdentified: 8,
      gapsClosed: 6,
      overallScore: 75,
      recommendations: [
        "API security best practices training",
        "Database optimization techniques",
        "Automated testing implementation"
      ],
      nextSteps: "Complete remaining assessments by Jan 2025"
    },
    {
      id: 3,
      title: "DevOps & Cloud Infrastructure",
      date: "2024-12-05",
      status: "In Progress",
      duration: "4 weeks",
      participants: 3,
      skillsAnalyzed: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
      gapsIdentified: 15,
      gapsClosed: 7,
      overallScore: 62,
      recommendations: [
        "AWS certification training program",
        "Kubernetes hands-on workshops",
        "CI/CD pipeline optimization"
      ],
      nextSteps: "Implement cloud migration strategy"
    },
    {
      id: 4,
      title: "UI/UX Design System Analysis",
      date: "2024-11-28",
      status: "Completed",
      duration: "2 weeks",
      participants: 4,
      skillsAnalyzed: ["Figma", "Design Systems", "User Research", "Prototyping"],
      gapsIdentified: 6,
      gapsClosed: 6,
      overallScore: 92,
      recommendations: [
        "Advanced prototyping techniques",
        "User research methodologies",
        "Design system maintenance"
      ],
      nextSteps: "Implement new design system components"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-fade-in">
              <img 
                src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
                alt="CreamCollar"
                className="h-8 w-auto"
              />
              <span className="ml-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                Pro Dashboard
              </span>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2 hover-scale border-gray-300 hover:border-red-300 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome Back! 👋
          </h2>
          <p className="text-xl text-gray-600">
            Ready to unlock your team's potential? Here's your intelligence hub.
          </p>
        </div>

        {/* Company Profile Section */}
        <Card className="p-6 border-0 shadow-lg mb-8 animate-fade-in bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CreamCollar Technologies</h3>
                <p className="text-blue-100">AI-Powered Workforce Analytics Platform</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Size Card */}
        <div className="mb-8">
          <Card 
            className="p-6 hover:shadow-xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 animate-fade-in cursor-pointer transition-all"
            onClick={() => setShowTeamMembers(true)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Team Size</p>
                <p className="text-4xl font-bold text-blue-900 mt-2">24</p>
                <p className="text-sm text-blue-600 mt-1">Active Members - Click to view</p>
                <div className="flex items-center mt-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">JS</div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">SJ</div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">MK</div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">+21</div>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="p-8 border-0 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover-scale group"
                onClick={handleAnalysisClick}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-3" />
                    <span className="font-semibold">New Analysis</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover-scale group"
                onClick={() => setShowTrackAnalysis(true)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3 text-gray-600 group-hover:text-orange-600" />
                    <span className="font-semibold text-gray-700 group-hover:text-orange-600">Track Analysis</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-orange-600" />
                </div>
              </Button>

              <Button variant="outline" className="h-16 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover-scale group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-gray-600 group-hover:text-blue-600" />
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600">View Reports</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-blue-600" />
                </div>
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-8 border-0 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  JS
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Smith completed Frontend Assessment</p>
                  <p className="text-xs text-gray-500 mt-1">Score: 95% • 2 hours ago</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  SJ
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson joined the team</p>
                  <p className="text-xs text-gray-500 mt-1">Position: Senior React Developer • Yesterday</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">New Member</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">React Advanced Training scheduled</p>
                  <p className="text-xs text-gray-500 mt-1">15 participants enrolled • Starts Monday</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Training</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">AI generated 12 new skill recommendations</p>
                  <p className="text-xs text-gray-500 mt-1">Based on project requirements • 1 day ago</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">AI Insight</span>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Team achieved 94% completion rate milestone</p>
                  <p className="text-xs text-gray-500 mt-1">Q4 2024 goals exceeded • 3 days ago</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Achievement</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">
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
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
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
                            style={{width: `${analysis.overallScore}%`}}
                          ></div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{analysis.participants}</div>
                          <div className="text-xs text-blue-700">Participants</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{analysis.skillsAnalyzed.length}</div>
                          <div className="text-xs text-purple-700">Skills</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{analysis.gapsClosed}/{analysis.gapsIdentified}</div>
                          <div className="text-xs text-green-700">Gaps Closed</div>
                        </div>
                      </div>

                      {/* Skills Analyzed */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Analyzed</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skillsAnalyzed.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Recommendations */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Recommendations</h4>
                        <ul className="space-y-1">
                          {analysis.recommendations.slice(0, 2).map((rec, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Next Steps */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-blue-700 mb-1">Next Steps</h4>
                        <p className="text-xs text-blue-600">{analysis.nextSteps}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          View Full Report
                        </Button>
                        <Button size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700">
                          Export PDF
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Summary Statistics */}
              <Card className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{previousAnalyses.length}</div>
                    <div className="text-sm text-gray-600">Total Analyses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {previousAnalyses.filter(a => a.status === 'Completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {previousAnalyses.reduce((sum, a) => sum + a.participants, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Team Members Assessed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(previousAnalyses.reduce((sum, a) => sum + a.overallScore, 0) / previousAnalyses.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;