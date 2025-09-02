import React from 'react';
import { render, screen } from '../test-utils';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders without crashing', () => {
    render(<MatterhornPopup />);
    const popup = screen.getByTestId('matterhorn-popup');
    expect(popup).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    const popupDiv = container.firstChild as HTMLElement;
    expect(popupDiv).toHaveClass(customClass);
  });

  it('renders iframe with correct src', () => {
    render(<MatterhornPopup />);
    const iframe = screen.getByTitle('Matterhorn Video');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
  });

  it('renders iframe with correct attributes', () => {
    render(<MatterhornPopup />);
    const iframe = screen.getByTitle('Matterhorn Video');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('accepts onClose prop without crashing', () => {
    const mockOnClose = jest.fn();
    render(<MatterhornPopup onClose={mockOnClose} />);
    const popup = screen.getByTestId('matterhorn-popup');
    expect(popup).toBeInTheDocument();
    // Note: onClose is passed but not used in current implementation
  });
});