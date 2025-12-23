import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  test('renders video iframe with correct src', () => {
    render(<MatterhornPopup />);
    
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-popup';
    render(<MatterhornPopup className={customClass} />);
    
    const iframe = document.querySelector('iframe');
    const popup = iframe?.parentElement;
    expect(popup).toHaveClass(customClass);
  });

  test('renders without className when not provided', () => {
    render(<MatterhornPopup />);
    
    const iframe = document.querySelector('iframe');
    const popup = iframe?.parentElement;
    expect(popup).toBeInTheDocument();
  });

  test('accepts onClose prop without calling it automatically', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});