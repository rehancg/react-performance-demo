import api from '../../../shared/utils/api';
import { authApi } from './authApi';

jest.mock('../../../shared/utils/api');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'fake-token', user: { id: 1, email: 'test@example.com' } };

    it('successfully logs in user', async () => {
      api.get.mockResolvedValueOnce(mockResponse);

      const result = await authApi.login(credentials);

      expect(api.get).toHaveBeenCalledWith('/auth/login');
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(result).toEqual(mockResponse.user);
    });

    it('handles login error', async () => {
      const error = new Error('Invalid credentials');
      api.post.mockRejectedValueOnce(error);

      await expect(authApi.login(credentials)).rejects.toThrow('Invalid credentials');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'fake-token');
    });

    it('successfully logs out user', async () => {
      api.post.mockResolvedValueOnce({});

      await authApi.logout();

      expect(api.post).toHaveBeenCalledWith('/auth/logout');
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('removes token even if logout API call fails', async () => {
      const error = new Error('Network error');
      api.post.mockRejectedValueOnce(error);

      await authApi.logout();

      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    const mockUser = { id: 1, email: 'test@example.com' };

    it('successfully fetches current user', async () => {
      api.get.mockResolvedValueOnce(mockUser);

      const result = await authApi.getCurrentUser();

      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });

    it('handles getCurrentUser error', async () => {
      const error = new Error('Failed to fetch user');
      api.get.mockRejectedValueOnce(error);

      await expect(authApi.getCurrentUser()).rejects.toThrow('Failed to fetch user');
    });
  });
}); 