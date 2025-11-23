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
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  loadAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
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
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  loadAuth: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        set({
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        authService.logout();
      }
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
