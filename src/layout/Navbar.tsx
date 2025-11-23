import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Vision & Mission", href: "#vision" },
    { label: "Collection", href: "#product" },
    { label: "Reviews", href: "#review" },
    { label: "Join Us", href: "#form" },
  ];

  return (
    <nav
      data-aos="fade-down"
      className={`w-full px-6 md:px-12 py-4 md:py-5 flex justify-between items-center text-white sticky top-0 z-40 transition duration-300 ${
        scrolled
          ? "bg-[#991B1B]/95 backdrop-blur-md shadow-2xl"
          : "bg-[#991B1B] shadow-lg"
      }`}
    >
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <img 
          src="img/logo.png" 
          alt="Redsphere Logo" 
          className="w-16 sm:w-20 h-auto group-hover:scale-110 transition duration-300" 
        />
        <div>
          <h1 className="font-black text-lg md:text-xl tracking-wide">Redsphere</h1>
          <p className="text-xs text-[#FFF9F3]/70 font-semibold">Manchester United</p>
        </div>
      </div>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center gap-8 font-semibold text-sm md:text-base">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative hover:text-[#FFD4A3] transition duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FFD4A3] after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.label}
          </a>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-4">
        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition duration-200">
          <ShoppingBag size={20} />
        </button>
        <button className="px-6 py-2 bg-[#FFF9F3] text-[#991B1B] font-bold rounded-lg hover:bg-[#FFD4A3] transition duration-200 text-sm">
          Shop Now
        </button>
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
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-3 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition">
                Shop Now
              </button>
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
