import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatterhornPopup from '../MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    const { container } = render(<MatterhornPopup />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    const popupDiv = container.firstChild;
    expect(popupDiv).toHaveClass(customClass);
  });

  it('renders iframe with correct attributes', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('accepts onClose prop without error', () => {
    const mockOnClose = jest.fn();
    expect(() => {
      render(<MatterhornPopup onClose={mockOnClose} />);
    }).not.toThrow();
  });

  it('applies default className when none provided', () => {
    const { container } = render(<MatterhornPopup />);
    const popupDiv = container.firstChild;
    
    // Should have the default styles class
    expect(popupDiv).toHaveClass('matterhornPopup');
  });

  it('renders popup container with correct structure', () => {
    const { container } = render(<MatterhornPopup />);
    const popupDiv = container.firstChild;
    const iframe = popupDiv?.firstChild;
    
    expect(popupDiv).toHaveClass('matterhornPopup');
    expect(iframe).toBeInstanceOf(HTMLIFrameElement);
    expect(iframe).toHaveClass('video');
  });

  it('combines custom className with default className', () => {
    const customClass = 'my-custom-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    const popupDiv = container.firstChild;
    
    expect(popupDiv).toHaveClass('matterhornPopup');
    expect(popupDiv).toHaveClass(customClass);
  });
});