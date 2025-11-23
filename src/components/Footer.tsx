import { useEffect } from "react";
import "aos/dist/aos.css";
import { Import } from "lucide-react";
export default function Footer() {
  return (
    <footer
      className="
        w-full 
        text-white 
        px-6 
        md:px-16 
        py-12 
        bg-gradient-to-b 
        from-[#991B1B] 
        to-[#330909] 
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="img/logo.png" className=" lg:w-25 h-auto" />
            <h3 className="text-xl font-semibold">Redsphere</h3>
          </div>

          <p className="text-sm leading-relaxed opacity-90 mb-5 max-w-xs">
            Premium Manchester United merchandise untuk para Red Devils sejati.
            Wear the glory, feel the legacy.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-xl"></div>
        </div>

        {/* MIDDLE - Shop Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 border-b border-white/60 inline-block pb-1">
            Shop
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              New Arrivals
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Best Seller
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Jacket
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Jersey
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Shorts/Pants
            </li>
          </ul>
        </div>

        {/* RIGHT - Redsphare Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 border-b border-white/60 inline-block pb-1">
            Redsphare
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Our Story
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Career
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Sustainability
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Press
            </li>
            <li className="hover:opacity-100 cursor-pointer hover:text-gray-300">
              Contacs
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs opacity-80 mt-10">
        © 2025 RedSphare. Premium Football Merchandise. All Rights Reserved.
      </div>
    </footer>
  );
}
