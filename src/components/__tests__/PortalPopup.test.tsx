import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalPopup from '../PortalPopup';

// Mock the portal to prevent issues in test environment
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('PortalPopup', () => {
  test('renders children content', () => {
    const testContent = 'Test popup content';
    render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  test('applies overlay color when provided', () => {
    const { container } = render(
      <PortalPopup overlayColor="rgba(255, 0, 0, 0.5)">
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('background-color: rgba(255, 0, 0, 0.5)');
  });

  test('calls onOutsideClick when overlay is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    const { container } = render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onOutsideClick when child content is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="child-content">Test content</div>
      </PortalPopup>
    );
    
    const childContent = screen.getByTestId('child-content');
    fireEvent.click(childContent);
    
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  test('applies centered placement by default', () => {
    const { container } = render(
      <PortalPopup>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  test('applies custom zIndex when provided', () => {
    const customZIndex = 999;
    const { container } = render(
      <PortalPopup zIndex={customZIndex}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle(`z-index: ${customZIndex}`);
  });

  test('renders with different placement options', () => {
    const { container, rerender } = render(
      <PortalPopup placement="Top left">
        <div>Test content</div>
      </PortalPopup>
    );
    
    let overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('align-items: flex-start');

    rerender(
      <PortalPopup placement="Bottom right">
        <div>Test content</div>
      </PortalPopup>
    );
    
    overlay = container.querySelector('.portalPopupOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('align-items: flex-end');
    expect(overlay).toHaveStyle('justify-content: flex-end');
  });
});