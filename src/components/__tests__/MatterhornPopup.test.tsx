import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatterhornPopup from '../MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    render(<MatterhornPopup />);
  });

  it('renders with custom className', () => {
    const customClass = 'custom-test-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass(customClass);
  });

  it('renders iframe with correct src attribute', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('applies default empty className when none provided', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('matterhornPopup');
  });

  it('accepts onClose prop without errors', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    // onClose is not currently used in the component, but should accept it without errors
  });
});