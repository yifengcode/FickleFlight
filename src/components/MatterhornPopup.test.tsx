import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    render(<MatterhornPopup />);
  });

  it('renders iframe with correct src', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass(customClass);
  });

  it('applies default className', () => {
    const { container } = render(<MatterhornPopup />);
    const popup = container.firstChild as HTMLElement;
    expect(popup.className).toContain('matterhornPopup');
  });

  it('iframe has correct attributes', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('frameborder', '0');
    expect(iframe).toHaveAttribute('allowfullscreen');
  });
});