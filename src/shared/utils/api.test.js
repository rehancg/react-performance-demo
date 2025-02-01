import axios from 'axios';
import api from './api';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe('API Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location = new URL('http://localhost');
  });

  it('creates axios instance with correct config', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
}); 