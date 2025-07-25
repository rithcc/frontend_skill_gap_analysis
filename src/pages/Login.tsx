import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";

const Login = () => {
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

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const domain = selectedDomain || "creamcollar.com";

    if (!email || !password) {
      setError("Email and password are required");
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
      const response = await axios.post("http://localhost:3000/api/v1/user/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);
      
      // Set authentication state
      localStorage.setItem("isAuthenticated", "true");
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
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
          <CardHeader className="text-center py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-6 left-8 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <div className="relative z-10">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-blue-100">
                Log in to your account
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
                    placeholder="Enter your password"
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
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
