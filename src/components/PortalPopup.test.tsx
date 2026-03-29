import React from 'react';
import { render, screen } from '@testing-library/react';
import PortalPopup, { Portal } from './PortalPopup';

describe('PortalPopup Component', () => {
  test('renders children content', () => {
    render(
      <PortalPopup>
        <div>Test popup content</div>
      </PortalPopup>
    );
    
    expect(screen.getByText('Test popup content')).toBeInTheDocument();
  });

  test('applies custom overlay color', () => {
    render(
      <PortalPopup overlayColor="rgba(255, 0, 0, 0.5)">
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('background-color: rgba(255, 0, 0, 0.5)');
  });

  test('applies custom z-index', () => {
    render(
      <PortalPopup zIndex={999}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 999');
  });

  test('handles different placement options', () => {
    const placements = [
      'Centered',
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
          <div>Test content for {placement}</div>
        </PortalPopup>
      );
      
      expect(screen.getByText(`Test content for ${placement}`)).toBeInTheDocument();
      unmount();
    });
  });
});

describe('Portal Component', () => {
  test('renders children in a portal', () => {
    render(
      <Portal>
        <div>Portal content</div>
      </Portal>
    );
    
    expect(screen.getByText('Portal content')).toBeInTheDocument();
  });

  test('creates portal container with default id', () => {
    render(
      <Portal>
        <div>Portal content</div>
      </Portal>
    );
    
    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
  });

  test('creates portal container with custom id', () => {
    render(
      <Portal containerId="custom-portal">
        <div>Portal content</div>
      </Portal>
    );
    
    const portalContainer = document.getElementById('custom-portal');
    expect(portalContainer).toBeInTheDocument();
  });

  afterEach(() => {
    // Clean up portal containers after each test
    const portals = document.getElementById('portals');
    const customPortal = document.getElementById('custom-portal');
    
    if (portals) {
      document.body.removeChild(portals);
    }
    if (customPortal) {
      document.body.removeChild(customPortal);
    }
  });
});