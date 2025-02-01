import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  const mockClick = jest.fn();

  it('renders with children', () => {
    render(<Button onClick={mockClick}>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(<Button onClick={mockClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <Button onClick={mockClick} variant="secondary">
        Secondary Button
      </Button>
    );
    expect(container.firstChild).toHaveClass('button--secondary');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button onClick={mockClick} disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });
}); 