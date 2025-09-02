import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup from './PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      portalsDiv.remove();
    }
  });

  it('renders children in portal', () => {
    render(
      <PortalPopup>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );
    
    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
  });

  it('creates portal div if it does not exist', () => {
    render(
      <PortalPopup>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  it('applies centered placement by default', () => {
    render(
      <PortalPopup>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  it('applies overlay color when provided', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`background-color: ${overlayColor}`);
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay') as HTMLElement;
    fireEvent.click(overlay);
    
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when child content is clicked', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('popup-content');
    fireEvent.click(content);
    
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('applies custom zIndex when provided', () => {
    const customZIndex = 200;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`z-index: ${customZIndex}`);
  });
});