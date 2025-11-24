import { useState, useEffect } from "react";
import { Package, Calendar, MapPin, DollarSign, ChevronDown } from "lucide-react";
import Navbar from "@/layout/Navbar";
import { orderService } from "../services/orderService";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "paid" | "packed" | "canceled";
  items: OrderItem[];
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
  };
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getUserOrders();
      
      // Transform API response to match component interface
      interface ApiOrder {
        id: string;
        created_at?: string;
        date?: string;
        status: string;
        items?: Array<{
          id: string;
          price: number;
          quantity: number;
          product_variant?: {
            name: string;
          };
        }>;
        total_amount?: number;
        total?: number;
        shipping_address?: {
          address?: string;
          city?: string;
          province?: string;
        };
      }

      const transformedOrders = (Array.isArray(data) ? data : []).map((order: ApiOrder) => ({
        id: order.id,
        date: order.created_at || order.date || new Date().toISOString(),
        status: order.status as Order["status"],
        items: (order.items || []).map((item) => ({
          id: item.id,
          name: item.product_variant?.name || "Product",
          price: item.price,
          quantity: item.quantity,
        })),
        total: order.total_amount || order.total || 0,
        shippingAddress: order.shipping_address ? {
          street: order.shipping_address.address || "",
          city: order.shipping_address.city || "",
          province: order.shipping_address.province || "",
        } : {
          street: "",
          city: "",
          province: "",
        },
      }));
      
      setOrders(transformedOrders);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Gagal memuat riwayat pesanan. Silakan coba lagi.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "processing":
      case "paid":
      case "packed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped":
        return "bg-cyan-100 text-cyan-700 border-cyan-300";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    const labels: Record<Order["status"], string> = {
      pending: "Menunggu Pembayaran",
      processing: "Sedang Diproses",
      paid: "Sudah Dibayar",
      packed: "Dikemas",
      shipped: "Sedang Dikirim",
      delivered: "Terkirim",
      cancelled: "Dibatalkan",
      canceled: "Dibatalkan",
    };
    return labels[status];
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
              <Package size={32} className="text-red-600" />
            </div>
            <h1 className="text-4xl font-black text-gray-900">Riwayat Pesanan</h1>
          </div>
          <p className="text-gray-600">Kelola dan pantau semua pesanan Anda</p>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-l-4 border-red-600">
            <Package className="text-gray-300 mx-auto mb-4 animate-pulse" size={48} />
            <p className="text-gray-600 font-medium text-lg">Memuat riwayat pesanan...</p>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-red-600">
            <div className="bg-red-50 rounded-lg p-6 inline-block mb-4">
              <Package size={48} className="mx-auto text-red-600 mb-3" />
            </div>
            <p className="text-red-600 font-semibold text-lg mb-4">{error}</p>
            <button
              onClick={loadOrders}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-l-4 border-red-600">
            <div className="bg-gray-100 rounded-lg p-8 inline-block mb-6">
              <Package size={56} className="mx-auto text-gray-400 mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Belum Ada Pesanan</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Mulai berbelanja sekarang dan pesan produk favorit Anda!
            </p>
            <button
              onClick={() => window.location.href = '/shop'}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg inline-block"
            >
              Mulai Belanja
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-l-4 border-red-600 overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                  className="w-full p-6 hover:bg-red-50 transition text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Order ID */}
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">No. Pesanan</p>
                      <p className="font-bold text-gray-900 font-mono text-lg">{order.id}</p>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <Calendar size={16} className="text-red-600" />
                        Tanggal
                      </p>
                      <p className="font-semibold text-gray-900">
                        {new Date(order.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Status</p>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    {/* Total & Expand Icon */}
                    <div className="flex justify-between md:justify-end items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Total</p>
                        <p className="font-bold text-red-600 text-xl">
                          Rp{order.total.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`text-red-600 transition-transform flex-shrink-0 ${
                          expandedOrder === order.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="px-6 pb-6 border-t-2 border-red-100 bg-gradient-to-br from-white to-red-50">
                    <div className="grid md:grid-cols-2 gap-8 mt-6">
                      {/* Shipping Address */}
                      <div>
                        <h3 className="flex items-center gap-3 font-bold text-lg mb-4 text-gray-900">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <MapPin size={20} className="text-red-600" />
                          </div>
                          Alamat Pengiriman
                        </h3>
                        <div className="bg-white rounded-lg p-4 border-2 border-red-100">
                          <p className="font-bold text-gray-900 mb-2">
                            {order.shippingAddress.street}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {order.shippingAddress.city}, {order.shippingAddress.province}
                          </p>
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div>
                        <h3 className="flex items-center gap-3 font-bold text-lg mb-4 text-gray-900">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <DollarSign size={20} className="text-red-600" />
                          </div>
                          Ringkasan Harga
                        </h3>
                        <div className="bg-white rounded-lg p-4 border-2 border-red-100 space-y-3">
                          <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">Subtotal</span>
                            <span>
                              Rp
                              {(order.total - Math.ceil(order.total * 0.1))
                                .toLocaleString("id-ID")}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600 text-sm">
                            <span>Pajak (10%)</span>
                            <span>
                              Rp{Math.ceil(order.total * 0.1).toLocaleString("id-ID")}
                            </span>
                          </div>
                          <div className="border-t-2 border-red-100 pt-3 flex justify-between font-bold text-red-600 text-lg">
                            <span>Total</span>
                            <span>Rp{order.total.toLocaleString("id-ID")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-8">
                      <h3 className="flex items-center gap-3 font-bold text-lg mb-4 text-gray-900">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-red-600" />
                        </div>
                        Produk Pesanan
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center bg-white rounded-lg p-4 border-2 border-red-100"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-gray-600 text-sm">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-bold text-red-600">
                              Rp{item.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
