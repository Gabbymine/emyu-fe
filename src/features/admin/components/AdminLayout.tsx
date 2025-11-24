import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <img src="/img/logo.png" alt="Redsphere Logo" className="w-full h-full object-cover" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-black text-gray-900">Redsphere</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 absolute right-2"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                  active
                    ? "bg-red-50 text-red-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} className={active ? "text-red-600" : "text-gray-400 group-hover:text-gray-600"} />
                {sidebarOpen && (
                  <span className={`font-semibold ${active ? "text-red-600" : ""}`}>
                    {item.label}
                  </span>
                )}
                {active && sidebarOpen && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-red-600"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-200 p-4">
          {sidebarOpen ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
                  <p className="text-gray-500 text-xs truncate">{user?.email}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition font-semibold text-sm"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 ml-6">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}
