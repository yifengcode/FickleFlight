import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelsPage from './HotelsPage';

// Mock MatterhornPopup and PortalPopup
jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup() {
    return <div data-testid="matterhorn-popup">Matterhorn Popup</div>;
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children }: any) {
    return <div data-testid="portal-popup">{children}</div>;
  };
});

describe('HotelsPage', () => {
  it('renders without crashing', () => {
    render(<HotelsPage />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClassName = 'custom-hotels';
    const { container } = render(<HotelsPage className={customClassName} />);

    const hotelsElement = container.firstChild as HTMLElement;
    expect(hotelsElement).toHaveClass(customClassName);
  });

  it('renders navigation elements', () => {
    render(<HotelsPage />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('renders hotel search section', () => {
    render(<HotelsPage />);

    // Check for basic hotel search elements
    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements.length).toBeGreaterThan(0);
  });

  it('renders view details buttons', () => {
    render(<HotelsPage />);

    const viewDetailsButtons = screen.getAllByText('View Details');
    expect(viewDetailsButtons.length).toBeGreaterThan(0);
  });

  it('renders hotel ratings', () => {
    render(<HotelsPage />);

    // Check for star ratings (4.7 appears in the component)
    expect(screen.getAllByText('4.7').length).toBeGreaterThan(0);
  });

  it('renders hotel reviews', () => {
    render(<HotelsPage />);

    // Check for review text
    const reviewElements = screen.getAllByText(/reviews/);
    expect(reviewElements.length).toBeGreaterThan(0);
  });

  it('renders pricing information', () => {
    render(<HotelsPage />);

    // Check for pricing (S 286 appears in the component)
    expect(screen.getAllByText(/\$S 286/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('/night').length).toBeGreaterThan(0);
  });

  it('renders footer links', () => {
    render(<HotelsPage />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support Center')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('does not show popup by default', () => {
    render(<HotelsPage />);

    expect(screen.queryByTestId('portal-popup')).not.toBeInTheDocument();
  });
});