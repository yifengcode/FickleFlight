import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import PortalPopup from './PortalPopup';

describe('PortalPopup', () => {
  beforeEach(() => {
    // Clean up any existing portals
    const existingPortals = document.getElementById('portals');
    if (existingPortals) {
      existingPortals.remove();
    }
  });

  it('renders children inside a portal', () => {
    render(
      <PortalPopup>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );
    
    expect(screen.getByTestId('popup-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('creates portal container in document body', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );
    
    const portalContainer = document.getElementById('portals');
    expect(portalContainer).toBeInTheDocument();
    expect(document.body).toContainElement(portalContainer);
  });

  it('applies overlay color when provided', () => {
    render(
      <PortalPopup overlayColor="rgba(255, 0, 0, 0.5)">
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('background-color: rgba(255, 0, 0, 0.5)');
  });

  it('sets zIndex when provided', () => {
    render(
      <PortalPopup zIndex={999}>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('z-index: 999');
  });

  it('calls onOutsideClick when clicking overlay', async () => {
    const user = userEvent.setup();
    const mockOnOutsideClick = jest.fn();
    
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="popup-content">Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    await user.click(overlay!);
    
    expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onOutsideClick when clicking inside content', async () => {
    const user = userEvent.setup();
    const mockOnOutsideClick = jest.fn();
    
    render(
      <PortalPopup onOutsideClick={mockOnOutsideClick}>
        <div data-testid="popup-content">Test Content</div>
      </PortalPopup>
    );
    
    const content = screen.getByTestId('popup-content');
    await user.click(content);
    
    expect(mockOnOutsideClick).not.toHaveBeenCalled();
  });

  it('applies centered placement by default', () => {
    render(
      <PortalPopup>
        <div>Test</div>
      </PortalPopup>
    );
    
    const overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: center');
    expect(overlay).toHaveStyle('justify-content: center');
  });

  it('applies different placement styles', () => {
    const { rerender } = render(
      <PortalPopup placement="Top left">
        <div>Test</div>
      </PortalPopup>
    );
    
    let overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-start');
    
    rerender(
      <PortalPopup placement="Bottom right">
        <div>Test</div>
      </PortalPopup>
    );
    
    overlay = document.querySelector('.portalPopupOverlay');
    expect(overlay).toHaveStyle('align-items: flex-end');
    expect(overlay).toHaveStyle('justify-content: flex-end');
  });
});