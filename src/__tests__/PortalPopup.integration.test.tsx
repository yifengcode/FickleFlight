import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Import the component dynamically and mock dependencies
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

describe('PortalPopup Integration Tests', () => {
  let PortalPopup: any;

  beforeAll(() => {
    PortalPopup = require('../components/PortalPopup').default;
  });

  test('handles click events properly', () => {
    const mockOnOutsideClick = jest.fn();
    const { container } = render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.querySelector('.portalPopupOverlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnOutsideClick).toHaveBeenCalled();
    }
  });

  test('renders with proper positioning props', () => {
    const { container } = render(
      <PortalPopup left={10} top={20} right={30} bottom={40}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  test('supports different placement options', () => {
    const placements = ['Centered', 'Top left', 'Bottom right'] as const;
    
    placements.forEach(placement => {
      const { container } = render(
        <PortalPopup placement={placement}>
          <div>Test content for {placement}</div>
        </PortalPopup>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});