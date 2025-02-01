import api from '../../../shared/utils/api';

export const productsApi = {
  getProducts: async (params) => {
    try {
      return await api.get('/products', { params });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  getProductById: async (id) => {
    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  createProduct: async (productData) => {
    try {
      return await api.post('/products', productData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create product');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      return await api.put(`/products/${id}`, productData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      return await api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product');
    }
  },
}; 