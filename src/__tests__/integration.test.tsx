import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortalPopup from '../components/PortalPopup';
import MatterhornPopup from '../components/MatterhornPopup';

// Mock react-dom for PortalPopup
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: any) => children,
}));

describe('Component Integration Tests', () => {
  it('PortalPopup and MatterhornPopup work together', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <PortalPopup onOutsideClick={mockOnClose}>
        <MatterhornPopup onClose={mockOnClose} />
      </PortalPopup>
    );

    // Check that both components render
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    
    // PortalPopup overlay should be present
    const portalContainer = container.querySelector('.portalPopupOverlay');
    expect(portalContainer).toBeInTheDocument();
  });

  it('can handle popup state management', () => {
    const PopupManager = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      return (
        <div>
          <button onClick={() => setIsOpen(true)}>Open Popup</button>
          {isOpen && (
            <PortalPopup onOutsideClick={() => setIsOpen(false)}>
              <MatterhornPopup onClose={() => setIsOpen(false)} />
            </PortalPopup>
          )}
          {isOpen && <div data-testid="popup-open">Popup is open</div>}
        </div>
      );
    };

    const { container } = render(<PopupManager />);

    // Initially popup should not be visible
    expect(screen.queryByTestId('popup-open')).not.toBeInTheDocument();
    expect(container.querySelector('iframe')).not.toBeInTheDocument();

    // Click to open popup
    const openButton = screen.getByText('Open Popup');
    fireEvent.click(openButton);

    // Popup should now be visible
    expect(screen.getByTestId('popup-open')).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeInTheDocument();
  });

  it('handles nested component props correctly', () => {
    const customClass = 'custom-popup-class';
    const mockOnClose = jest.fn();

    render(
      <PortalPopup 
        overlayColor="rgba(255, 0, 0, 0.5)"
        placement="Top center"
      >
        <MatterhornPopup 
          className={customClass}
          onClose={mockOnClose}
        />
      </PortalPopup>
    );

    // Check MatterhornPopup received correct className
    const popup = document.querySelector('.matterhornPopup');
    expect(popup).toHaveClass(customClass);

    // Check PortalPopup received correct overlay color
    const overlay = document.querySelector('.portalPopupOverlay') as HTMLElement;
    expect(overlay).toHaveStyle({ backgroundColor: 'rgba(255, 0, 0, 0.5)' });
  });
});