import React from 'react';
import { render } from '@testing-library/react';

describe('PortalPopup Component', () => {
  // Mock createPortal to avoid DOM manipulation in tests
  beforeAll(() => {
    // Mock createPortal
    jest.mock('react-dom', () => ({
      ...jest.requireActual('react-dom'),
      createPortal: (children: React.ReactNode) => children,
    }));
  });

  test('renders children content', () => {
    // Import PortalPopup here to ensure mock is applied
    const PortalPopup = require('../PortalPopup').default;
    
    const testContent = 'Test popup content';
    const { getByText } = render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );
    
    expect(getByText(testContent)).toBeInTheDocument();
  });

  test('applies centered placement by default', () => {
    const PortalPopup = require('../PortalPopup').default;
    
    const { container } = render(
      <PortalPopup>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveClass('portalPopupOverlay');
  });

  test('renders with custom z-index', () => {
    const PortalPopup = require('../PortalPopup').default;
    
    const customZIndex = 200;
    const { container } = render(
      <PortalPopup zIndex={customZIndex}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveStyle(`z-index: ${customZIndex}`);
  });

  test('renders with custom overlay color', () => {
    const PortalPopup = require('../PortalPopup').default;
    
    const customColor = 'rgba(255, 0, 0, 0.5)';
    const { container } = render(
      <PortalPopup overlayColor={customColor}>
        <div>Test content</div>
      </PortalPopup>
    );
    
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveStyle(`background-color: ${customColor}`);
  });
});