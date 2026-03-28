import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock all the complex dependencies
jest.mock('react-router-dom', () => ({
  Routes: ({ children }: any) => <div data-testid="routes">{children}</div>,
  Route: ({ element }: any) => element,
  useNavigationType: () => 'PUSH',
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../components/Homepage', () => {
  return function MockHomepage() {
    return <div data-testid="homepage">Homepage Component</div>;
  };
});

jest.mock('../components/ResultsPage', () => {
  return function MockResultsPage() {
    return <div data-testid="resultspage">ResultsPage Component</div>;
  };
});

jest.mock('../components/HotelsPage', () => {
  return function MockHotelsPage() {
    return <div data-testid="hotelspage">HotelsPage Component</div>;
  };
});

// Mock scrollTo to avoid jsdom warning
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

describe('App Component', () => {
  test('renders App with routes', () => {
    const App = require('../App').default;
    render(<App />);
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  test('app component loads without crashing', () => {
    const App = require('../App').default;
    render(<App />);
    // Just check that it renders without throwing
    expect(document.body).toBeInTheDocument();
  });
});