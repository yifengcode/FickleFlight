import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatterhornPopup from '../MatterhornPopup';

describe('MatterhornPopup', () => {
  test('renders iframe with correct src', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameborder', '0');
    expect(iframe).toHaveAttribute('allowfullscreen');
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popupDiv = container.firstChild as HTMLElement;
    expect(popupDiv).toHaveClass(customClass);
  });

  test('renders with default empty className when none provided', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popupDiv = container.firstChild as HTMLElement;
    expect(popupDiv).toBeInTheDocument();
  });

  test('accepts onClose prop without error', () => {
    const mockOnClose = jest.fn();
    
    expect(() => {
      render(<MatterhornPopup onClose={mockOnClose} />);
    }).not.toThrow();
  });
});