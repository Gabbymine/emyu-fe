import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, ChevronLeft, Minus, Plus } from "lucide-react";
import productService from "@/services/productService";
import type { Product } from "@/services/productService";
import { useCartStore } from "@/store/cartStore";
import { useToastContext } from "@/context/useToast";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { showToast } = useToastContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await productService.getById(id);
          setProduct(data);
          
          const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
          setIsFavorite(favorites.includes(id));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        showToast("Gagal memuat produk", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, showToast]);

  const handleAddToCart = async () => {
    if (product && quantity > 0) {
      try {
        await addItem(product.id, product.name, product.price, quantity);
        showToast(`${quantity}x ${product.name} ditambahkan ke keranjang`, "success");
        setQuantity(1);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        showToast("Gagal menambahkan ke keranjang", "error");
      }
    }
  };

  const handleToggleFavorite = () => {
    if (id) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (isFavorite) {
        const updated = favorites.filter((fav: string) => fav !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
      } else {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      setIsFavorite(!isFavorite);
      showToast(
        isFavorite ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
        "success"
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#991B1B]/20 border-t-[#991B1B] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat produk...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Produk tidak ditemukan</p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-4 px-6 py-2 bg-[#991B1B] text-white rounded-lg hover:bg-[#991B1B]/80 transition"
            >
              Kembali ke Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-[#991B1B] hover:text-[#991B1B]/80 transition mb-8 font-semibold"
        >
          <ChevronLeft size={20} />
          Kembali ke Produk
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-96">
            <div className="text-7xl">👕</div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="text-[#991B1B] text-sm font-bold uppercase tracking-widest mb-2">
                {product.category_id}
              </p>
              <h1 className="text-4xl font-bold mb-2 text-gray-900">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">(4.0) 24 Reviews</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#991B1B]">
                Rp{product.price?.toLocaleString("id-ID")}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Stock: Tersedia
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Jumlah
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <Minus size={20} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 px-4 py-2 border-2 border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#991B1B] text-white rounded-lg hover:bg-[#991B1B]/80 transition font-semibold"
              >
                <ShoppingCart size={20} />
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`px-6 py-3 rounded-lg border-2 font-semibold transition ${
                  isFavorite
                    ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorite ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pengiriman</p>
                  <p className="font-semibold text-gray-900">
                    Gratis ongkir
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Garansi</p>
                  <p className="font-semibold text-gray-900">
                    100% Original
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold mb-8">Produk Serupa</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-400">Produk {i + 1}</p>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900 mb-1">
                    Produk Serupa
                  </p>
                  <p className="text-[#991B1B] font-bold">
                    Rp{(Math.random() * 500000 + 100000).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
