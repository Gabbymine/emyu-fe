import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminDashboardService } from "../services/adminService";

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  completedOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  completionRate: number;
}

interface Order {
  id?: string;
  user_id?: string;
  total_amount?: number;
  status?: string;
  created_at?: string;
}

interface Product {
  id?: string;
  name?: string;
  price?: number;
  stock_quantity?: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}

const StatCard = ({ icon: Icon, label, value, bgColor }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center shadow-sm`}
          >
            {Icon}
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    cancelledOrders: 0,
    averageOrderValue: 0,
    completionRate: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await adminDashboardService.getDashboardStats();

        setStats({
          totalOrders: dashboardData.totalOrders,
          totalUsers: dashboardData.totalUsers,
          totalProducts: dashboardData.totalProducts,
          totalRevenue: dashboardData.totalRevenue,
          completedOrders: dashboardData.completedOrders,
          pendingOrders: dashboardData.pendingOrders,
          shippedOrders: dashboardData.shippedOrders,
          cancelledOrders: dashboardData.cancelledOrders,
          averageOrderValue: dashboardData.averageOrderValue,
          completionRate: dashboardData.completionRate,
        });

        setRecentOrders(dashboardData.recentOrders || []);
        setTopProducts(dashboardData.topProducts || []);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={16} className="text-green-600" />;
      case "shipped":
        return <Package size={16} className="text-blue-600" />;
      case "processing":
        return <Clock size={16} className="text-yellow-600" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-500">Track your e-commerce performance and metrics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<DollarSign size={24} className="text-green-600" />}
            label="Total Revenue"
            value={loading ? "..." : `Rp${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<ShoppingCart size={24} className="text-red-600" />}
            label="Total Orders"
            value={loading ? "..." : stats.totalOrders.toLocaleString()}
            bgColor="bg-red-50"
          />
          <StatCard
            icon={<Users size={24} className="text-blue-600" />}
            label="Total Customers"
            value={loading ? "..." : stats.totalUsers.toLocaleString()}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Package size={24} className="text-purple-600" />}
            label="Total Products"
            value={loading ? "..." : stats.totalProducts.toLocaleString()}
            bgColor="bg-purple-50"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <ShoppingCart size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <p className="text-sm text-gray-500">Latest customer orders</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-1">
                  View All <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-red-300 transition-colors">
                          {getStatusIcon(order.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">Order #{order.id?.slice(0, 8)}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                              {order.status || "pending"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              }) : "N/A"}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-gray-700">
                              Rp{(order.total_amount || 0).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Eye size={18} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No recent orders</p>
                  <p className="text-sm text-gray-400 mt-1">Orders will appear here when customers make purchases</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Products - 1 column */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Package size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
                  <p className="text-sm text-gray-500">Best sellers</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : topProducts.length > 0 ? (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center font-bold text-purple-700">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate mb-1 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm font-bold text-red-600">
                          Rp{(product.price || 0).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={18} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No products yet</p>
                  <p className="text-sm text-gray-400 mt-1">Add products to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <span className="text-green-700 font-bold text-sm">
                {loading ? "..." : `${stats.completedOrders} Orders`}
              </span>
            </div>
            <h4 className="text-gray-700 font-medium mb-1">Completed Orders</h4>
            <p className="text-2xl font-bold text-green-900">
              {loading ? "..." : stats.completedOrders.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {loading ? "..." : `${stats.completionRate.toFixed(1)}% completion rate`}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Clock size={24} className="text-blue-600" />
              </div>
              <span className="text-blue-700 font-bold text-sm">
                {loading ? "..." : `${stats.pendingOrders} Orders`}
              </span>
            </div>
            <h4 className="text-gray-700 font-medium mb-1">Pending Orders</h4>
            <p className="text-2xl font-bold text-blue-900">
              {loading ? "..." : stats.pendingOrders.toLocaleString()}
            </p>
            <p className="text-sm text-blue-600 mt-2">Awaiting processing</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
              <span className="text-purple-700 font-bold text-sm">
                {loading ? "..." : `Rp${(stats.averageOrderValue / 1000).toFixed(0)}k`}
              </span>
            </div>
            <h4 className="text-gray-700 font-medium mb-1">Average Order Value</h4>
            <p className="text-2xl font-bold text-purple-900">
              {loading ? "..." : `Rp${(stats.averageOrderValue / 1000).toFixed(0)}k`}
            </p>
            <p className="text-sm text-purple-600 mt-2">Per transaction</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <BarChart3 size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order Status</h3>
                <p className="text-sm text-gray-500">Distribution of orders by status</p>
              </div>
            </div>

            {loading ? (
              <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />
            ) : (
              <div className="space-y-4">
                {[
                  { name: "Completed", value: stats.completedOrders, color: "#10b981" },
                  { name: "Pending", value: stats.pendingOrders, color: "#3b82f6" },
                  { name: "Shipped", value: stats.shippedOrders, color: "#06b6d4" },
                  { name: "Cancelled", value: stats.cancelledOrders, color: "#ef4444" },
                ].map((item) => {
                  const total = stats.totalOrders || 1;
                  const percentage = (item.value / total) * 100;
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{item.value}</span>
                          <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 rounded-full"
                          style={{
                            backgroundColor: item.color,
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Revenue Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <BarChart3 size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
                <p className="text-sm text-gray-500">Total revenue and average value</p>
              </div>
            </div>

            {loading ? (
              <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />
            ) : (
              <div className="space-y-6">
                {/* Total Revenue Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total Revenue</span>
                    <span className="font-bold text-green-600 text-lg">
                      Rp{(stats.totalRevenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Average Order Value</span>
                    <span className="font-bold text-blue-600 text-lg">
                      Rp{(stats.averageOrderValue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (stats.averageOrderValue / (stats.totalRevenue / stats.totalOrders || 1)) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Revenue per Customer */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Revenue per Customer</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        Rp{stats.totalUsers > 0 ? (stats.totalRevenue / stats.totalUsers / 1000).toFixed(0) : 0}k
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
