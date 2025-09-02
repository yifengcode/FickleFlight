import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalPopup, { Portal } from '../PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  afterEach(() => {
    // Clean up portals after each test
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  it('renders children inside a portal', () => {
    render(
      <PortalPopup>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );

    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('creates portal container if it does not exist', () => {
    render(
      <PortalPopup>
        <div>Portal Content</div>
      </PortalPopup>
    );

    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
  });

  it('applies default centered placement style', () => {
    render(
      <PortalPopup>
        <div data-testid="content">Centered Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('applies custom zIndex', () => {
    const customZIndex = 999;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ zIndex: customZIndex.toString() });
  });

  it('applies overlay color when provided', () => {
    const overlayColor = 'rgba(0, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ backgroundColor: overlayColor });
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="content">Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);

    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when content is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="content">Content</div>
      </PortalPopup>
    );

    const content = screen.getByTestId('content');
    fireEvent.click(content);

    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  describe('placement options', () => {
    const placements = [
      { placement: 'Top left', expectedStyle: { alignItems: 'flex-start' } },
      { placement: 'Top center', expectedStyle: { alignItems: 'center' } },
      { placement: 'Top right', expectedStyle: { alignItems: 'flex-end' } },
      { placement: 'Bottom left', expectedStyle: { alignItems: 'flex-start', justifyContent: 'flex-end' } },
      { placement: 'Bottom center', expectedStyle: { alignItems: 'center', justifyContent: 'flex-end' } },
      { placement: 'Bottom right', expectedStyle: { alignItems: 'flex-end', justifyContent: 'flex-end' } },
    ] as const;

    placements.forEach(({ placement, expectedStyle }) => {
      it(`applies correct styles for ${placement} placement`, () => {
        render(
          <PortalPopup placement={placement}>
            <div>Content</div>
          </PortalPopup>
        );

        const overlay = document.querySelector('.portalPopupOverlay');
        Object.entries(expectedStyle).forEach(([property, value]) => {
          expect(overlay).toHaveStyle({ [property]: value });
        });
      });
    });
  });
});

describe('Portal', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  afterEach(() => {
    // Clean up portals after each test
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  it('creates default portal container', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Test</div>
      </Portal>
    );

    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  it('uses custom container id', () => {
    render(
      <Portal containerId="custom-portal">
        <div data-testid="custom-portal-content">Custom Portal</div>
      </Portal>
    );

    const customPortalContainer = document.getElementById('custom-portal');
    expect(customPortalContainer).toBeInTheDocument();
    expect(screen.getByTestId('custom-portal-content')).toBeInTheDocument();
  });

  it('reuses existing portal container', () => {
    // Create a portal container first
    const existingContainer = document.createElement('div');
    existingContainer.setAttribute('id', 'existing-portal');
    document.body.appendChild(existingContainer);

    render(
      <Portal containerId="existing-portal">
        <div data-testid="reused-portal-content">Reused Portal</div>
      </Portal>
    );

    const portalContainers = document.querySelectorAll('#existing-portal');
    expect(portalContainers).toHaveLength(1); // Should not create duplicate
    expect(screen.getByTestId('reused-portal-content')).toBeInTheDocument();

    // Clean up
    document.body.removeChild(existingContainer);
  });
});