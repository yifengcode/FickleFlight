import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalPopup, { Portal } from './PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      existingPortals.remove();
    }
  });

  it('renders children inside a portal', () => {
    const testContent = 'Test Portal Content';
    render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
    
    // Check that portal div is created
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  it('applies centered placement by default', () => {
    render(
      <PortalPopup>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center'
    });
  });

  it('applies custom overlay color', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      backgroundColor: overlayColor
    });
  });

  it('applies custom z-index', () => {
    const customZIndex = 200;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      zIndex: customZIndex.toString()
    });
  });

  it('handles different placement options', () => {
    const { rerender } = render(
      <PortalPopup placement="Top left">
        <div>Content</div>
      </PortalPopup>
    );

    let overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'flex-start'
    });

    rerender(
      <PortalPopup placement="Bottom right">
        <div>Content</div>
      </PortalPopup>
    );

    overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    });
  });

  it('calls onOutsideClick when clicking overlay', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when clicking content', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Content</div>
      </PortalPopup>
    );

    const content = screen.getByText('Content');
    fireEvent.click(content);
    
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });
});

describe('Portal', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      existingPortals.remove();
    }
  });

  it('creates portal container with default id', () => {
    render(
      <Portal>
        <div>Portal Content</div>
      </Portal>
    );

    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
    expect(screen.getByText('Portal Content')).toBeInTheDocument();
  });

  it('creates portal container with custom id', () => {
    const customId = 'custom-portal';
    render(
      <Portal containerId={customId}>
        <div>Custom Portal Content</div>
      </Portal>
    );

    const customPortalsDiv = document.getElementById(customId);
    expect(customPortalsDiv).toBeInTheDocument();
    expect(screen.getByText('Custom Portal Content')).toBeInTheDocument();
  });

  it('reuses existing portal container', () => {
    // Create a portal container manually
    const existingPortal = document.createElement('div');
    existingPortal.setAttribute('id', 'portals');
    document.body.appendChild(existingPortal);

    render(
      <Portal>
        <div>Reused Portal</div>
      </Portal>
    );

    // Should still have only one portal container
    const portalContainers = document.querySelectorAll('#portals');
    expect(portalContainers).toHaveLength(1);
    expect(screen.getByText('Reused Portal')).toBeInTheDocument();
  });
});