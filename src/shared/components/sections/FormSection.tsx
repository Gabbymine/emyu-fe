import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin, Instagram, MessageCircle, Facebook, Music } from "lucide-react";

export default function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="contact" className="w-full opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
      {/* Main Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center py-16 md:py-0 bg-[##991B1B] text-white">
        {/* LEFT SIDE - IMAGE */}
        <div className="relative h-72 md:h-96 lg:h-screen" data-aos="fade-right">
          <img
            src="/img/amad.png"
            alt="Manchester United Player"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
        </div>

        {/* RIGHT SIDE - FORM & INFO */}
        <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12" data-aos="fade-left">
          {/* Header & Form Section */}
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">
              We'd Love To Invite You
            </h2>
            <p className="text-white/70 mb-8 text-sm md:text-base leading-relaxed">
              Bergabunglah dengan Redsphere, mulai jelajahi dan beli produk kami sekarang!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
              {/* Success Message */}
              {submitted && (
                <div className="p-3 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm font-semibold mb-4">
                  Terima kasih! Kami akan segera menghubungi Anda.
                </div>
              )}

              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Pesan"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-[#1a1a1a] font-bold text-sm hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20"
                >
                  Bergabung
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-t border-white/20">
              {/* Call Center */}
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-sm font-black mb-2 text-white">Call Center</h3>
                <p className="text-white/80 text-xs flex items-center gap-2">
                  <Phone size={14} />
                  081122223309
                </p>
              </div>

              {/* Location */}
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-sm font-black mb-2 text-white">Our Location</h3>
                <p className="text-white/80 text-xs flex items-center gap-2">
                  <MapPin size={14} />
                  Indonesia, Jakarta
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Email */}
              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-sm font-black mb-2 text-white">Gmail</h3>
                <p className="text-white/80 text-xs flex items-center gap-2">
                  <Mail size={14} />
                  Retta@Gmail.Com
                </p>
              </div>

              {/* Social Media */}
              <div data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-sm font-black mb-2 text-white">Social Media</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="p-1.5 hover:bg-white/10 rounded transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} className="text-white" />
                  </a>
                  <a
                    href="#"
                    className="p-1.5 hover:bg-white/10 rounded transition-all"
                    aria-label="TikTok"
                  >
                    <Music size={16} className="text-white" />
                  </a>
                  <a
                    href="#"
                    className="p-1.5 hover:bg-white/10 rounded transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} className="text-white" />
                  </a>
                  <a
                    href="#"
                    className="p-1.5 hover:bg-white/10 rounded transition-all"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={16} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Section */}
      <div className="w-full bg-white py-20 md:py-32 px-6 md:px-12 text-center">
        <p className="text-[#991B1B] text-xl md:text-2xl font-semibold">
          Red isn't just a color.
        </p>
        <h3 className="text-4xl md:text-6xl font-black text-[#991B1B] mt-4 leading-tight">
          It's the statement you make <br className="hidden md:block" /> without saying a word
        </h3>
      </div>
    </section>
  );
}
