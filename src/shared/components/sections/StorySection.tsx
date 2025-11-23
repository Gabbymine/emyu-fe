import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Shield, Users, Award } from "lucide-react";

export default function StorySection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const features = [
    {
      icon: Shield,
      title: "100% Original",
      desc: "Produk official bergaransi keaslian",
    },
    {
      icon: Users,
      title: "5K+ Community",
      desc: "Red Devils terpercaya di Indonesia",
    },
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Standar internasional terjamin",
    },
  ];

  return (
    <section id="story" className="w-full bg-gradient-to-b from-[#FFF9F3] to-white py-20 md:py-28 px-6 md:px-12 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="w-12 md:w-16 h-1.5 bg-[#991B1B] mx-auto mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Memahami passion Red Devils dan memberikan yang terbaik
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Left Images */}
          <div data-aos="fade-right" className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#991B1B]/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500"></div>
              <img
                src="/img/looker.png"
                alt="Manchester United Fan"
                className="rounded-2xl shadow-2xl w-full object-cover relative z-10 group-hover:scale-102 transition duration-500"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#991B1B] rounded-2xl"></div>
            <div 
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl shadow-2xl overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="/img/stadion.png"
                alt="Old Trafford"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Text */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Lahir dari Passion
            </h3>

            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Redsphere lahir dari kecintaan mendalam terhadap Manchester United dan keinginan 
              untuk menyediakan merchandise berkualitas tinggi bagi para Red Devils di Indonesia.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Kami memahami bahwa setiap produk adalah simbol kebanggaan, loyalitas, dan passion 
              untuk klub terbesar di dunia. Itulah mengapa kami berkomitmen 100% untuk keaslian dan kualitas.
            </p>

            {/* Divider */}
            <div className="w-12 h-1 bg-gradient-to-r from-[#991B1B] to-transparent rounded-full mb-8"></div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-3 bg-[#991B1B]/10 rounded-lg flex-shrink-0">
                      <Icon size={24} className="text-[#991B1B]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{feature.title}</p>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          {[
            { number: "200+", label: "Produk", subtext: "Pilihan lengkap" },
            { number: "5K+", label: "Pelanggan Puas", subtext: "Red Devils terpercaya" },
            { number: "100%", label: "Authentic", subtext: "Jaminan keaslian" },
          ].map((stat, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="bg-gradient-to-br from-[#991B1B] to-[#7A0F0F] text-white rounded-2xl p-8 text-center shadow-xl"
            >
              <p className="text-5xl font-black mb-2">{stat.number}</p>
              <p className="text-xl font-bold mb-1">{stat.label}</p>
              <p className="text-sm opacity-90">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
