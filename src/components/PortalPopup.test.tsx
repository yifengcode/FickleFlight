import { render, screen, fireEvent } from '@testing-library/react';
import PortalPopup, { Portal } from './PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portal containers
    const existingPortal = document.getElementById('portals');
    if (existingPortal) {
      existingPortal.remove();
    }
  });

  afterEach(() => {
    // Clean up portals after each test
    const existingPortal = document.getElementById('portals');
    if (existingPortal) {
      existingPortal.remove();
    }
  });

  it('renders children in a portal', () => {
    const testContent = 'Test Portal Content';
    render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies default centered placement', () => {
    const testContent = 'Centered Content';
    render(
      <PortalPopup>
        <div>{testContent}</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center'
    });
  });

  it('applies custom overlay color', () => {
    const overlayColor = 'rgba(255, 0, 0, 0.5)';
    render(
      <PortalPopup overlayColor={overlayColor}>
        <div>Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      backgroundColor: overlayColor
    });
  });

  it('applies custom z-index', () => {
    const customZIndex = 200;
    render(
      <PortalPopup zIndex={customZIndex}>
        <div>Test</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      zIndex: customZIndex.toString()
    });
  });

  it('handles outside click', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div>Test Content</div>
      </PortalPopup>
    );

    const overlay = document.querySelector('.portalPopupOverlay');
    fireEvent.click(overlay!);

    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger outside click when clicking on content', () => {
    const onOutsideClick = jest.fn();
    render(
      <PortalPopup onOutsideClick={onOutsideClick}>
        <div>Test Content</div>
      </PortalPopup>
    );

    const content = screen.getByText('Test Content');
    fireEvent.click(content);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('applies different placement styles', () => {
    const { rerender } = render(
      <PortalPopup placement="Top left">
        <div>Test</div>
      </PortalPopup>
    );

    let overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle({
      alignItems: 'flex-start'
    });

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

describe('Portal', () => {
  beforeEach(() => {
    // Clean up any existing portal containers
    const existingPortal = document.getElementById('portals');
    if (existingPortal) {
      existingPortal.remove();
    }
  });

  afterEach(() => {
    // Clean up portals after each test
    const existingPortal = document.getElementById('portals');
    if (existingPortal) {
      existingPortal.remove();
    }
  });

  it('creates portal container if it does not exist', () => {
    render(
      <Portal>
        <div>Portal Content</div>
      </Portal>
    );

    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
    expect(screen.getByText('Portal Content')).toBeInTheDocument();
  });

  it('uses existing portal container if it exists', () => {
    // Create a portal container manually
    const existingPortal = document.createElement('div');
    existingPortal.setAttribute('id', 'portals');
    document.body.appendChild(existingPortal);

    render(
      <Portal>
        <div>Portal Content</div>
      </Portal>
    );

    // Should use the existing container
    const portalContainers = document.querySelectorAll('#portals');
    expect(portalContainers).toHaveLength(1);
    expect(screen.getByText('Portal Content')).toBeInTheDocument();
  });

  it('uses custom container id when provided', () => {
    const customId = 'custom-portal';
    render(
      <Portal containerId={customId}>
        <div>Custom Portal Content</div>
      </Portal>
    );

    const customContainer = document.getElementById(customId);
    expect(customContainer).toBeInTheDocument();
    expect(screen.getByText('Custom Portal Content')).toBeInTheDocument();
  });
});