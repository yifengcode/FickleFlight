import React from 'react';
import { render, screen } from '@testing-library/react';
import MatterhornPopup from '../MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    render(<MatterhornPopup />);
  });

  it('renders with custom className', () => {
    const customClass = 'custom-popup';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass(customClass);
  });

  it('renders iframe with correct attributes', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com'));
  });

  it('accepts onClose callback prop', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    
    // Component should render without calling onClose
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('applies default empty className when none provided', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('matterhornPopup');
  });
});