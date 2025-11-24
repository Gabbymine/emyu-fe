import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X, ShoppingBag, LogOut, ChevronDown, User, Package, Heart } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const profileBtn = (e.target as HTMLElement).closest('[data-profile-button]');
      const profileDropdown = (e.target as HTMLElement).closest('[data-profile-dropdown]');
      
      if (!profileBtn && !profileDropdown && profileOpen) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileOpen]);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Vision & Mission", href: "#vision" },
    { label: "Collection", href: "#product" },
    { label: "Reviews", href: "#review" },
    { label: "Join Us", href: "#form" },
  ];

  const handleShopNow = () => {
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav
      data-aos="fade-down"
      className={`w-full px-6 md:px-12 py-3 md:py-4 flex justify-between items-center text-white sticky top-0 z-40 transition duration-300 ${
        scrolled
          ? "bg-[#991B1B]/90 backdrop-blur-xl shadow-lg border-b border-[#FFD4A3]/10"
          : "bg-[#991B1B]/85 backdrop-blur-sm"
      }`}
    >
      {/* Logo & Brand */}
      <div 
        className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition duration-300"
        onClick={() => navigate("/")}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFD4A3]/20 rounded-lg blur-lg group-hover:blur-xl transition duration-300"></div>
          <img 
            src="img/logo.png" 
            alt="Redsphere Logo" 
            className="w-14 sm:w-16 h-auto relative z-10 group-hover:scale-110 transition duration-300" 
          />
        </div>
        <div>
          <h1 className="font-black text-lg md:text-xl tracking-wider">Redsphere</h1>
          <p className="text-xs text-[#FFD4A3]/70 font-semibold tracking-widest uppercase">Manchester United</p>
        </div>
      </div>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center gap-6 font-medium text-sm">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative py-2 px-1 group hover:text-[#FFD4A3] transition duration-200"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD4A3] to-[#FFF9F3] rounded-full group-hover:w-full transition-all duration-300"></span>
          </a>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-3">
        <button 
          onClick={() => navigate("/wishlist")}
          className="p-2 bg-white/10 hover:bg-[#FFD4A3]/20 rounded-lg transition duration-200 group hover:scale-110"
        >
          <Heart size={18} className="text-[#FFD4A3] group-hover:text-[#FFF9F3] transition" />
        </button>
        
        <button 
          onClick={() => navigate("/cart")}
          className="p-2 bg-white/10 hover:bg-[#FFD4A3]/20 rounded-lg transition duration-200 relative group hover:scale-110"
        >
          <ShoppingBag size={18} className="text-[#FFD4A3] group-hover:text-[#FFF9F3] transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#FFD4A3] to-[#FFB380] text-[#991B1B] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
        
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              data-profile-button
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/15 rounded-lg transition duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD4A3] to-[#FFB380] rounded-full flex items-center justify-center text-[#991B1B] font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <ChevronDown size={16} className="text-white/60 group-hover:text-white transition" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50" data-profile-dropdown>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm text-gray-800 font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-800 hover:bg-[#991B1B] hover:text-white transition flex items-center gap-2 text-sm"
                >
                  <User size={16} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-800 hover:bg-[#991B1B] hover:text-white transition flex items-center gap-2 text-sm"
                >
                  <Package size={16} />
                  My Orders
                </button>
                
                <button
                  onClick={() => {
                    navigate("/cart");
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-800 hover:bg-[#991B1B] hover:text-white transition flex items-center gap-2 text-sm relative"
                >
                  <ShoppingBag size={16} />
                  <span>My Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                      setProfileOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition flex items-center gap-2 text-sm font-semibold"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleShopNow}
            className="px-4 py-2 bg-gradient-to-r from-[#FFF9F3] to-[#FFD4A3] text-[#991B1B] font-semibold rounded-lg hover:shadow-lg transition duration-200 text-xs hover:scale-105 shadow-md"
          >
            Shop Now
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition" 
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown menu */}
          <div
            className="absolute top-24 right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-72 border border-white/20 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <span className="font-black text-gray-900 text-xl">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col gap-3 mb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center py-3 px-4 text-gray-800 hover:bg-[#991B1B] hover:text-white rounded-xl transition-all duration-200 font-semibold group"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-2 h-2 bg-[#991B1B] rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {isAuthenticated && cartCount > 0 && (
                <button
                  onClick={() => {
                    navigate("/cart");
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-[#FFD4A3] text-[#991B1B] font-bold rounded-lg hover:bg-[#FFF9F3] transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  View Cart ({cartCount})
                </button>
              )}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-gray-800 font-semibold text-sm">
                    Logged in as: {user?.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleShopNow}
                  className="w-full px-4 py-3 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition"
                >
                  Shop Now
                </button>
              )}
              <p className="text-center text-xs text-gray-600 font-medium mt-3">
                © 2025 Redsphere
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
