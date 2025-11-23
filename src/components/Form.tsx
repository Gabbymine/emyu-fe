import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

export default function Form() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section id="form" className="w-full bg-[#FFF9F3] pt-10 pb-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg">
        {/* LEFT IMAGE */}
        <div className="w-full h-[500x] md:h-[600px]" data-aos="fade-right">
          <img
            src="/img/amad.png"
            alt="Join Redsphere"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div
          className="bg-[#991B1B] text-white px-6 md:px-8 py-10"
          data-aos="fade-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">
            We’d Love To Invite You
          </h2>

          <p className="text-sm opacity-90 mb-6">
            Bergabunglah dengan Redsphare, mulai jelajahi dan beli produk kami,
            sekarang!
          </p>

          {/* FORM */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nama Lengkap"
              required
              className="w-full px-4 py-2.5 rounded-md bg-white/20 text-white placeholder-white/80 focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-md bg-white/20 text-white placeholder-white/80 focus:outline-none"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-md bg-white/20 text-white placeholder-white/80 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-12 top-1/2  -translate-y-5 text-white/80 hover:text-white"
            >
              {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
            </button>

            <button className="w-full bg-white text-[#991B1B] py-2.5 rounded-md font-semibold hover:bg-gray-200 transition">
              Bergabung
            </button>
          </div>

          {/* CONTACT SECTION */}
          <div className="grid grid-cols-2 mt-8 gap-5 text-sm">
            <div>
              <p className="font-semibold">Call Center</p>
              <p className="opacity-90 text-xs">08112222309</p>

              <p className="font-semibold mt-3">Gmail</p>
              <p className="opacity-90 text-xs">Rettaa@gmail.com</p>
            </div>

            <div>
              <p className="font-semibold">Our Location</p>
              <p className="opacity-90 text-xs">Indonesia, Jakarta</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div className="text-center mt-10 px-6" data-aos="fade-up">
        <p className="text-base md:text-2xl font-bold text-[#991B1B]">
          Red isn’t just a color.
        </p>
        <p className="text-lg md:text-xl font-bold text-gray-800">
          It’s the statement you make without saying a word.
        </p>
      </div>
    </section>
  );
}
