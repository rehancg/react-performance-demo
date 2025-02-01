import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../shared/components/Button/Button';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import { authApi } from '../../api/authApi';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = await authApi.login(credentials);
      dispatch(loginSuccess(user));
      navigate('/products');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login; 