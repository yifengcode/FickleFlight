import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    render(<MatterhornPopup />);
  });

  it('renders iframe with correct attributes', () => {
    render(<MatterhornPopup />);
    
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-popup-class';
    render(<MatterhornPopup className={customClass} />);
    
    const container = document.querySelector('.custom-popup-class');
    expect(container).toBeInTheDocument();
  });

  it('accepts onClose prop without error', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    
    // The component renders successfully with onClose prop
    expect(document.querySelector('iframe')).toBeInTheDocument();
  });
});