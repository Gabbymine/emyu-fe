import { create } from 'zustand';
import authService from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role_id: number;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  loadAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      // Simpan ke sessionStorage (hilang saat tab ditutup)
      // Dan localStorage (persist setelah refresh)
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, phone: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ name, email, password, phone });
      // Simpan ke sessionStorage dan localStorage
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    // Hapus dari sessionStorage dan localStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
      isInitialized: true,
    });
  },

  loadAuth: async () => {
    try {
      // Cek sessionStorage dulu (dari session saat ini)
      let token = sessionStorage.getItem('authToken');
      let user = sessionStorage.getItem('user');

      // Jika tidak ada di sessionStorage, ambil dari localStorage (dari session sebelumnya)
      if (!token || !user) {
        token = localStorage.getItem('authToken');
        user = localStorage.getItem('user');
        
        // Jika ada di localStorage, restore ke sessionStorage
        if (token && user) {
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('user', user);
        }
      }

      if (token && user) {
        set({
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Error loading auth:', error);
      authService.logout();
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      set({ isInitialized: true });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
