import api from '@/services/api';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  product_variant?: {
    id: string;
    product_id: string;
    name: string;
  };
}

interface ShippingAddress {
  id: string;
  street?: string;
  address?: string;
  city: string;
  province: string;
  postal_code?: string;
  phone?: string;
}

export interface Order {
  id: string;
  order_number?: string;
  date?: string;
  created_at?: string;
  status: 'pending' | 'processing' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'canceled';
  items: OrderItem[];
  total: number;
  total_amount?: number;
  shipping_address: ShippingAddress;
  shippingAddress?: ShippingAddress;
  user_id?: string;
  payment_method?: string;
}

export const orderService = {
  // Get all orders for the current user
  async getUserOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get a specific order by ID
  async getOrderById(orderId: string) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Create a new order with items
  async createOrder(orderData: {
    total_amount: number;
    shipping_cost: number;
    payment_method: string;
    shipping_address_id: string;
    items: Array<{
      product_variant_id: string;
      quantity: number;
      price: number;
    }>;
  }) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order status (admin only)
  async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },
};
