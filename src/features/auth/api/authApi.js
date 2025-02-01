import api from '../../../shared/utils/api';

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.get('/auth/login');
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        return response.user;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      throw new Error(error.message || 'Failed to login');
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
    }
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/users/1');  // For demo, we'll always get the first user
    } catch (error) {
      throw new Error(error.message || 'Failed to get current user');
    }
  },
}; 