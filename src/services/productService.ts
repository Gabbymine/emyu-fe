import api from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  is_customizable: boolean;
  created_at: string;
  updated_at: string;
}

const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data || [];
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export default productService;
