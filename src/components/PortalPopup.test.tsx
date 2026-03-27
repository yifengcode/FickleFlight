import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup, { Portal } from './PortalPopup';

describe('Portal', () => {
  it('creates portal div if it does not exist', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );

    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    expect(document.getElementById('portals')).toBeInTheDocument();
  });

  it('uses custom containerId', () => {
    render(
      <Portal containerId="custom-portal">
        <div data-testid="custom-portal-content">Custom Portal Content</div>
      </Portal>
    );

    expect(screen.getByTestId('custom-portal-content')).toBeInTheDocument();
    expect(document.getElementById('custom-portal')).toBeInTheDocument();
  });
});

describe('PortalPopup', () => {
  const defaultProps = {
    children: <div data-testid="popup-content">Test Content</div>
  };

  afterEach(() => {
    // Clean up any portal containers
    const portals = document.getElementById('portals');
    if (portals) {
      document.body.removeChild(portals);
    }
  });

  it('renders popup content', () => {
    render(<PortalPopup {...defaultProps} />);
    
    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
  });

  it('applies overlay color when provided', () => {
    render(
      <PortalPopup {...defaultProps} overlayColor="rgba(0, 0, 0, 0.5)" />
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
  });

  it('centers content by default', () => {
    render(<PortalPopup {...defaultProps} />);
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  it('applies correct styles for top left placement', () => {
    render(<PortalPopup {...defaultProps} placement="Top left" />);
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-start');
  });

  it('applies correct styles for bottom right placement', () => {
    render(<PortalPopup {...defaultProps} placement="Bottom right" />);
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-end');
    expect(overlay).toHaveStyle('justify-content: flex-end');
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup {...defaultProps} onOutsideClick={onOutsideClick} />
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);
    
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when content is clicked', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup {...defaultProps} onOutsideClick={onOutsideClick} />
    );
    
    const content = screen.getByTestId('popup-content');
    fireEvent.click(content);
    
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('applies custom zIndex', () => {
    render(<PortalPopup {...defaultProps} zIndex={999} />);
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 999');
  });

  it('handles resize events', () => {
    const mockGetBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
    }));

    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
      value: mockGetBoundingClientRect,
    });

    render(<PortalPopup {...defaultProps} />);
    
    // Trigger resize event
    fireEvent.resize(window);
    
    // Component should handle resize gracefully
    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
  });
});