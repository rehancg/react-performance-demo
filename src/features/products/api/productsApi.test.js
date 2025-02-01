import api from '../../../shared/utils/api';
import { productsApi } from './productsApi';

jest.mock('../../../shared/utils/api');

describe('Products API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    it('successfully fetches products', async () => {
      api.get.mockResolvedValueOnce(mockProducts);

      const result = await productsApi.getProducts({ category: 'electronics' });

      expect(api.get).toHaveBeenCalledWith('/products', { params: { category: 'electronics' } });
      expect(result).toEqual(mockProducts);
    });

    it('handles getProducts error', async () => {
      const error = new Error('Network error');
      api.get.mockRejectedValueOnce(error);

      await expect(productsApi.getProducts()).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getProductById', () => {
    const mockProduct = { id: 1, name: 'Product 1' };

    it('successfully fetches a product by id', async () => {
      api.get.mockResolvedValueOnce(mockProduct);

      const result = await productsApi.getProductById(1);

      expect(api.get).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual(mockProduct);
    });

    it('handles getProductById error', async () => {
      const error = new Error('Product not found');
      api.get.mockRejectedValueOnce(error);

      await expect(productsApi.getProductById(1)).rejects.toThrow('Failed to fetch product');
    });
  });

  describe('createProduct', () => {
    const newProduct = { name: 'New Product', price: 99.99 };
    const mockResponse = { id: 1, ...newProduct };

    it('successfully creates a product', async () => {
      api.post.mockResolvedValueOnce(mockResponse);

      const result = await productsApi.createProduct(newProduct);

      expect(api.post).toHaveBeenCalledWith('/products', newProduct);
      expect(result).toEqual(mockResponse);
    });

    it('handles createProduct error', async () => {
      const error = new Error('Validation error');
      api.post.mockRejectedValueOnce(error);

      await expect(productsApi.createProduct(newProduct)).rejects.toThrow('Failed to create product');
    });
  });

  describe('updateProduct', () => {
    const updatedProduct = { name: 'Updated Product', price: 149.99 };
    const mockResponse = { id: 1, ...updatedProduct };

    it('successfully updates a product', async () => {
      api.put.mockResolvedValueOnce(mockResponse);

      const result = await productsApi.updateProduct(1, updatedProduct);

      expect(api.put).toHaveBeenCalledWith('/products/1', updatedProduct);
      expect(result).toEqual(mockResponse);
    });

    it('handles updateProduct error', async () => {
      const error = new Error('Product not found');
      api.put.mockRejectedValueOnce(error);

      await expect(productsApi.updateProduct(1, updatedProduct)).rejects.toThrow('Failed to update product');
    });
  });

  describe('deleteProduct', () => {
    it('successfully deletes a product', async () => {
      api.delete.mockResolvedValueOnce({ success: true });

      const result = await productsApi.deleteProduct(1);

      expect(api.delete).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual({ success: true });
    });

    it('handles deleteProduct error', async () => {
      const error = new Error('Product not found');
      api.delete.mockRejectedValueOnce(error);

      await expect(productsApi.deleteProduct(1)).rejects.toThrow('Failed to delete product');
    });
  });
}); 