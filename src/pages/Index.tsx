import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, User, Target, Lightbulb, BarChart3, ArrowRight, Play, Calendar, Clock, X, Mail, Phone, Building } from "lucide-react";
import AuthModal from "@/components/authModal";
import SkillAnalysisFlow from "@/components/SkillAnalysisFlow";
import SkillGapDemo from "@/components/SkillGapDemo";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showScheduleDemo, setShowScheduleDemo] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredTime: '',
    message: ''
  });

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", 
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Schedule demo request:', scheduleForm);
    alert('Demo scheduled successfully! We will contact you soon.');
    setShowScheduleDemo(false);
    setScheduleForm({
      name: '',
      email: '',
      company: '',
      phone: '',
      preferredTime: '',
      message: ''
    });
  };

  const strategicPaths = [
    {
      id: "team-productivity",
      title: "Improve Team Productivity",
      subtitle: "Enhance team performance and efficiency",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      features: [
        { icon: "🎯", title: "Project Fit Recommendations" },
        { icon: "📚", title: "Learning Path Creation" },
        { icon: "👥", title: "Mentor Matching" },
        { icon: "📋", title: "Curriculum Design" },
        { icon: "🚀", title: "Upskill for New Role", active: true }
      ]
    },
    {
      id: "innovation",
      title: "Drive Innovation", 
      subtitle: "Foster a culture of innovation and growth",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: [
        { icon: "🌟", title: "Career Path Planning" },
        { icon: "💎", title: "High Potential Development" }
      ]
    },
    {
      id: "business-strategy",
      title: "Align with Business Strategy",
      subtitle: "Make informed decisions on talent development",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500", 
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      features: [
        { icon: "⚖️", title: "Build vs Buy vs Borrow" },
        { icon: "🎓", title: "New Skill Development" },
        { icon: "🔄", title: "Role Transition" },
        { icon: "📖", title: "Strategic Curriculum" },
        { icon: "🏆", title: "Learning Programs" },
        { icon: "👑", title: "Succession Planning" }
      ]
    }
  ];

  const handleUpskillClick = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
    } else {
      setShowAnalysis(true);
    }
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
  };

  const handleScheduleDemo = () => {
    setShowScheduleDemo(true);
  };

  if (showDemo) {
    return <SkillGapDemo onBack={() => setShowDemo(false)} />;
  }

  if (showAnalysis) {
    return <SkillAnalysisFlow onBack={() => setShowAnalysis(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img 
                  src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
                  alt="CreamCollar - Crafting Futures" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">Welcome back!</span>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuth(true)}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Button>
              )}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 text-sm font-medium">
              CreamCollar AI Platform
            </Badge>
            <h1 className="text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Workforce Analytics
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your organization with AI-driven workforce intelligence. Identify skill gaps, 
              optimize talent allocation, and accelerate team performance with data-driven insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={handleUpskillClick}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 h-auto rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all group"
              >
                Start Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchDemo}
                className="px-8 py-4 h-auto rounded-2xl font-semibold text-lg border-2 hover:bg-gray-50 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleScheduleDemo}
                className="px-8 py-4 h-auto rounded-2xl font-semibold text-lg border-2 hover:bg-gray-50 group"
              >
                <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Schedule Demo
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">500+</div>
                <div className="text-gray-600 font-medium">Companies Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">1M+</div>
                <div className="text-gray-600 font-medium">Skills Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">95%</div>
                <div className="text-gray-600 font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-600 font-medium">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        open={showAuth} 
        onOpenChange={setShowAuth}
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setShowAuth(false);
          setShowAnalysis(true);
        }}
      />

      {/* Schedule Demo Modal */}
      <Dialog open={showScheduleDemo} onOpenChange={setShowScheduleDemo}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              Schedule Your Demo
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Get a personalized demonstration of CreamCollar's AI-powered skill analysis platform.
              Our experts will show you how to transform your workforce development strategy.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleScheduleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={scheduleForm.email}
                  onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                  placeholder="your.email@company.com"
                  required
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company Name *
                </Label>
                <Input
                  id="company"
                  value={scheduleForm.company}
                  onChange={(e) => setScheduleForm({...scheduleForm, company: e.target.value})}
                  placeholder="Your company name"
                  required
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={scheduleForm.phone}
                  onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Preferred Time Slot *
              </Label>
              <Select value={scheduleForm.preferredTime} onValueChange={(value) => setScheduleForm({...scheduleForm, preferredTime: value})}>
                <SelectTrigger className="rounded-lg border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select your preferred time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Additional Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={scheduleForm.message}
                onChange={(e) => setScheduleForm({...scheduleForm, message: e.target.value})}
                placeholder="Tell us about your specific needs or questions..."
                rows={4}
                className="rounded-lg border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What to Expect:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 30-minute personalized demo</li>
                <li>• Live skill analysis walkthrough</li>
                <li>• Q&A session with our experts</li>
                <li>• Custom ROI assessment</li>
                <li>• Implementation roadmap</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowScheduleDemo(false)}
                className="flex-1 rounded-lg border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg"
              >
                Schedule Demo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;