import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup, { Portal } from './PortalPopup';

// Mock createPortal to render children directly instead of in portal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

describe('PortalPopup Component', () => {
  beforeEach(() => {
    // Clean up any existing portals div
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  test('renders children correctly', () => {
    render(
      <PortalPopup>
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  test('applies default placement (Centered)', () => {
    render(
      <PortalPopup>
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('portalPopupOverlay');
  });

  test('applies custom overlay color', () => {
    render(
      <PortalPopup overlayColor="rgba(0, 0, 0, 0.5)">
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
  });

  test('applies custom zIndex', () => {
    render(
      <PortalPopup zIndex={200}>
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 200');
  });

  test('calls onOutsideClick when overlay is clicked', () => {
    const onOutsideClick = jest.fn();
    
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onOutsideClick).toHaveBeenCalledTimes(1);
    }
  });

  test('does not call onOutsideClick when child content is clicked', () => {
    const onOutsideClick = jest.fn();
    
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div data-testid="test-content">Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('test-content');
    fireEvent.click(content);
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  test('supports different placement options', () => {
    const placements = [
      'Top left',
      'Top center', 
      'Top right',
      'Bottom left',
      'Bottom center',
      'Bottom right'
    ] as const;

    placements.forEach(placement => {
      const { unmount } = render(
        <PortalPopup placement={placement}>
          <div data-testid={`test-${placement}`}>Test Content</div>
        </PortalPopup>
      );
      
      const content = screen.getByTestId(`test-${placement}`);
      expect(content).toBeInTheDocument();
      
      unmount();
    });
  });
});

describe('Portal Component', () => {
  beforeEach(() => {
    // Clean up any existing portals div
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      document.body.removeChild(existingPortals);
    }
  });

  test('creates portals container when it does not exist', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );
    
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  test('uses existing portals container when it exists', () => {
    // Create portals div manually
    const existingPortals = document.createElement('div');
    existingPortals.setAttribute('id', 'portals');
    document.body.appendChild(existingPortals);
    
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );
    
    // Should still be the same div
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBe(existingPortals);
  });

  test('uses custom container id', () => {
    render(
      <Portal containerId="custom-portal">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );
    
    const customPortal = document.getElementById('custom-portal');
    expect(customPortal).toBeInTheDocument();
  });
});