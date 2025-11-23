import { create } from 'zustand';

export interface CartItem {
  id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (product_id: string, product_name: string, price: number, quantity: number) => Promise<void>;
  updateItem: (product_id: string, quantity: number) => Promise<void>;
  removeItem: (product_id: string) => Promise<void>;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const items = JSON.parse(storedCart);
        set({ items });
        get().calculateTotal();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (product_id: string, product_name: string, price: number, quantity: number = 1) => {
    try {
      const { items } = get();
      const existingItem = items.find(item => item.product_id === product_id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = items.map(item =>
          item.product_id === product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...items, { product_id, product_name, price, quantity }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      set({ items: updatedItems });
      get().calculateTotal();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage });
    }
  },

  updateItem: async (product_id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        get().removeItem(product_id);
        return;
      }

      const { items } = get();
      const updatedItems = items.map(item =>
        item.product_id === product_id ? { ...item, quantity } : item
      );
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      set({ items: updatedItems });
      get().calculateTotal();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage });
    }
  },

  removeItem: async (product_id: string) => {
    try {
      const { items } = get();
      const updatedItems = items.filter(item => item.product_id !== product_id);
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      set({ items: updatedItems });
      get().calculateTotal();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage });
    }
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [], total: 0, error: null });
  },

  calculateTotal: () => {
    const { items } = get();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ total });
  },
}));

export default useCartStore;
