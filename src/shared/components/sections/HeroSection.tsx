import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      delay: 100,
    });
  }, []);

  const handleShopNow = () => {
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };

  const handleSeeCollection = () => {
    const element = document.getElementById("product");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center min-h-screen relative overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '0ms' }}>
      {/* Background gradient effect */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      {/* LEFT TEXT */}
      <div data-aos="fade-right" className="order-1 md:order-1 relative z-10">
        <div className="mb-6 inline-block" data-aos="fade-up" data-aos-delay="100">
          <span className="text-[#FFF9F3]/60 text-sm font-semibold uppercase tracking-widest">
            Welcome to Redsphere
          </span>
        </div>

        <h1 
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Wear the <br />
          <span className="bg-gradient-to-r from-[#FFF9F3] to-[#FFD4A3] bg-clip-text text-transparent">
            Glory
          </span>
          <br />
          Feel the <br />
          <span className="bg-gradient-to-r from-[#FFF9F3] to-[#FFD4A3] bg-clip-text text-transparent">
            Legacy
          </span>
        </h1>

        <p 
          className="mt-8 text-lg md:text-xl text-[#FFF9F3]/90 max-w-lg leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Koleksi merchandise Manchester United original & premium untuk para Red Devils. 
          Tunjukkan kebanggaan dan loyalitas Anda dengan style yang sempurna.
        </p>

        <div 
          className="mt-10 flex gap-4 flex-wrap"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <button 
            onClick={handleShopNow}
            className="group px-8 py-4 bg-[#FFF9F3] text-[#991B1B] font-bold rounded-lg hover:bg-[#FFD4A3] transition duration-300 shadow-2xl flex items-center gap-2"
          >
            Shop Now
            <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
          <button 
            onClick={handleSeeCollection}
            className="px-8 py-4 border-2 border-[#FFF9F3] text-[#FFF9F3] font-bold rounded-lg hover:bg-white/10 transition duration-300 backdrop-blur-sm"
          >
            See Collection
          </button>
        </div>

        {/* Stats */}
        <div 
          className="mt-12 flex gap-8"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div>
            <p className="text-3xl font-bold text-[#FFF9F3]">200+</p>
            <p className="text-[#FFF9F3]/70 text-sm">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#FFF9F3]">5K+</p>
            <p className="text-[#FFF9F3]/70 text-sm">Happy Fans</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#FFF9F3]">100%</p>
            <p className="text-[#FFF9F3]/70 text-sm">Original</p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div data-aos="fade-left" className="order-2 md:order-2 relative z-10">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFF9F3]/20 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition duration-500"></div>
          
          {/* Image container */}
          <div className="relative p-4 rounded-2xl border border-[#FFF9F3]/30 backdrop-blur-sm shadow-2xl overflow-hidden">
            <img
              src="img/amorim.png"
              alt="Manchester United Coach"
              className="rounded-xl w-full object-contain group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Feature card */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-gradient-to-br from-[#FFF9F3] to-[#FFD4A3] text-[#991B1B] px-6 md:px-8 py-4 md:py-5 rounded-xl shadow-2xl max-w-xs border-2 border-[#FFF9F3]/50"
          >
            <h3 className="font-bold text-sm md:text-base mb-1">Premium Jacket</h3>
            <p className="text-xs md:text-sm leading-relaxed opacity-90">
              Worn by the greatest coaches. Experience authentic Manchester United heritage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
