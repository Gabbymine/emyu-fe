import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import productService from "@/services/productService";
import type { Product } from "@/services/productService";
import { useCartStore } from "@/store/cartStore";
import { useToastContext } from "@/context/useToast";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { showToast } = useToastContext();
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(savedFavorites);

        // Fetch all products and filter by favorites
        const allProducts = await productService.getAll();
        const favoriteProducts = allProducts.filter((p) =>
          savedFavorites.includes(p.id)
        );
        setProducts(favoriteProducts);
      } catch (error) {
        console.error("Failed to load favorites:", error);
        showToast("Gagal memuat favorit", "error");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [showToast]);

  const handleRemoveFavorite = (productId: string) => {
    const updated = favorites.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setProducts(products.filter((p) => p.id !== productId));
    showToast("Dihapus dari favorit", "success");
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product.id, product.name, product.price, 1);
      showToast(`${product.name} ditambahkan ke keranjang`, "success");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      showToast("Gagal menambahkan ke keranjang", "error");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorit Saya</h1>
          <p className="text-gray-600">
            {products.length} produk di wishlist Anda
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#991B1B]/20 border-t-[#991B1B] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat favorit...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Belum ada favorit
            </h2>
            <p className="text-gray-600 mb-6">
              Mulai tambahkan produk favorit Anda untuk melihatnya di sini
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#991B1B] text-white rounded-lg hover:bg-[#991B1B]/80 transition font-semibold"
            >
              Jelajahi Produk
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#991B1B] transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition duration-300">
                    👕
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="font-bold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-[#991B1B] transition"
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-[#991B1B] mb-4">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#991B1B] text-white rounded-lg hover:bg-[#991B1B]/80 transition font-semibold text-sm"
                    >
                      <ShoppingCart size={16} />
                      Tambah ke Keranjang
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(product.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold text-sm"
                    >
                      <Trash2 size={16} />
                      Hapus dari Favorit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
