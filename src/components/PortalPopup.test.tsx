import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup from './PortalPopup';

describe('PortalPopup', () => {
  // Clean up portal div after each test
  afterEach(() => {
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      document.body.removeChild(portalsDiv);
    }
  });

  test('renders children inside portal', () => {
    render(
      <PortalPopup>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('popup-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  test('creates portal container if it does not exist', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );
    
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  test('uses custom container id when provided', () => {
    render(
      <PortalPopup>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  test('applies overlay color when provided', () => {
    render(
      <PortalPopup overlayColor="rgba(0, 0, 0, 0.5)">
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
  });

  test('applies correct placement styles for "Centered"', () => {
    render(
      <PortalPopup placement="Centered">
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  test('applies correct placement styles for "Top left"', () => {
    render(
      <PortalPopup placement="Top left">
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-start');
  });

  test('applies correct placement styles for "Bottom right"', () => {
    render(
      <PortalPopup placement="Bottom right">
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-end');
    expect(overlay).toHaveStyle('justify-content: flex-end');
  });

  test('calls onOutsideClick when clicking on overlay', () => {
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

  test('does not call onOutsideClick when clicking on content', () => {
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

  test('applies custom z-index when provided', () => {
    render(
      <PortalPopup zIndex={200}>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 200');
  });

  test('uses default z-index of 100 when not provided', () => {
    render(
      <PortalPopup>
        <div data-testid="content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 100');
  });
});