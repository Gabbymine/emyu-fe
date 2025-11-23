import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VisionMissionSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="w-full bg-[#FFF9F3] py-20 md:py-28 px-6 md:px-12 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="max-w-7xl mx-auto">
        {/* VISION SECTION */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="w-12 md:w-16 h-1.5 bg-[#991B1B] mx-auto mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Tujuan kami membangun Redsphere menjadi destinasi utama
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-32">
          {/* LEFT TEXT */}
          <div data-aos="fade-right" data-aos-delay="200">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Menjadi Pilihan Utama Red Devils
            </h3>

            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Visi Redsphere adalah menjadi tempat terbaik dan terpercaya bagi para penggemar 
              Manchester United di Indonesia untuk mendapatkan merchandise official yang berkualitas tinggi.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Kami ingin menciptakan pengalaman berbelanja yang nyaman, aman, dan menyenangkan, 
              serta mempersembahkan produk yang dapat mendukung setiap Red Devil dalam menunjukkan 
              loyalitas mereka.
            </p>

            {/* TWO CARD METRICS */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#991B1B]/20"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <p className="text-4xl font-black text-[#991B1B] mb-2">100%</p>
                <p className="text-gray-700 font-semibold text-sm">Authentic</p>
                <p className="text-gray-600 text-xs mt-1">100% Original Products</p>
              </div>

              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#991B1B]/20"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <p className="text-4xl font-black text-[#991B1B] mb-2">100%</p>
                <p className="text-gray-700 font-semibold text-sm">Quality</p>
                <p className="text-gray-600 text-xs mt-1">Premium Standards</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div data-aos="fade-left" data-aos-delay="200" className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#991B1B]/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500"></div>
              <img
                src="/img/sesko.png"
                alt="Manchester United Team"
                className="rounded-3xl w-full shadow-2xl relative z-10 group-hover:scale-102 transition duration-500"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-20 h-20 border-2 border-[#991B1B] rounded-2xl opacity-50"></div>
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="border-t-2 border-[#991B1B]/20 pt-20 md:pt-28">
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <div className="w-12 md:w-16 h-1.5 bg-[#991B1B] mx-auto mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Apa yang kami lakukan untuk mencapai visi kami
            </p>
          </div>

          {/* Mission Image Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"
            data-aos="zoom-in"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src="/img/tshirt.png"
                  alt="Manchester United Merchandise"
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>
            ))}
          </div>

          {/* Mission Description */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#991B1B]/10" data-aos="fade-up">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <span className="font-bold text-[#991B1B]">Misi kami</span> adalah menyediakan merchandise Manchester United 
              original dengan harga kompetitif, memberikan layanan pelanggan terbaik, dan membangun komunitas 
              fans yang solid di seluruh Indonesia.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Setiap produk yang kami jual adalah jaminan keaslian, kualitas premium, dan nilai yang sempurna 
              untuk para Red Devils yang ingin menunjukkan kebanggaan mereka terhadap klub terbesar di dunia.
            </p>
            <p className="text-center text-[#991B1B] font-black text-2xl mt-8">
              Glory Glory Man United!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
