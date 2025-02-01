import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null,
      },
    });
    store.dispatch = jest.fn();
  });

  const renderLogin = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders login form', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByText('Login'));

    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'auth/loginStart'
    }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'auth/loginSuccess',
        payload: expect.any(Object)
      }));
    });
  });

  it('shows loading state', () => {
    store = mockStore({
      auth: {
        loading: true,
        error: null,
      },
    });

    renderLogin();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message', () => {
    store = mockStore({
      auth: {
        loading: false,
        error: 'Invalid credentials',
      },
    });

    renderLogin();
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
}); 