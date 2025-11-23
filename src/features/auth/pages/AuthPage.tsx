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
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <img
          src="/img/stadion.png"
          alt="Stadium"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        {/* Animated orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-12 transform transition-all duration-500" style={{ animation: isLogin ? 'fadeIn 0.6s ease-out' : 'fadeIn 0.6s ease-out' }}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-900 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/50 p-2">
                <img 
                  src="/img/logo.png" 
                  alt="Redsphere Logo"
                  className="w-full h-full object-contain "
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
              Redsphere
            </h1>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase">Manchester United Official Store</p>
          </div>

          {/* Card - Login Mode */}
          {isLogin && (
            <div className="backdrop-blur-2xl bg-white/5 rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 transform animate-fade-in">
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Welcome Back
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                  Access your Redsphere account
                </p>
              </div>

              {error && (
                <div className="bg-red-500/15 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 animate-pulse">
                  <span className="text-lg">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2.5 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2.5 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300 p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3.5 rounded-xl hover:from-red-700 hover:to-red-800 hover:shadow-2xl hover:shadow-red-600/40 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="text-white/50 text-xs font-medium">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Toggle to Register */}
              <div className="text-center">
                <p className="text-white/70 text-sm mb-4">
                  New to Redsphere?
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="w-full px-6 py-3 border-2 border-white/20 text-white font-bold rounded-xl hover:border-red-400/50 hover:bg-white/5 transition-all duration-300 text-sm tracking-wide"
                >
                  Create an Account
                </button>
              </div>

              {/* Footer text */}
              <p className="text-center text-white/50 text-xs mt-8 leading-relaxed">
                By signing in, you agree to our <span className="text-red-400 hover:text-red-300 cursor-pointer transition-colors">Terms & Conditions</span>
              </p>
            </div>
          )}

          {/* Card - Register Mode */}
          {!isLogin && (
            <div className="backdrop-blur-2xl bg-white/5 rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 max-h-[90vh] overflow-y-auto scrollbar-hide animate-fade-in">
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Join Redsphere
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                  Create your account to start shopping
                </p>
              </div>

              {error && (
                <div className="bg-red-500/15 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 animate-pulse">
                  <span className="text-lg">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {validationError && (
                <div className="bg-red-500/15 backdrop-blur-sm border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 animate-pulse">
                  <span className="text-lg">⚠️</span>
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300 p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-white/90 font-semibold text-sm mb-2 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400/60 group-focus-within:text-red-400 transition-colors duration-300" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-1 focus:ring-red-400/20 transition-all duration-300 text-white placeholder-white/40 font-medium text-sm backdrop-blur-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300 p-1"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3.5 rounded-xl hover:from-red-700 hover:to-red-800 hover:shadow-2xl hover:shadow-red-600/40 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="text-white/50 text-xs font-medium">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Toggle to Login */}
              <div className="text-center">
                <p className="text-white/70 text-sm mb-4">
                  Already have an account?
                </p>
                <button
                  onClick={toggleAuthMode}
                  className="w-full px-6 py-3 border-2 border-white/20 text-white font-bold rounded-xl hover:border-red-400/50 hover:bg-white/5 transition-all duration-300 text-sm tracking-wide"
                >
                  Sign In
                </button>
              </div>

              {/* Footer text */}
              <p className="text-center text-white/50 text-xs mt-8 leading-relaxed">
                By creating an account, you agree to our <span className="text-red-400 hover:text-red-300 cursor-pointer transition-colors">Terms & Conditions</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
