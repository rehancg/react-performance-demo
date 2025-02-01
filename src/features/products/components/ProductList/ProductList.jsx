import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../../store/productsSlice';
import { selectProducts, selectProductsLoading, selectProductsError } from '../../store/productsSelectors';
import { productsApi } from '../../api/productsApi';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const products = await productsApi.getProducts();
        dispatch(fetchProductsSuccess(products));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductList); 