import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { useCartStore } from "../../../store/cartStore";
import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { items, total, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "bank_transfer",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (items.length === 0 && !orderPlaced) {
      navigate("/cart");
      return;
    }
  }, [isAuthenticated, items.length, orderPlaced, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
      // Show success for 3 seconds then redirect
      setTimeout(() => {
        navigate("/shop");
      }, 3000);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white text-gray-900 py-12 px-4 md:px-8 flex items-center justify-center">
          <div className="text-center" data-aos="zoom-in">
            <div className="mb-6 inline-block p-6 bg-green-50 rounded-full animate-pulse border-2 border-green-200">
              <CheckCircle className="text-green-600" size={64} />
            </div>
            <h1 className="text-4xl font-black mb-3 text-gray-900">Order <span className="text-green-600">Placed!</span></h1>
            <p className="text-gray-600 mb-6 max-w-md text-sm leading-relaxed">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            <p className="text-xs text-gray-400 mb-6 animate-bounce">Redirecting to shop...</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 inline-block hover:scale-105 shadow-lg text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10" data-aos="fade-down">
            <button
              onClick={() => navigate("/cart")}
              className="p-2.5 hover:bg-gray-100 rounded-lg transition duration-300 hover:scale-110 group border-2 border-gray-200"
              title="Back to cart"
            >
              <ArrowLeft size={20} className="text-[#991B1B] group-hover:text-[#7A0F0F] transition" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">Secure <span className="text-[#991B1B]">Checkout</span></h1>
              <p className="text-gray-500 text-sm mt-1">Complete your purchase</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Shipping Information */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-7">
                  <h2 className="text-xl font-black mb-6 text-gray-900">Shipping <span className="text-[#991B1B]">Information</span></h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Street address"
                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="City"
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="Postal code"
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#991B1B]/70 focus:border-[#991B1B] transition text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-7">
                  <h2 className="text-xl font-black mb-5 text-gray-900">Payment <span className="text-[#991B1B]">Method</span></h2>

                  <div className="space-y-3">
                    {[
                      { value: "bank_transfer", label: "💳 Bank Transfer" },
                      { value: "credit_card", label: "🏧 Credit Card" },
                      { value: "e_wallet", label: "📱 E-Wallet" },
                    ].map((method) => (
                      <label key={method.value} className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-[#991B1B] transition">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleChange}
                          className="w-5 h-5 accent-[#991B1B]"
                        />
                        <span className="font-bold text-gray-900 text-sm">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3.5 bg-[#991B1B] text-white font-bold rounded-lg hover:bg-[#7A0F0F] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {loading ? "⏳ Processing Order..." : "✓ Place Order"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 p-7 sticky top-24 shadow-lg">
                <h2 className="text-xl font-black mb-6 text-gray-900">Order <span className="text-[#991B1B]">Summary</span></h2>

                {/* Items */}
                <div className="space-y-2.5 mb-5 pb-5 border-b-2 border-gray-200 max-h-56 overflow-y-auto text-sm">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {item.product_name} <span className="text-gray-500 font-semibold">x{item.quantity}</span>
                      </span>
                      <span className="font-bold text-gray-900">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Subtotal</span>
                    <span className="font-bold text-gray-900">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Shipping</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b-2 border-gray-200">
                    <span className="text-gray-600 font-semibold">Tax (10%)</span>
                    <span className="font-bold text-gray-900">Rp {Math.round(total * 0.1).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between bg-[#991B1B]/5 p-4 rounded-lg border-2 border-[#991B1B]/20">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-[#991B1B]">
                      Rp {Math.round(total * 1.1).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
