
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User, Building2, Globe, AlertCircle } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: () => void;
}

const AuthModal = ({ open, onOpenChange, onAuthenticated }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("signin");

  const domains = [
    { value: "creamcollar.com", label: "CreamCollar" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const domain = selectedDomain || "creamcollar.com";

    // Extract domain from email and check if it matches CreamCollar domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== domain) {
      setError(`Email domain must be @${domain}`);
      setIsLoading(false);
      return;
    }

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  // Show logo only in signin tab and only after domain is selected
  const showLogo = activeTab === "signin" && selectedDomain;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-gray-200">
        {/* Header - Show logo only in signin tab after domain selection, blue background for signup */}
        {showLogo && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/f9d831a1-39a0-40f2-911a-7ff7fcaa984b/684a6670-0774-4d17-94fa-d275c895f47a.png" 
                alt="CreamCollar - Crafting Futures" 
                className="h-12 w-auto"
              />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Welcome to CreamCollar
              </DialogTitle>
            </DialogHeader>
          </div>
        )}

        {/* Blue background for Create Account tab */}
        {activeTab === "signup" && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Create Account
              </DialogTitle>
            </DialogHeader>
          </div>
        )}

        {/* Simple header for signin when no domain selected */}
        {activeTab === "signin" && !selectedDomain && (
          <div className="p-8 text-center border-b border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Sign In
              </DialogTitle>
            </DialogHeader>
          </div>
        )}

        <div className="p-8">
          <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-gray-700 font-medium">Organization Domain</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                      <SelectTrigger className="pl-10 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Select your organization domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain.value} value={domain.value}>
                            {domain.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Show email field only after domain is selected */}
                {selectedDomain && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email @creamcollar.com"
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Signing in...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-700 font-medium">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company name"
                      className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-gray-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signupEmail"
                      name="email"
                      type="email"
                      placeholder="Enter your work email"
                      className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signupPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;