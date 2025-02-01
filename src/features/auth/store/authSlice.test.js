import authReducer, { loginStart, loginSuccess, loginFailure, logout } from './authSlice';

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginStart', () => {
    const actual = authReducer(initialState, loginStart());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle loginSuccess', () => {
    const user = { id: 1, email: 'test@example.com' };
    const actual = authReducer(initialState, loginSuccess(user));
    
    expect(actual.loading).toBe(false);
    expect(actual.user).toEqual(user);
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const actual = authReducer(initialState, loginFailure(error));
    
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle logout', () => {
    const loggedInState = {
      user: { id: 1 },
      isAuthenticated: true,
      loading: false,
      error: null,
    };
    
    const actual = authReducer(loggedInState, logout());
    expect(actual).toEqual(initialState);
  });
}); 