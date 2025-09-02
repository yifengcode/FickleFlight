import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup from './PortalPopup';

describe('PortalPopup', () => {
  afterEach(() => {
    // Clean up any remaining portal elements
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      portalsDiv.remove();
    }
  });

  it('renders children inside portal', () => {
    const testContent = 'Test Content';
    render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('creates portal container with default id', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );
    
    const portalsDiv = document.getElementById('portals');
    expect(portalsDiv).toBeInTheDocument();
  });

  it('applies overlay color when provided', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ backgroundColor: overlayColor });
  });

  it('applies centered placement by default', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ 
      alignItems: 'center',
      justifyContent: 'center'
    });
  });

  it('applies custom zIndex when provided', () => {
    const customZIndex = 999;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ zIndex: customZIndex.toString() });
  });

  it('calls onOutsideClick when overlay is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when child content is clicked', () => {
    const mockOnOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByText('Test Content');
    fireEvent.click(content);
    
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  it('applies different placement styles correctly', () => {
    const { rerender } = render(
      <PortalPopup placement="Top left">
        <div>Test</div>
      </PortalPopup>
    );
    
    let overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ alignItems: 'flex-start' });

    rerender(
      <PortalPopup placement="Bottom right">
        <div>Test</div>
      </PortalPopup>
    );
    
    overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({ 
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    });
  });
});