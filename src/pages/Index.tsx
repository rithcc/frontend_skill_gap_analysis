import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, User, Target, Lightbulb, BarChart3, ArrowRight, Play, Calendar, Clock, X, Mail, Phone, Building } from "lucide-react";
import SkillAnalysisFlow from "@/components/SkillAnalysisFlow";
import SkillGapDemo from "@/components/SkillGapDemo";

const Index = () => {
  console.log("Index component is rendering..."); // Debug log
  
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showVideoDemo, setShowVideoDemo] = useState(false);
  
  const [contactForm, setContactForm] = useState({
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

  // Check authentication state on component mount - FIXED VERSION
  useEffect(() => {
    console.log("Index component mounted - checking auth state");
    
    // Only check authentication after a delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      try {
        const authState = localStorage.getItem("isAuthenticated");
        console.log("Auth state check:", authState);
        
        // Only redirect if explicitly authenticated AND we're on the homepage
        if (authState === "true" && window.location.pathname === "/") {
          console.log("User authenticated, redirecting to dashboard...");
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        // Clear any corrupted localStorage
        localStorage.removeItem("isAuthenticated");
      }
    }, 1000); // 1 second delay
    
    return () => clearTimeout(timer);
  }, []);

  // const handleScheduleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the form data to your backend
  //   console.log('Schedule demo request:', scheduleForm);
  //   alert('Demo scheduled successfully! We will contact you soon.');
  //   setShowScheduleDemo(false);
  //   setScheduleForm({
  //     name: '',
  //     email: '',
  //     company: '',
  //     phone: '',
  //     preferredTime: '',
  //     message: ''
  //   });
  // };

   const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      const result = await response.json();
      alert("Message sent successfully! We'll get back to you soon.");
      console.log("Contact form submitted:", result);

      setContactForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        preferredTime: "",
        message: "",
      });
      setShowContactUs(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
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

  const handleLoginClick = () => {
    console.log("Login button clicked");
    navigate("/login");
  };

  const handleSignupClick = () => {
    console.log("Sign up button clicked");
    navigate("/signup");
  };

  const handleScheduleDemoClick = () => {
    navigate("/signup");
  };

  const handleWatchDemo = () => {
    setShowVideoDemo(true);
  };

  const handleContactUs = () => {
    setShowContactUs(true);
  };

  // Conditional component renders with error handling
  try {
    if (showDemo) {
      return <SkillGapDemo onBack={() => setShowDemo(false)} />;
    }
    if (showAnalysis) {
      return <SkillAnalysisFlow onBack={() => setShowAnalysis(false)} />;
    }
  } catch (error) {
    console.error("Error rendering conditional components:", error);
    // Reset the state if there's an error
    setShowDemo(false);
    setShowAnalysis(false);
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <button onClick={handleContactUs} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact Us</button>
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleLoginClick}
                  variant="outline"
                  className="px-6 py-2 rounded-full font-medium border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleSignupClick}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full font-medium"
                >
                  Sign In
                </Button>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Workforce Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Unlock the hidden potential in your team with AI-powered skill analysis, personalized growth paths, and data-driven talent intelligence that drives real business results.
            </p>
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <p className="text-lg text-gray-600 mb-6 font-medium max-w-2xl mx-auto">
                Curious how our platform can transform your workforce? Watch our interactive demo.
              </p>
              <Button 
                size="lg"
                onClick={handleWatchDemo}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 h-auto rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all group"
              >
                <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Platform Features</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Everything you need to build, analyze, and optimize your workforce capabilities with cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Gap Analysis */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Skill Gap Analysis</h3>
              <p className="text-gray-600 mb-4">
                AI-powered analysis identifies skill gaps across your organization, providing actionable insights for targeted development.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Real-time skill assessment</li>
                <li>• Gap identification and ranking</li>
                <li>• Custom competency frameworks</li>
                <li>• Automated reporting</li>
              </ul>
            </Card>

            {/* Workforce Analytics */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Workforce Analytics</h3>
              <p className="text-gray-600 mb-4">
                Get deep insights into team performance, productivity trends, and strategic workforce planning with interactive dashboards.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Performance trend analysis</li>
                <li>• Team capability mapping</li>
                <li>• Predictive workforce modeling</li>
                <li>• ROI tracking and reporting</li>
              </ul>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart AI Recommendations</h3>
              <p className="text-gray-600 mb-4">
                Receive personalized recommendations for training, role assignments, and career development paths based on data-driven insights.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Personalized learning paths</li>
                <li>• Role-fit recommendations</li>
                <li>• Career progression planning</li>
                <li>• Training program optimization</li>
              </ul>
            </Card>

            {/* Resume Analysis */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Resume Analysis</h3>
              <p className="text-gray-600 mb-4">
                Automatically extract and analyze skills from resumes, job descriptions, and performance data with advanced NLP.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Automated skill extraction</li>
                <li>• Competency scoring</li>
                <li>• Experience validation</li>
                <li>• Multi-format support</li>
              </ul>
            </Card>

            {/* Team Management */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Team Management</h3>
              <p className="text-gray-600 mb-4">
                Manage your entire workforce with comprehensive profiles, skill tracking, and performance monitoring tools.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Employee skill profiles</li>
                <li>• Team composition analysis</li>
                <li>• Performance tracking</li>
                <li>• Goal setting and monitoring</li>
              </ul>
            </Card>

            {/* Reporting & Insights */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-rose-50 to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Reporting & Insights</h3>
              <p className="text-gray-600 mb-4">
                Generate comprehensive reports and gain actionable insights with customizable dashboards and automated analytics.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Custom dashboard creation</li>
                <li>• Automated report generation</li>
                <li>• Export and sharing tools</li>
                <li>• Real-time data visualization</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">CreamCollar</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are revolutionizing workforce development with innovative technology that helps organizations build stronger, more capable teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - About Us */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">To empower organizations with the tools and insights needed to unlock their workforce potential and drive sustainable growth through strategic talent development.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Focus</h3>
                  <p className="text-gray-600">We leverage cutting-edge technology and data analytics to provide comprehensive workforce intelligence that transforms how companies approach talent management.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
                  <p className="text-gray-600">Our platform has helped hundreds of organizations optimize their workforce capabilities, reduce skill gaps, and improve overall team performance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customer-Centric</h3>
                  <p className="text-gray-600">We work closely with our clients to understand their unique challenges and provide tailored solutions that deliver measurable business impact.</p>
                </div>
              </div>
            </div>

            {/* Right Side - Company Info */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Company Overview</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">2021</div>
                  <div className="text-gray-600 font-medium">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">500+</div>
                  <div className="text-gray-600 font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">24/7</div>
                  <div className="text-gray-600 font-medium">Support</div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                    Comprehensive skill analysis and gap identification
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                    Intuitive dashboards and detailed reporting
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                    Personalized development recommendations
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                    Enterprise-grade security and compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Demo Modal */}
      <Dialog open={showVideoDemo} onOpenChange={setShowVideoDemo}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Play className="w-6 h-6 text-blue-600" />
              Platform Demo Video
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Watch how CreamCollar's AI-powered skill analysis platform works in action.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example&autoplay=1&mute=1"
                title="CreamCollar Platform Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Demo Features */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">What You'll See in This Demo:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">1</div>
                    Resume upload and AI skill extraction
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">2</div>
                    Real-time skill gap analysis
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">3</div>
                    Interactive dashboard walkthrough
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">4</div>
                    Personalized recommendations
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">5</div>
                    Advanced reporting features
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">6</div>
                    Team performance analytics
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
              <p className="text-gray-600 mb-4">Experience the power of AI-driven workforce intelligence for your organization.</p>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    setShowVideoDemo(false);
                    setShowContactUs(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-2 rounded-lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowVideoDemo(false)}
                className="px-6 py-2 rounded-lg border-gray-300 hover:bg-gray-50"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Contact Us Modal */}
      <Dialog open={showContactUs} onOpenChange={setShowContactUs}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              Contact Us
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Get in touch with our team to learn more about CreamCollar's AI-powered skill analysis platform.
              We're here to help you transform your workforce development strategy.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
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
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
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
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
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
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Preferred Contact Time
              </Label>
              <Select value={contactForm.preferredTime} onValueChange={(value) => setContactForm({...contactForm, preferredTime: value})}>
                <SelectTrigger className="rounded-lg border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select your preferred contact time" />
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
                Message *
              </Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                placeholder="Tell us about your specific needs, questions, or how we can help you..."
                rows={4}
                required
                className="rounded-lg border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How We Can Help:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Platform demonstration and walkthrough</li>
                <li>• Custom solution consultation</li>
                <li>• Implementation planning and support</li>
                <li>• ROI assessment and business case development</li>
                <li>• Integration guidance and technical support</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowContactUs(false)}
                className="flex-1 rounded-lg border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg"
              >
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;