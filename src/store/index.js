import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import productsReducer from '../features/products/store/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export default store; 