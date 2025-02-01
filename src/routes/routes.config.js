import Login from '../features/auth/components/Login/Login';
import ProductList from '../features/products/components/ProductList/ProductList';
import PerformanceDemo from '../features/performance/components/PerformanceDemo/PerformanceDemo';

export const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/products',
    component: ProductList,
  },
  {
    path: '/performance',
    component: PerformanceDemo,
  }
]; 