import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

interface CollectionItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
  { id: 1, title: "Jersey", image: "/img/jersey.png", category: "Apparel" },
  { id: 2, title: "Jacket", image: "/img/jacket.png", category: "Outerwear" },
  { id: 3, title: "Shorts", image: "/img/Short.png", category: "Apparel" },
  { id: 4, title: "Tracksuit", image: "/img/jersey.png", category: "Apparel" },
  { id: 5, title: "Hoodie", image: "/img/jacket.png", category: "Outerwear" },
  { id: 6, title: "Accessories", image: "/img/Short.png", category: "Gear" },
];

export default function CollectionSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleExploreCollection = () => {
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="product" className="w-full bg-white py-20 md:py-28 px-6 md:px-12 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="w-12 md:w-16 h-1.5 bg-[#991B1B] mx-auto mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
            Our Collection
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Koleksi merchandise Manchester United terlengkap dan terpercaya
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTION_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="group"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 cursor-pointer">
                {/* Image container */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#991B1B] text-white text-xs font-bold px-4 py-2 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                    <div className="w-full p-6">
                      <button 
                        onClick={() => {
                          if (isAuthenticated) {
                            navigate("/shop");
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="w-full bg-white text-[#991B1B] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#FFD4A3] transition"
                      >
                        View Details
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Premium quality merchandise for true Red Devils
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <button 
            onClick={handleExploreCollection}
            className="px-10 py-4 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition duration-300 shadow-xl flex items-center gap-2 mx-auto"
          >
            Explore Full Collection
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
