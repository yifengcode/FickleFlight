import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortalPopup from './PortalPopup';

describe('PortalPopup Integration Tests', () => {
  // Clean up after each test
  afterEach(() => {
    const portalsDiv = document.getElementById('portals');
    if (portalsDiv) {
      document.body.removeChild(portalsDiv);
    }
  });

  test('popup with complex interaction flow', async () => {
    const mockOnOutsideClick = jest.fn();
    
    render(
      <PortalPopup 
        overlayColor="rgba(255, 0, 0, 0.3)"
        placement="Bottom right"
        onOutsideClick={mockOnOutsideClick}
        zIndex={500}
      >
        <div data-testid="complex-content">
          <button data-testid="inner-button">Click me</button>
          <input data-testid="inner-input" placeholder="Type here" />
        </div>
      </PortalPopup>
    );

    // Test that content is rendered
    const content = screen.getByTestId('complex-content');
    const button = screen.getByTestId('inner-button');
    const input = screen.getByTestId('inner-input');

    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    // Test interaction with inner elements
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'test input' } });
    
    expect(input).toHaveValue('test input');
    expect(mockOnOutsideClick).not.toHaveBeenCalled();

    // Test overlay click
    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  test('multiple portals can coexist', () => {
    const { rerender } = render(
      <PortalPopup>
        <div data-testid="portal-1">Portal 1</div>
      </PortalPopup>
    );

    rerender(
      <>
        <PortalPopup>
          <div data-testid="portal-1">Portal 1</div>
        </PortalPopup>
        <PortalPopup zIndex={200}>
          <div data-testid="portal-2">Portal 2</div>
        </PortalPopup>
      </>
    );

    expect(screen.getByTestId('portal-1')).toBeInTheDocument();
    expect(screen.getByTestId('portal-2')).toBeInTheDocument();

    const overlays = document.querySelectorAll('.portalPopupOverlay');
    expect(overlays).toHaveLength(2);
  });

  test('responsive behavior with window events', () => {
    const mockSetPosition = jest.fn();
    
    render(
      <PortalPopup>
        <div data-testid="responsive-content">Responsive Test</div>
      </PortalPopup>
    );

    // Simulate window resize
    fireEvent(window, new Event('resize'));
    
    // Simulate scroll
    fireEvent(window, new Event('scroll'));

    // Content should still be present
    expect(screen.getByTestId('responsive-content')).toBeInTheDocument();
  });

  test('all placement options work correctly', () => {
    const placements = [
      'Centered',
      'Top left', 
      'Top center',
      'Top right',
      'Bottom left',
      'Bottom center', 
      'Bottom right'
    ] as const;

    placements.forEach((placement, index) => {
      const { unmount } = render(
        <PortalPopup placement={placement}>
          <div data-testid={`placement-${index}`}>Test {placement}</div>
        </PortalPopup>
      );

      const overlay = document.querySelector('.portalPopupOverlay');
      expect(overlay).toBeInTheDocument();
      
      const content = screen.getByTestId(`placement-${index}`);
      expect(content).toBeInTheDocument();

      unmount();
      
      // Clean up portal
      const portalsDiv = document.getElementById('portals');
      if (portalsDiv && portalsDiv.children.length === 0) {
        document.body.removeChild(portalsDiv);
      }
    });
  });
});