import { api } from '@/lib/axios';

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post('/auth/login', payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
};
