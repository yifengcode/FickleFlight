import React from 'react';
import { render } from '@testing-library/react';

// Mock dependencies similar to Homepage
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup() {
    return <div data-testid="matterhorn-popup">Matterhorn Popup</div>;
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children }: { children: React.ReactNode }) {
    return <div data-testid="portal-popup">{children}</div>;
  };
});

import HotelsPage from './HotelsPage';

describe('HotelsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<HotelsPage />);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<HotelsPage className="test-class" />);
    const hotelsPage = container.querySelector('.hotelsPage');
    expect(hotelsPage).toHaveClass('test-class');
  });

  it('renders main hotels page structure', () => {
    const { container } = render(<HotelsPage />);
    const hotelsPage = container.querySelector('.hotelsPage');
    expect(hotelsPage).toBeInTheDocument();
  });

  it('renders top header', () => {
    const { container } = render(<HotelsPage />);
    const header = container.querySelector('.topHeader');
    expect(header).toBeInTheDocument();
  });

  it('has correct component structure', () => {
    const { container } = render(<HotelsPage />);
    
    // Should have main container
    expect(container.querySelector('.hotelsPage')).toBeInTheDocument();
    
    // Should render without throwing errors
    expect(container.firstChild).toBeInTheDocument();
  });
});