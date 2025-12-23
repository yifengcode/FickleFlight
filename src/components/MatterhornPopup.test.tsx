import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders the popup with iframe', () => {
    render(<MatterhornPopup />);
    
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('applies custom className when provided', () => {
    const customClassName = 'custom-popup';
    const { container } = render(<MatterhornPopup className={customClassName} />);
    
    const popupElement = container.firstChild as HTMLElement;
    expect(popupElement).toHaveClass(customClassName);
  });

  it('accepts onClose prop without errors', () => {
    const mockOnClose = jest.fn();
    expect(() => {
      render(<MatterhornPopup onClose={mockOnClose} />);
    }).not.toThrow();
  });

  it('renders with default props', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popupElement = container.firstChild as HTMLElement;
    expect(popupElement).toBeInTheDocument();
  });
});