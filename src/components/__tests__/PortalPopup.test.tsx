import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalPopup from '../PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portals before each test
    const existingPortal = document.getElementById('portals');
    if (existingPortal) {
      document.body.removeChild(existingPortal);
    }
  });

  it('renders children in a portal', () => {
    const testContent = 'Test content';
    render(
      <PortalPopup>
        <div data-testid="popup-content">{testContent}</div>
      </PortalPopup>
    );

    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('creates portal container with default id', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );

    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
  });

  it('applies default placement (Centered)', () => {
    render(
      <PortalPopup>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center'
    });
  });

  it('applies custom placement styles', () => {
    render(
      <PortalPopup placement="Top left">
        <div data-testid="content">Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'flex-start'
    });
  });

  it('applies custom zIndex', () => {
    const customZIndex = 999;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`z-index: ${customZIndex}`);
  });

  it('applies custom overlay color', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle(`background-color: ${overlayColor}`);
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="content">Test</div>
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
        <div data-testid="content">Test</div>
      </PortalPopup>
    );

    const content = screen.getByTestId('content');
    fireEvent.click(content);
    
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  it('renders without onOutsideClick handler', () => {
    expect(() => {
      render(
        <PortalPopup>
          <div data-testid="content">Test</div>
        </PortalPopup>
      );
    }).not.toThrow();
  });

  it('handles all placement options correctly', () => {
    const placements = [
      'Centered',
      'Top left', 
      'Top center',
      'Top right',
      'Bottom left',
      'Bottom center',
      'Bottom right'
    ] as const;

    placements.forEach((placement) => {
      const { unmount } = render(
        <PortalPopup placement={placement}>
          <div data-testid={`content-${placement}`}>Test {placement}</div>
        </PortalPopup>
      );

      const overlay = document.querySelector('.portalPopupOverlay');
      expect(overlay).toBeInTheDocument();
      
      unmount();
    });
  });
});