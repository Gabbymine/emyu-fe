import api from '@/services/api';

export interface ShippingAddress {
  id: string;
  user_id: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export const shippingAddressService = {
  async getUserAddresses() {
    try {
      const response = await api.get('/shipping-addresses');
      return response.data;
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
      throw error;
    }
  },

  // Get a specific shipping address by ID
  async getAddressById(addressId: string) {
    try {
      const response = await api.get(`/shipping-addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shipping address:', error);
      throw error;
    }
  },

  // Create a new shipping address
  async createAddress(addressData: {
    address: string;
    city: string;
    province: string;
    postal_code: string;
    phone: string;
  }) {
    try {
      const response = await api.post('/shipping-addresses', addressData);
      return response.data;
    } catch (error) {
      console.error('Error creating shipping address:', error);
      throw error;
    }
  },

  // Update shipping address
  async updateAddress(
    addressId: string,
    addressData: {
      address?: string;
      city?: string;
      province?: string;
      postal_code?: string;
      phone?: string;
    }
  ) {
    try {
      const response = await api.put(`/shipping-addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Error updating shipping address:', error);
      throw error;
    }
  },

  // Delete shipping address
  async deleteAddress(addressId: string) {
    try {
      const response = await api.delete(`/shipping-addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting shipping address:', error);
      throw error;
    }
  },
};
