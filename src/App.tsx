import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/cartStore";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./features/product/pages/ShopPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/order/pages/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./features/auth/pages/AuthPage";

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <div className="bg-[#991B1B] text-[#F8F6EF] min-h-screen">
            <Navbar />
            <LandingPage />
            <Footer />
          </div>
        }
      />

      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <ShopPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const loadAuth = useAuthStore((state) => state.loadAuth);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    loadAuth();
    fetchCart();
  }, [loadAuth, fetchCart]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
