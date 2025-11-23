import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Quote } from "lucide-react";

interface Review {
  text: string;
  name: string;
  city: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    text: "Kualitas jersey ini luar biasa! Bahannya nyaman, warnanya tahan lama, dan detail patch sangat rapi. Benar-benar worth it untuk Red Devils!",
    name: "Raisa",
    city: "Jakarta",
    rating: 5,
  },
  {
    text: "Jaketnya premium banget. Material tebal tapi fleksibel, resleting smooth, dan bordir detailnya perfect. Packaging juga rapih dan aman.",
    name: "Mitaa",
    city: "Depok",
    rating: 5,
  },
  {
    text: "Ini adalah merchandise Manchester United terbaik yang pernah saya beli. Logo embossed, stitching rapi, dan warna merah solid. Recommended!",
    name: "Fatih",
    city: "Jakarta",
    rating: 5,
  },
  {
    text: "Pengalaman belanja yang sangat memuaskan dari awal hingga akhir. Customer service responsif, produk sesuai foto, pengiriman cepat.",
    name: "Aryo",
    city: "Bandung",
    rating: 5,
  },
  {
    text: "Redsphere adalah tempat terbaik untuk membeli merchandise Manchester United original. Harga kompetitif dengan kualitas internasional.",
    name: "Gabby",
    city: "Surabaya",
    rating: 5,
  },
  {
    text: "Saya sangat puas dengan layanan Redsphere. Produk original, harga adil, dan komunitas Red Devils yang solid. Keep up the good work!",
    name: "Zaviq",
    city: "Jakarta",
    rating: 5,
  },
];

export default function ReviewSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="review" className="w-full bg-gradient-to-b from-white to-[#FFF9F3] py-20 md:py-28 px-6 md:px-12 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="w-12 md:w-16 h-1.5 bg-[#991B1B] mx-auto mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
            Customer Testimonials
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Apa kata Red Devils yang sudah berbelanja bersama kami
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-[#991B1B]/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#991B1B] text-[#991B1B]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-base">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-gray-600 text-sm">{review.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Card */}
        <div
          className="bg-gradient-to-r from-[#991B1B] via-[#7A0F0F] to-[#991B1B] text-white rounded-3xl p-10 md:p-16 shadow-2xl"
          data-aos="zoom-in"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-3">
                Trusted by Red Devils
              </h3>
              <p className="text-[#FFF9F3]/90 text-lg leading-relaxed">
                Lebih dari 5000 pelanggan setia telah mempercayai Redsphere 
                untuk kebutuhan merchandise Manchester United mereka.
              </p>
            </div>

            {/* Right - Rating */}
            <div className="flex items-center gap-8">
              <div className="text-6xl md:text-7xl font-black">4.9</div>
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      className="fill-[#FFF9F3] text-[#FFF9F3]"
                    />
                  ))}
                </div>
                <p className="text-[#FFF9F3]/80 text-sm font-semibold">
                  1000+ Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
