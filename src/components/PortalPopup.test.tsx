import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import PortalPopup from './PortalPopup';

// Mock content component for testing
const MockContent = () => <div data-testid="mock-content">Test Content</div>;

describe('PortalPopup', () => {
  // Clean up portals after each test
  afterEach(() => {
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      document.body.removeChild(portalsDiv);
    }
  });

  it('renders children content in a portal', () => {
    render(
      <PortalPopup>
        <MockContent />
      </PortalPopup>
    );
    
    const content = screen.getByTestId('mock-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  it('creates a portal container with default id "portals"', () => {
    render(
      <PortalPopup>
        <MockContent />
      </PortalPopup>
    );
    
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  it('applies custom overlay color', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`background-color: ${overlayColor}`);
  });

  it('handles onOutsideClick when clicking overlay', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    if (overlay) {
      // Add the class to simulate the overlay being clicked
      overlay.classList.add('portalPopupOverlay');
      fireEvent.click(overlay);
      expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onOutsideClick when clicking content', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <MockContent />
      </PortalPopup>
    );
    
    const content = screen.getByTestId('mock-content');
    fireEvent.click(content);
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  it('applies custom zIndex', () => {
    const customZIndex = 999;
    render(
      <PortalPopup zIndex={customZIndex}>
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`z-index: ${customZIndex}`);
  });

  it('applies centered placement by default', () => {
    render(
      <PortalPopup>
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  it('applies top left placement correctly', () => {
    render(
      <PortalPopup placement="Top left">
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-start');
  });

  it('applies bottom right placement correctly', () => {
    render(
      <PortalPopup placement="Bottom right">
        <MockContent />
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-end');
    expect(overlay).toHaveStyle('justify-content: flex-end');
  });
});