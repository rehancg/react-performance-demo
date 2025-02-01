import productsReducer, {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from './productsSlice';

describe('Products Slice', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchProductsStart', () => {
    const actual = productsReducer(initialState, fetchProductsStart());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchProductsSuccess', () => {
    const products = [
      { id: 1, name: 'Product 1', price: 99.99 },
      { id: 2, name: 'Product 2', price: 149.99 },
    ];
    
    const actual = productsReducer(initialState, fetchProductsSuccess(products));
    expect(actual.loading).toBe(false);
    expect(actual.products).toEqual(products);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchProductsFailure', () => {
    const error = 'Failed to fetch products';
    const actual = productsReducer(initialState, fetchProductsFailure(error));
    
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
    expect(actual.products).toEqual([]);
  });
}); 