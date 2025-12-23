import React from 'react';
import { render } from '@testing-library/react';

// Mock all react-router-dom dependencies
jest.mock('react-router-dom', () => ({
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div data-testid="route">{element}</div>,
  useNavigationType: () => 'PUSH',
  useLocation: () => ({ pathname: '/' }),
}));

// Mock the Homepage component
jest.mock('./components/Homepage', () => {
  return function MockHomepage() {
    return <div data-testid="homepage">Homepage Component</div>;
  };
});

import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders Routes component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('routes')).toBeInTheDocument();
  });

  it('renders Route component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('route')).toBeInTheDocument();
  });

  it('renders Homepage component through routing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('homepage')).toBeInTheDocument();
  });

  it('handles scroll behavior without errors', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    
    render(<App />);
    
    scrollToSpy.mockRestore();
  });

  it('handles document metadata without errors', () => {
    const originalTitle = document.title;
    
    render(<App />);
    
    // Component should handle document metadata gracefully
    expect(document.title).toBeDefined();
    
    // Reset title
    document.title = originalTitle;
  });
});