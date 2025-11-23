import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading, error, clearError } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData.email, formData.password);
      const from = (location.state as any)?.from?.pathname || "/shop";
      navigate(from);
    } catch {
      // Error is handled by the store
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError("");

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );
      navigate("/shop");
    } catch {
      // Error is handled by the store
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError("");
    clearError();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 blur">
        <img
          src="/img/stadion.png"
          alt="Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Branding */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-white mb-2">Redsphere</h1>
            <p className="text-[##991B12] text-sm font-semibold">Manchester United</p>
          </div>

          {/* Card - Login Mode */}
          {isLogin && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 animate-fade-in">
              <h2 className="text-3xl font-black text-white text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-center text-white/80 mb-8 text-sm">
                Sign in to your Redsphere account
              </p>

              {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-semibold flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-3">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-3">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#991B1B] to-[#7A0F0F] text-white font-bold py-3 rounded-xl hover:shadow-2xl hover:shadow-[#991B1B]/50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Toggle to Register */}
              <div className="mt-8 text-center">
                <p className="text-white/80 text-sm mb-3">
                  Don't have an account?
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="px-6 py-2 border-2 border-white/40 text-white font-bold rounded-lg hover:border-[#FFD4A3] hover:text-[#FFD4A3] transition"
                >
                  Create Account
                </button>
              </div>

              {/* Footer text */}
              <p className="text-center text-white/60 text-xs mt-8">
                By signing in, you agree to our Terms & Conditions
              </p>
            </div>
          )}

          {/* Card - Register Mode */}
          {!isLogin && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 animate-fade-in max-h-96 overflow-y-auto">
              <h2 className="text-3xl font-black text-white text-center mb-2">
                Join Redsphere
              </h2>
              <p className="text-center text-white/80 mb-8 text-sm">
                Create an account to start shopping
              </p>

              {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-semibold flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  {error}
                </div>
              )}

              {validationError && (
                <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-semibold flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  {validationError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-2">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium text-sm"
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-2 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white/90 font-bold text-sm mb-2">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD4A3] group-focus-within:text-white transition" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-2 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-[#FFD4A3] focus:bg-white/20 transition duration-300 text-white placeholder-white/50 font-medium text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#991B1B] to-[#7A0F0F] text-white font-bold py-2 rounded-xl hover:shadow-2xl hover:shadow-[#991B1B]/50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-sm"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Toggle to Login */}
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm mb-3">
                  Already have an account?
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="px-6 py-2 border-2 border-white/40 text-white font-bold rounded-lg hover:border-[#FFD4A3] hover:text-[#FFD4A3] transition text-sm"
                >
                  Sign In
                </button>
              </div>

              {/* Footer text */}
              <p className="text-center text-white/60 text-xs mt-6">
                By creating an account, you agree to our Terms & Conditions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
