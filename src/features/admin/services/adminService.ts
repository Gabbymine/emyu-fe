import api from "@/services/api";

// ===== PRODUCTS =====
export const adminProductService = {
  async getAllProducts() {
    const response = await api.get("/products");
    return response.data;
  },

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    category_id: string;
    is_customizable: boolean;
  }) {
    const response = await api.post("/admin/products", data);
    return response.data;
  },

  async updateProduct(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      category_id?: string;
      is_customizable?: boolean;
    }
  ) {
    const response = await api.put(`/admin/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: string) {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },
};

// ===== ORDERS =====
export const adminOrderService = {
  async getAllOrders() {
    const response = await api.get("/admin/orders");
    return response.data;
  },

  async getOrderById(id: string) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(
    id: string,
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  ) {
    const response = await api.put(`/admin/orders/${id}`, { status });
    return response.data;
  },

  async deleteOrder(id: string) {
    const response = await api.delete(`/admin/orders/${id}`);
    return response.data;
  },
};

// ===== USERS =====
export const adminUserService = {
  async getAllUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async getUserById(id: string) {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  async getUserStats(id: string) {
    const response = await api.get(`/admin/users/${id}/stats`);
    return response.data;
  },

  async updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      role_id?: number;
    }
  ) {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};

// ===== DASHBOARD STATS =====
export const adminDashboardService = {
  async getDashboardStats() {
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/orders"),
        api.get("/products"),
      ]);

      const users = usersRes.data || [];
      const orders = ordersRes.data || [];
      const products = productsRes.data || [];

      interface OrderData {
        total_amount?: number;
        status?: string;
        created_at?: string;
      }

      // Calculate status-based metrics
      const completedOrders = orders.filter((o: OrderData) => o.status === "delivered").length;
      const pendingOrders = orders.filter((o: OrderData) => 
        o.status === "pending" || o.status === "processing"
      ).length;
      const shippedOrders = orders.filter((o: OrderData) => o.status === "shipped").length;
      const cancelledOrders = orders.filter((o: OrderData) => o.status === "cancelled").length;

      // Calculate total revenue
      const totalRevenue = orders.reduce(
        (sum: number, order: OrderData) => sum + (order.total_amount || 0),
        0
      );

      // Calculate average order value
      const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

      // Sort orders by date (most recent first)
      const sortedOrders = [...orders].sort((a: OrderData, b: OrderData) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });

      // Sort products by price (top sellers - using price as proxy for now)
      const sortedProducts = [...products].sort((a: OrderData & { price?: number }, b: OrderData & { price?: number }) => {
        return (b.price || 0) - (a.price || 0);
      });

      return {
        totalUsers: users.length,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalRevenue,
        completedOrders,
        pendingOrders,
        shippedOrders,
        cancelledOrders,
        averageOrderValue,
        completionRate: orders.length > 0 ? (completedOrders / orders.length) * 100 : 0,
        recentOrders: sortedOrders.slice(0, 5),
        topProducts: sortedProducts.slice(0, 4),
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      throw error;
    }
  },
};

export default {
  adminProductService,
  adminOrderService,
  adminUserService,
  adminDashboardService,
};
