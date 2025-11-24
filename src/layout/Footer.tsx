import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const shopLinks = ["New Arrivals", "Best Seller", "Jacket", "Jersey", "Shorts/Pants"];
  const companyLinks = ["Our Story", "Careers", "Sustainability", "Press", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms & Conditions", "Return Policy", "Shipping Info"];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-white bg-gradient-to-b from-[#991B1B] via-[#7A0F0F] to-[#330909]">
      {/* Main Content */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="img/logo.png" alt="Redsphere" className="w-16 h-auto" />
              <div>
                <h3 className="text-2xl font-black">Redsphere</h3>
                <p className="text-xs text-[#FFF9F3]/70 font-semibold">Manchester United</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#FFF9F3]/90 mb-6 max-w-xs">
              Premium Manchester United merchandise untuk para Red Devils sejati. 
              Wear the glory, feel the legacy.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-black mb-5 pb-3 border-b border-white/20">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#FFF9F3]/80 hover:text-[#FFD4A3] transition duration-200 font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-black mb-5 pb-3 border-b border-white/20">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#FFF9F3]/80 hover:text-[#FFD4A3] transition duration-200 font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-black mb-5 pb-3 border-b border-white/20">
              Contact
            </h4>
            <div className="space-y-4">
              <a href="mailto:hello@redsphere.com" className="flex items-start gap-3 hover:translate-x-1 transition duration-200 group">
                <Mail size={20} className="text-[#FFD4A3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#FFF9F3]/70 uppercase">Email</p>
                  <p className="text-sm font-semibold">hello@redsphere.com</p>
                </div>
              </a>
              <a href="tel:+62812345678" className="flex items-start gap-3 hover:translate-x-1 transition duration-200 group">
                <Phone size={20} className="text-[#FFD4A3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#FFF9F3]/70 uppercase">Phone</p>
                  <p className="text-sm font-semibold">+62 812 3456 7890</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#FFD4A3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#FFF9F3]/70 uppercase">Address</p>
                  <p className="text-sm font-semibold">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-12">
          {/* Legal Links */}
          <div className="mb-8">
            <h4 className="text-lg font-black mb-4">Legal</h4>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-[#FFF9F3]/80 hover:text-[#FFD4A3] transition duration-200 font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20">
            <p className="text-sm text-[#FFF9F3]/70 font-medium">
              © {currentYear} Redsphere. Premium Manchester United Merchandise. All Rights Reserved.
            </p>  
          </div>
        </div>
      </div>
    </footer>
  );
}
