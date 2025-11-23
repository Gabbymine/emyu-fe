import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Review() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const reviews = [
    {
      text: "“Bener-bener kerasa original. Jerseynya beda banget sama yang KW—bahannya lebih ringan, lebih adem, dan detail patch-nya rapi. Dipake nonton atau daily tetep nyaman.”",
      name: "Raisa",
      city: "Jakarta",
    },
    {
      text: "“Kualitas jaketnya premium parah. Materialnya tebel tapi nggak bikin gerah. Resleting halus, bordirannya detail, dan warnanya tegas. Berasa pakai brand internasional.”",
      name: "Keysa",
      city: "Jakarta",
    },
    {
      text: "“Detail kecilnya bikin jatuh cinta. Logo embossed, stitching rapi, dan warna merahnya solid banget. Kelihatan ori, berkelas, dan tahan lama.”",
      name: "Aryo",
      city: "Depok",
    },
    {
      text: "“Detail kecilnya bikin jatuh cinta. Logo embossed, stitching rapi, dan warna merahnya solid banget. Kelihatan ori, berkelas, dan tahan lama.”",
      name: "Aryo",
      city: "Depok",
    },
    {
      text: "“Detail kecilnya bikin jatuh cinta. Logo embossed, stitching rapi, dan warna merahnya solid banget. Kelihatan ori, berkelas, dan tahan lama.”",
      name: "Gabby",
      city: "Bandung",
    },
    {
      text: "“Bener-bener kerasa original. Jerseynya beda banget sama yang KW—bahannya lebih ringan, lebih adem, dan detail patch-nya rapi. Dipake nonton atau daily tetep nyaman.”",
      name: "Zaviq",
      city: "Jakarta",
    },
  ];

  return (
    <section
      id="review"
      className="w-full bg-[#FFF9F3] py-16 px-4 flex flex-col items-center"
    >
      {/* Divider */}
      <div className="w-20 h-1 bg-[#991B1B] mx-auto mb-3"></div>

      {/* Header */}
      <h2
        className="text-2xl md:text-4xl font-bold text-gray-800 text-center"
        data-aos="fade-up"
      >
        What People Said?
        <p className="text-gray-600 text-xs md:text-sm mt-1 font-medium">
          Kata orang-orang yang sudah berbelanja bersama kami
        </p>
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {reviews.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="
              bg-white 
              rounded-xl 
              border-b-4 border-l-4 border-[#991B1B] p-4 
              shadow-md 
              relative 
              transition-all 
              duration-300 
              hover:shadow-lg
              "
          >
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              {item.text}
            </p>
            <p className="font-semibold text-gray-800">
              — {item.name}, {item.city}
            </p>
          </div>
        ))}
      </div>

      {/* Rating Card */}
      <div
        className="
        bg-[#991B1B] 
        text-white 
        mt-12 
        w-full 
        max-w-[330px] 
        rounded-2xl 
        py-6 
        px-6 
        text-center 
        shadow-xl 
        "
        data-aos="zoom-in"
      >
        <p className="text-4xl font-bold leading-none">5.0</p>

        <div className="flex justify-center gap-1 my-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-white text-xl">
                ★
              </span>
            ))}
        </div>

        <p className="text-sm opacity-90 -mt-1">Based on 2000+ reviews</p>
        <p className="text-3xl font-bold leading-none">98%</p>
        <p className="text-sm opacity-90">Customer Satisfaction</p>

        <div className="w-full w-[4px] bg-white/30 my-6"></div>
      </div>
    </section>
  );
}
