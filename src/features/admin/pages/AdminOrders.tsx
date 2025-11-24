import { useState, useEffect } from "react";
import { Eye, Trash2, Filter } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { adminOrderService } from "../services/adminService";

interface AdminOrder {
  id?: string;
  user_id?: string;
  total_amount?: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at?: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-cyan-100 text-cyan-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminOrderService.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this order?")) return;

    try {
      await adminOrderService.deleteOrder(id);
      await fetchOrders();
    } catch (err) {
      console.error("Failed to delete order:", err);
      setError("Failed to delete order");
    }
  };

  const handleStatusChange = async (
    id: string | undefined,
    newStatus: AdminOrder["status"]
  ) => {
    if (!id || !newStatus) return;

    try {
      await adminOrderService.updateOrderStatus(
        id,
        newStatus as "pending" | "processing" | "shipped" | "delivered" | "cancelled"
      );
      await fetchOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
      setError("Failed to update order status");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">Manage customer orders and track shipments</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex-1"></div>
            <span className="text-gray-600 font-semibold">{filteredOrders.length} orders</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">Loading orders...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">User ID</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-bold font-mono">{order.id?.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{order.user_id || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString("id-ID") : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-bold text-red-600">
                      Rp{(order.total_amount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as AdminOrder["status"])
                        }
                        className={`px-3 py-1 rounded-full text-sm font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer ${
                          statusColors[order.status || "pending"]
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
