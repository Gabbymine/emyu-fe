import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SquareArrowOutUpRight} from "lucide-react";

export default function Collection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const items = [
    { id: 1, title: "Jersey", img: "/img/jersey.png" },
    { id: 2, title: "Jacket", img: "/img/jacket.png" },
    { id: 3, title: "Shorts", img: "/img/Short.png" },
    { id: 4, title: "Jersey", img: "/img/jersey.png" },
    { id: 5, title: "Jacket", img: "/img/jacket.png" },
    { id: 6, title: "Shorts", img: "/img/Short.png" },
  ];

  return (
    <section id="product" className="w-full bg-[#FFF9F3] py-16 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-20 h-1 bg-[#991B1B] mx-auto mb-3"></div>

      <h2
        className="text-2xl md:text-4xl font-bold text-gray-800 text-center"
        data-aos="fade-up"
      >
        Our Collection
        <p className="text-gray-600 text-xs md:text-sm mt-1 font-medium">
          Kategori - kategori yang kami miliki
        </p>
      </h2>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 max-w-6xl w-full"
        data-aos="fade-up"
      >
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {/* Card */}
            <div
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              data-aos="zoom-in"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto object-cover"
              />

              {/* Expand Icon */}
              <div className="absolute top-3 right-3  p-1 ">
                <SquareArrowOutUpRight
                  size={26}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* Title */}
            <p
              className="mt-3 text-lg font-medium text-gray-800"
              data-aos="fade-in"
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
