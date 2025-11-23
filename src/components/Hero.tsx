import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      delay: 100,
    });
  }, []);

  return (
    <section className="w-full px-6 md:px-12 mt-10 grid md:grid-cols-2 gap-12 items-center min-h-[80vh] text-white">
      {/* LEFT TEXT */}
      <div data-aos="fade-right" className="order-1 md:order-2 ">
        <h1 className="text-7xl md:text-6x3 font-bold leading-tight">
          Wear the <br />
          <span className="text-white/90">Glory.</span> <br />
          Feel the <br />
          <span className="text-white/90">Legacy.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/80 max-w-md">
          Merchandise original & premium untuk para Red Devils. Tunjukkan
          kebanggaanmu dengan koleksi eksklusif dari
          <span className="font-semibold"> Redsphere</span>.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="px-6 py-3 bg-white text-[#991B1B] font-semibold rounded-md hover:bg-gray-100 transition mb-6">
            Shop Now ↗
          </button>
          <button className="px-6 py-3 border border-white/60 hover:bg-white/10 rounded-md transition mb-6">
            See Collection
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div data-aos="fade-left" className="relative order-2 md:order-2">
        <div className="p-2 rounded-xl border border-white/20 shadow-xl backdrop-blur-sm">
          <img
            src="img/amorim.png"
            className="rounded-lg w-full object-contain"
          />
        </div>

        {/* Card kecil */}
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="absolute bottom-4 left-4 bg-white text-black px-4 py-3 rounded-lg shadow-xl w-48"
        >
          <h3 className="font-semibold">Jacket</h3>
          <p className="text-xs text-gray-700 mt-1">
            This is the jacket of one of the best coaches in the world, the
            Manchester United jacket.
          </p>
        </div>
      </div>
    </section>
  );
}
