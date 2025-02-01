import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('logs to console when add to cart is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<ProductCard product={mockProduct} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(consoleSpy).toHaveBeenCalledWith('Add to cart:', mockProduct);
    
    consoleSpy.mockRestore();
  });
}); 