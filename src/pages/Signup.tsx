import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User, Building2, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [error, setError] = useState("");

  const domains = [{ value: "creamcollar.com", label: "CreamCollar" }];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const domain = selectedDomain || "creamcollar.com";

    if (!firstName || !lastName || !company || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    const emailDomain = email.split("@")[1];
    if (emailDomain !== domain) {
      setError(`Email domain must be @${domain}`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        company,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      
      // Set authentication state
      localStorage.setItem("isAuthenticated", "true");
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Signup failed");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-xl border-0 bg-white overflow-hidden">
          <CardHeader className="text-center py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 w-3 h-3 border border-white rounded-full"></div>
                <div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-6 right-8 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 border border-white rounded-full"></div>
                <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="relative z-10">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Join Our Platform
              </CardTitle>
              <CardDescription className="text-purple-100">
                Create your account and start your journey
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Domain Selection */}
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-sm font-medium text-gray-700">Organization</Label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your organization" />
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

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your Company Name"
                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={`your.email@${selectedDomain || 'domain.com'}`}
                    className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
