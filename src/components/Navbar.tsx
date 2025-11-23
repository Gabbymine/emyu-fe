import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic" });
  }, []);

  return (
    <nav
      data-aos="fade-down"
      className="w-full py-6 px-6 md:px-12 flex justify-between items-center text-white"
    >
      <div className="flex items-center">
        <img src="img/logo.png" className="w-20 sm:w-24 lg:w-25 h-auto" />
        <h1 className="font-bold text-xl tracking-wide">Redsphere</h1>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex items-center gap-30 font-medium">
        <a href="#story" className="hover:text-gray-300 transition">
          Our Story
        </a>
        <a href="#product" className="hover:text-gray-300 transition">
          Product
        </a>
        <a href="#review" className="hover:text-gray-300 transition">
          Review
        </a>
        <a href="#form" className="hover:text-gray-300 transition">
          Join Us
        </a>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop dengan blur effect */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown menu */}
          <div
            className="absolute top-24 right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-60 border border-white/20 transform transition-all duration-300 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
              <span className="font-bold text-gray-800 text-lg">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#story"
                  className="flex items-center py-3 px-4 text-gray-700 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#product"
                  className="flex items-center py-3 px-4 text-gray-700 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Product
                </a>
              </li>
              <li>
                <a
                  href="#review"
                  className="flex items-center py-3 px-4 text-gray-700 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Review
                </a>
              </li>
              <li>
                <a
                  href="#form"
                  className="flex items-center py-3 px-4 text-gray-700 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Join Us
                </a>
              </li>
            </ul>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500 font-medium">
                © 2024 Redsphere
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
