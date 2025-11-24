import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { useCartStore } from "../../../store/cartStore";
import Navbar from "../../../layout/Navbar";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { items, total, fetchCart, updateItem, removeItem, clearCart } = useCartStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isAuthenticated, navigate, fetchCart]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeItem(productId);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10" data-aos="fade-down">
            <button
              onClick={() => navigate("/shop")}
              className="p-2.5 hover:bg-gray-100 rounded-lg transition duration-300 hover:scale-110 group border-2 border-gray-200"
              title="Back to shop"
            >
              <ArrowLeft size={20} className="text-[#991B1B] group-hover:text-[#7A0F0F] transition" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                <span className="text-[#991B1B]">Shopping</span> Cart
              </h1>
              <p className="text-gray-500 text-sm mt-1">Review and manage your items</p>
            </div>
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 shadow-md" data-aos="zoom-in">
              <div className="mb-6 inline-block p-5 bg-[#991B1B]/10 rounded-full">
                <ShoppingBag className="text-[#991B1B]" size={56} />
              </div>
              <h2 className="text-2xl font-black mb-2 text-gray-900">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Discover amazing Manchester United products
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="px-8 py-3 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition duration-300 inline-block shadow-lg hover:scale-105 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Cart Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={item.product_id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                    className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-[#991B1B] transition-all duration-300 hover:shadow-lg flex gap-5 items-start group"
                  >
                    {/* Image Placeholder */}
                    <div className="hidden md:flex w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg items-center justify-center flex-shrink-0">
                      <div className="text-4xl opacity-50 group-hover:opacity-70 transition">👕</div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#991B1B] transition">{item.product_name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.product_id)}
                          className="p-2 text-gray-400 hover:bg-red-50 hover:text-[#991B1B] rounded-lg transition flex-shrink-0 hover:scale-110"
                          title="Remove from cart"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <p className="text-2xl font-black text-[#991B1B] mb-4">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border-2 border-gray-200">
                          <button
                            onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                            className="p-1.5 hover:bg-[#991B1B]/10 rounded-lg transition text-xs"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.product_id, parseInt(e.target.value) || 1)
                            }
                            className="w-12 bg-white border-0 rounded-lg px-2 py-1 text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#991B1B] text-sm"
                            min="1"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                            className="p-1.5 hover:bg-[#991B1B]/10 rounded-lg transition text-xs"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500 font-semibold">
                          Subtotal: <span className="text-[#991B1B] font-black">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-7 sticky top-24 shadow-lg" data-aos="fade-left">
                  <h2 className="text-2xl font-black mb-7 text-gray-900">
                    Order <span className="text-[#991B1B]">Summary</span>
                  </h2>

                  {/* Items Count */}
                  <div className="flex justify-between mb-4 pb-4 border-b-2 border-gray-200 text-sm">
                    <span className="text-gray-600 font-semibold">Items ({items.length})</span>
                    <span className="font-black text-gray-900">
                      Rp {items
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between mb-4 pb-4 border-b-2 border-gray-200 text-sm">
                    <span className="text-gray-600 font-semibold">Shipping</span>
                    <span className="font-black text-green-600">Free</span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between mb-6 pb-6 border-b-2 border-gray-200 text-sm">
                    <span className="text-gray-600 font-semibold">Tax (10%)</span>
                    <span className="font-black text-gray-900">
                      Rp {Math.round(total * 0.1).toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between mb-8 bg-[#991B1B]/5 p-4 rounded-lg border-2 border-[#991B1B]/20">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-[#991B1B]">
                      Rp {Math.round(total * 1.1).toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full px-4 py-3 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition duration-300 mb-3 shadow-lg hover:scale-105 text-sm hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition duration-300 hover:scale-105 text-sm mb-3 hover:border-[#991B1B]"
                  >
                    Continue Shopping
                  </button>

                  {/* Clear Cart */}
                  <button
                    onClick={() => {
                      if (confirm("Clear your cart?")) {
                        clearCart();
                      }
                    }}
                    className="w-full px-4 py-2 text-[#991B1B] hover:bg-red-50 rounded-lg transition text-sm font-semibold hover:scale-105 border-2 border-[#991B1B]/30"
                  >
                    🗑️ Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
