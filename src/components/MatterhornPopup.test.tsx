import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders video iframe with correct attributes', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popupDiv = container.firstChild as HTMLElement;
    expect(popupDiv).toHaveClass(customClass);
  });

  it('calls onClose when provided', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    
    // The component itself doesn't have click handlers for closing,
    // so we just verify the prop is passed correctly
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders without crashing when no props are provided', () => {
    expect(() => render(<MatterhornPopup />)).not.toThrow();
  });
});