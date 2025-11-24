import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/cartStore";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./features/product/pages/ShopPage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage";
import WishlistPage from "./features/product/pages/WishlistPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/order/pages/CheckoutPage";
import OrderHistoryPage from "./features/order/pages/OrderHistoryPage";
import UserProfilePage from "./features/user/pages/UserProfilePage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import { ProtectedRoute, AdminProtectedRoute } from "./components/ProtectedRoute";
import AuthPage from "./features/auth/pages/AuthPage";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import AdminProducts from "./features/admin/pages/AdminProducts";
import AdminOrders from "./features/admin/pages/AdminOrders";
import AdminUsers from "./features/admin/pages/AdminUsers";

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
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
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
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>
        }
      />

      {/* Error Routes */}
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  const loadAuth = useAuthStore((state) => state.loadAuth);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const initializeApp = async () => {
      await loadAuth();
      await fetchCart();
    };
    initializeApp();
  }, [loadAuth, fetchCart]);

  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
