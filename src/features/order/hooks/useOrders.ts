import { useState, useCallback } from 'react';
import { orderService, Order } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getUserOrders();
      setOrders(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      setOrders([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (orderId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(orderId);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(
    async (orderData: {
      total_amount: number;
      shipping_cost: number;
      payment_method: string;
      shipping_address_id: string;
    }) => {
      try {
        setLoading(true);
        setError(null);
        const data = await orderService.createOrder(orderData);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
  };
};
