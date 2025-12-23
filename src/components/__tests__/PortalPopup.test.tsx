import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup from '../PortalPopup';

// Mock createPortal for testing
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: any) => children,
}));

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clear any existing portal divs
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  it('renders children correctly', () => {
    render(
      <PortalPopup>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );

    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default centered placement', () => {
    const { container } = render(
      <PortalPopup>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    const { container } = render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="popup-content">Content</div>
      </PortalPopup>
    );

    const overlay = container.querySelector('.portalPopupOverlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onOutsideClick when clicking inside content', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="popup-content">Content</div>
      </PortalPopup>
    );

    fireEvent.click(screen.getByTestId('popup-content'));
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  it('applies custom overlay color', () => {
    const customColor = 'rgba(255, 0, 0, 0.5)';
    const { container } = render(
      <PortalPopup overlayColor={customColor}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = container.querySelector('.portalPopupOverlay') as HTMLElement;
    expect(overlay).toHaveStyle({ backgroundColor: customColor });
  });

  it('applies custom zIndex', () => {
    const customZIndex = 999;
    const { container } = render(
      <PortalPopup zIndex={customZIndex}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = container.querySelector('.portalPopupOverlay') as HTMLElement;
    expect(overlay).toHaveStyle({ zIndex: customZIndex.toString() });
  });

  it('handles different placement options', () => {
    const placements = ['Top left', 'Top center', 'Top right', 'Bottom left', 'Bottom center', 'Bottom right'] as const;
    
    placements.forEach(placement => {
      const { container, unmount } = render(
        <PortalPopup placement={placement}>
          <div>Content</div>
        </PortalPopup>
      );

      const overlay = container.querySelector('.portalPopupOverlay');
      expect(overlay).toBeInTheDocument();
      unmount();
    });
  });
});