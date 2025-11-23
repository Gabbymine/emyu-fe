import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function OurStory() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <section id="story">
      <div className="w-full bg-[#FFF9F3] py-8 md:py-20 px-4 md:px-14">
        {/* TITLE dengan garis merah di atas */}
        <div className="text-center mb-8 md:mb-14" data-aos="fade-up">
          <div className="w-16 md:w-20 h-1 bg-[#991B1B] mx-auto mb-3 md:mb-4"></div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-700">
            Our Story
          </h2>
          <p className="text-gray-600 text-xs md:text-base mt-1 md:mt-1 font-medium px-4 md:px-0">
            Your Trusted Destination for Official Manchester United Merchandise
          </p>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start">
          {/* LEFT IMAGES - Layout bertumpuk */}
          <div
            className="relative w-full order-1 md:order-1"
            data-aos="fade-right"
          >
            {/* Container utama untuk gambar bertumpuk */}
            <div className="relative">
              {/* Gambar utama (looker.png) */}
              <div className="relative z-10">
                <img
                  src="/img/looker.png"
                  alt="Manchester United merchandise"
                  className="rounded-xl shadow-md w-full object-cover"
                />
                {/* Rectangle merah yang masuk ke dalam gambar */}
                <div className="absolute -top-3 -left-8 md:-top-4 md:-left-12 w-14 h-14 md:w-20 md:h-20 border-4 border-[#991B1B] rounded-xl"></div>
              </div>

              {/* Gambar kedua (stadion.png) yang bertumpuk */}
              <div className="absolute -bottom-6 -right-4 md:-bottom-40 md:-left-12 w-2/3 md:w-3/4 z-20">
                <img
                  src="/img/stadion.png"
                  alt="Old Trafford stadium"
                  className="rounded-xl shadow-lg w-full object-cover"
                />
              </div>
            </div>
            <br />
          </div>

          {/* RIGHT TEXT */}
          <div
            className="order-1 md:order-2 w-full"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <p className="text-gray-700 leading-relaxed ">
              Redsphere lahir dari kecintaan mendalam 
              terhadap Manchester United dan keinginan 
              untuk menyediakan merchandise 
              berkualitas tinggi bagi para Red
              Devils di 
              Indonesia.
            </p>
            <br />

            <p className="text-gray-700 leading-relaxed ">
              Kami menghadirkan koleksi original, modern, dan nyaman
              dipakai—mulai dari jersey, celana training, hingga jacket
              eksklusif. Kami percaya bahwa setiap produk yang kami jual bukan
              hanya pakaian, tetapi simbol kebanggaan dan passion untuk klub
              terbesar di dunia.
            </p>

            {/* DIVIDER */}
            <div
              className="my-6 md:my-8 border-t border-[#991B1B]"
              data-aos="fade-left"
              data-aos-delay="300"
            ></div>

            <div
              className="grid grid-cols-3 gap-3 md:gap-4 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold text-lg md:text-3xl text-gray-700">
                  200+
                </h3>
                <p className="text-xs text-gray-600">Happy Fans</p>
              </div>

              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold text-lg md:text-3xl text-gray-700">
                  100%
                </h3>
                <p className="text-xs text-gray-600">Original</p>
              </div>

              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold text-lg md:text-3xl text-gray-700">
                  24/7
                </h3>
                <p className="text-xs text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* VISION SECTION */}
        <div className="text-center mt-12 md:mt-24" data-aos="fade-up">
          <div className="w-16 md:w-20 h-1 bg-[#991B1B] mx-auto mb-3 md:mb-4"></div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-700">
            Our Vision
          </h2>
          <p className="text-gray-600 text-xs md:text-base mt-1 md:mt-1 font-medium px-4 md:px-0">
            Tujuan Kami Membangun Redsphere
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start mt-10 md:mt-20">
          {/* LEFT TEXT */}
          <div
            className="order-2 md:order-1 w-full"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <p className="text-gray-700 leading-relaxed ">
              Visi Redsphere adalah menjadi tempat terbaik bagi para penggemar
              Manchester United di Indonesia untuk mendapatkan merchandise
              original yang berkualitas tinggi. 
            </p>
            <br />

            <p className="text-gray-700 leading-relaxed ">
              Kami ingin menciptakan pengalaman belanja yang nyaman dan aman,
              serta mempersembahkan produk yang dapat mendukung para Red Devils
              dalam kehidupan sehari-hari.
            </p>
            

            {/* TWO CARD METRICS */}
            <div
              className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="bg-white p-3 md:p-5 rounded-xl shadow text-center border border-gray-100">
                <h3 className="font-bold text-gray-700 text-lg md:text-2xl">
                  100%
                </h3>
                <p className="text-xs md:text-sm text-gray-700">Authentic</p>
              </div>

              <div className="bg-white p-3 md:p-5 rounded-xl shadow text-center border border-gray-100">
                <h3 className="font-bold text-gray-700 text-lg md:text-2xl">
                  100%
                </h3>
                <p className="text-xs md:text-sm text-gray-700">High Quality</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="relative order-1 md:order-2 w-full mb-4 md:mb-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div
              className="absolute top-4 md:top-12 -right-4 md:-right-10 w-12 h-12 md:w-24 md:h-150 bg-[#991B1B] rounded-xl"
              data-aos="zoom-in"
              data-aos-delay="600"
            ></div>

            <img
              src="/img/sesko.png"
              alt="Manchester United team"
              className="rounded-xl w-full shadow-xl relative z-10"
              data-aos="fade-up"
              data-aos-delay="500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
