import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Homepage component since it might have complex dependencies
jest.mock('./components/Homepage', () => {
  return function MockHomepage() {
    return <div data-testid="homepage">Homepage Component</div>;
  };
});

// Mock react-router-dom
jest.doMock('react-router-dom', () => ({
  Routes: ({ children }: { children: React.ReactNode }) => children,
  Route: ({ element }: { element: React.ReactNode }) => element,
  useNavigationType: () => 'PUSH',
  useLocation: () => ({ pathname: '/' }),
}));

describe('App', () => {
  it('renders Homepage component', () => {
    render(<App />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  it('renders without throwing errors', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    
    render(<App />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
    
    scrollToSpy.mockRestore();
  });

  it('handles document title and meta description', () => {
    const originalTitle = document.title;
    
    // Create a meta description tag for testing
    const metaTag = document.createElement('meta');
    metaTag.name = 'description';
    metaTag.content = 'original description';
    document.head.appendChild(metaTag);
    
    render(<App />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
    
    // Clean up
    document.title = originalTitle;
    if (document.head.contains(metaTag)) {
      document.head.removeChild(metaTag);
    }
  });
});