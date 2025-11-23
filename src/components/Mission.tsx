import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Mission() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="w-full bg-[#FFF9F3] py-12 px-4 flex flex-col items-center">
      <div className="w-16 md:w-20 h-1 bg-[#991B1B] mx-auto mb-3 md:mb-4"></div>

      <h2
        className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-6"
        data-aos="fade-up"
      >
        Our Mission
      </h2>

      {/* Image Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mb-6"
        data-aos="zoom-in"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src="/img/tshirt.png"
              alt="Manchester United"
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-gray-600 text-xs md:text-base mt-1 md:mt-1 font-medium px-4 md:px-0 text-center"
        data-aos="fade-up"
      >
        Menyediakan merchandise Manchester United original dengan harga
        kompetitif, <br /> layanan pelanggan terbaik, dan membangun komunitas fans yang
        solid di seluruh Indonesia. <br /> Glory Glory Man United!
      </p>
      <br /><br />

    </section>  
  );
}
