import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Loader, Heart, Star, Grid, List, Search } from "lucide-react";
import productService from "../../../services/productService";
import type { Product } from "../../../services/productService";
import { useAuthStore } from "../../../store/authStore";
import { useCartStore } from "../../../store/cartStore";
import { useToastContext } from "../../../context/useToast";
import Navbar from "../../../layout/Navbar";

export default function ShopPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { addItem, items: cartItems } = useCartStore();
  const { showToast } = useToastContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, navigate]);

  // Handle search
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // newest - keep original order
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy, products]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product.id, product.name, product.price, 1);
      setAddedToCart(product.id);
      showToast(`${product.name} ditambahkan ke keranjang`, "success");
      setTimeout(() => setAddedToCart(null), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      showToast("Gagal menambahkan ke keranjang", "error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
              <div data-aos="fade-right" className="flex-1">
                <div className="mb-4 inline-block" data-aos="fade-up" data-aos-delay="100">
                  <span className="text-[#991B1B] text-xs font-bold uppercase tracking-widest">
                    🛍️ Shop Our Collection
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                  <span className="text-[#991B1B]">
                    Premium
                  </span>
                  <br />
                  <span className="text-gray-900">Manchester United</span>
                  <br />
                  <span className="text-[#991B1B]">
                    Gear
                  </span>
                </h1>
                <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                  Authentic merchandise crafted for true Red Devils supporters. Quality you can trust.
                </p>
              </div>
              <button
                onClick={() => navigate("/cart")}
                data-aos="fade-up"
                data-aos-delay="200"
                className="px-8 py-4 bg-[#991B1B] text-white font-bold rounded-xl hover:bg-[#7A0F0F] transition duration-300 flex items-center gap-3 shadow-lg hover:scale-105 w-full sm:w-auto justify-center whitespace-nowrap group"
              >
                <ShoppingCart size={22} className="group-hover:-translate-y-1 transition" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white/80">My Cart</div>
                  <div className="text-lg font-black">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</div>
                </div>
              </button>
            </div>

            {/* Controls Section - Modern Design */}
            <div className="space-y-4">
              {/* Search Bar with Enhancement */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute inset-0 bg-gradient-to-r from-[#991B1B]/20 to-transparent rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#991B1B] z-10" size={20} />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-base"
                  />
                </div>
              </div>

              {/* Toolbar - Redesigned */}
              <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 shadow-md" data-aos="fade-up" data-aos-delay="150">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#991B1B]/10 border border-[#991B1B]/30 rounded-lg">
                    <span className="text-sm font-bold text-[#991B1B]">Sort</span>
                    <div className="w-px h-5 bg-[#991B1B]/20"></div>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition hover:border-[#991B1B]/50 cursor-pointer font-medium"
                  >
                    <option value="newest">⭐ Newest Arrivals</option>
                    <option value="price-low">💰 Price: Low to High</option>
                    <option value="price-high">💸 Price: High to Low</option>
                    <option value="name">🔤 Name: A to Z</option>
                  </select>
                </div>

                {/* View Mode Toggle - Enhanced */}
                <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-lg p-1.5">
                  <span className="text-xs font-bold text-[#991B1B] px-2">View</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 rounded-lg transition duration-300 font-semibold ${
                      viewMode === "grid"
                        ? "bg-[#991B1B] text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 rounded-lg transition duration-300 font-semibold ${
                      viewMode === "list"
                        ? "bg-[#991B1B] text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Product Count Badge */}
                <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#991B1B]/10 to-transparent rounded-lg border-2 border-[#991B1B]/30">
                  <span className="text-sm font-bold text-[#991B1B]">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#991B1B]/20 rounded-full blur-2xl"></div>
                <Loader className="animate-spin text-[#991B1B] relative" size={56} />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 mb-2">Loading Amazing Products</p>
                <p className="text-gray-500 text-sm">Please wait while we prepare our collection...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-40 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="text-8xl mb-6 animate-bounce">📦</div>
              <p className="text-3xl font-black text-gray-900 mb-3">
                {searchQuery ? "No Products Found" : "No Products Available"}
              </p>
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                {searchQuery
                  ? "We couldn't find any products matching your search. Try adjusting your keywords."
                  : "Our collection is being updated. Check back soon for amazing new gear!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-8 py-3 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition inline-block"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View - Modern Card Design */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 50}
                  className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#991B1B] transition-all duration-400 shadow-md hover:shadow-xl hover:-translate-y-2"
                >
                  {/* Product Image Area - Enhanced */}
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-gray-200">
                    <div className="text-7xl opacity-50 group-hover:opacity-70 group-hover:scale-110 transition duration-400">👕</div>
                    
                    {/* Badge */}
                    {product.is_customizable && (
                      <div className="absolute top-4 right-4 bg-[#991B1B] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        ✨ Customizable
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      className="absolute top-4 left-4 p-2.5 bg-white/80 hover:bg-[#991B1B] rounded-full transition duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                      title="Add to wishlist"
                    >
                      <Heart size={20} className="text-[#991B1B] group-hover:text-white group-hover:fill-white" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Tag */}
                    <div className="mb-2">
                      <span className="text-xs font-bold text-[#991B1B] uppercase tracking-widest">
                        Apparel
                      </span>
                    </div>

                    <h3 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#991B1B] transition duration-300 text-gray-900 cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                      {product.description || "Premium quality Manchester United merchandise"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < 4
                                ? "fill-[#991B1B] text-[#991B1B]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">(4.0)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Price</p>
                      <p className="text-3xl font-black text-[#991B1B]">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2.5 text-base group/btn ${
                        addedToCart === product.id
                          ? "bg-green-500 text-white shadow-lg scale-95"
                          : "bg-[#991B1B] text-white hover:bg-[#7A0F0F] hover:shadow-xl hover:-translate-y-1 shadow-lg"
                      }`}
                    >
                      <ShoppingCart size={18} className="group-hover/btn:animate-bounce" />
                      {addedToCart === product.id ? "✓ Added to Cart!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View - Modern Table Design */
            <div className="space-y-4">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6 flex gap-6 items-start hover:border-[#991B1B] transition-all duration-400 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="hidden lg:flex w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl items-center justify-center flex-shrink-0">
                    <div className="text-6xl opacity-50">👕</div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-[#991B1B] uppercase tracking-widest">
                            Apparel
                          </span>
                          {product.is_customizable && (
                            <span className="px-2 py-0.5 bg-[#991B1B]/10 text-[#991B1B] rounded-full text-xs font-bold border border-[#991B1B]/30">
                              ✨ Custom
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold truncate group-hover:text-[#991B1B] transition text-gray-900">{product.name}</h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                          {product.description || "Premium quality apparel"}
                        </p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-black text-[#991B1B] flex-shrink-0">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < 4
                                ? "fill-[#991B1B] text-[#991B1B]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">(4.0)</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-6 py-2.5 rounded-lg font-bold transition duration-300 flex items-center gap-2.5 ${
                          addedToCart === product.id
                            ? "bg-green-500/90 text-white shadow-lg"
                            : "bg-[#991B1B] text-white hover:bg-[#7A0F0F] hover:shadow-lg shadow-md"
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {addedToCart === product.id ? "✓ Added" : "Add to Cart"}
                      </button>
                      <button
                        className="p-2.5 bg-gray-100 hover:bg-[#991B1B]/10 rounded-lg transition duration-300"
                        title="Add to wishlist"
                      >
                        <Heart size={18} className="text-[#991B1B] hover:fill-[#991B1B]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
