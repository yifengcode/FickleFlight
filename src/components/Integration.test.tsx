import { render, screen, fireEvent } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';
import PortalPopup from './PortalPopup';

describe('MatterhornPopup Integration with PortalPopup', () => {
  afterEach(() => {
    // Clean up any portal elements
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      portalsDiv.remove();
    }
  });

  it('renders MatterhornPopup inside PortalPopup correctly', () => {
    const mockOnClose = jest.fn();
    
    render(
      <PortalPopup>
        <MatterhornPopup onClose={mockOnClose} />
      </PortalPopup>
    );

    // Check that the iframe from MatterhornPopup is rendered inside the portal
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');

    // Check that portal overlay exists
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
  });

  it('handles portal popup interactions with nested MatterhornPopup', () => {
    const mockOnClose = jest.fn();
    const mockOnOutsideClick = jest.fn();
    
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <MatterhornPopup onClose={mockOnClose} />
      </PortalPopup>
    );

    // Click outside should trigger the portal's onOutsideClick
    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('applies custom styling when components are integrated', () => {
    const customClass = 'custom-matterhorn';
    
    render(
      <PortalPopup overlayColor="rgba(0, 0, 0, 0.8)" placement="Centered">
        <MatterhornPopup className={customClass} />
      </PortalPopup>
    );

    // Check portal styling
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.8)' });

    // Check MatterhornPopup styling
    const matterhornContainer = document.querySelector('.custom-matterhorn');
    expect(matterhornContainer).toBeInTheDocument();
  });
});