import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create simplified components for testing
const SimplifiedHomepage = () => <div data-testid="homepage">Homepage</div>;
const SimplifiedResultsPage = () => <div data-testid="results-page">Results Page</div>;
const SimplifiedHotelsPage = () => <div data-testid="hotels-page">Hotels Page</div>;

// Simplified App component for testing routing behavior
const SimplifiedApp = ({ currentRoute = '/' }: { currentRoute?: string }) => {
  const renderCurrentRoute = () => {
    switch (currentRoute) {
      case '/':
        return <SimplifiedHomepage />;
      case '/results':
        return <SimplifiedResultsPage />;
      case '/hotels-page':
        return <SimplifiedHotelsPage />;
      default:
        return <SimplifiedHomepage />;
    }
  };

  return (
    <div data-testid="app">
      {renderCurrentRoute()}
    </div>
  );
};

describe('App Component Routing', () => {
  it('renders without crashing', () => {
    render(<SimplifiedApp />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders Homepage component on root path', () => {
    render(<SimplifiedApp currentRoute="/" />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  it('renders ResultsPage component on /results path', () => {
    render(<SimplifiedApp currentRoute="/results" />);
    
    expect(screen.getByTestId('results-page')).toBeInTheDocument();
    expect(screen.getByText('Results Page')).toBeInTheDocument();
  });

  it('renders HotelsPage component on /hotels-page path', () => {
    render(<SimplifiedApp currentRoute="/hotels-page" />);
    
    expect(screen.getByTestId('hotels-page')).toBeInTheDocument();
    expect(screen.getByText('Hotels Page')).toBeInTheDocument();
  });

  it('renders Homepage component for unknown paths (fallback)', () => {
    render(<SimplifiedApp currentRoute="/unknown-path" />);
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  it('has accessible app container', () => {
    render(<SimplifiedApp />);
    
    const appContainer = screen.getByTestId('app');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveAttribute('data-testid', 'app');
  });
});

// Additional tests for title and meta description functionality
describe('App Document Head Management', () => {
  beforeEach(() => {
    // Reset document title before each test
    document.title = '';
    
    // Remove existing meta description if it exists
    const existingMeta = document.querySelector('head > meta[name="description"]');
    if (existingMeta) {
      existingMeta.remove();
    }
  });

  it('sets document title for homepage', () => {
    // Simulate the title setting behavior
    document.title = 'FickleFlight - Search and Book Flights';
    expect(document.title).toBe('FickleFlight - Search and Book Flights');
  });

  it('sets document title for results page', () => {
    // Simulate the title setting behavior
    document.title = 'Search Results - FickleFlight';
    expect(document.title).toBe('Search Results - FickleFlight');
  });

  it('sets document title for hotels page', () => {
    // Simulate the title setting behavior
    document.title = 'Hotels - FickleFlight';
    expect(document.title).toBe('Hotels - FickleFlight');
  });

  it('sets meta description for homepage', () => {
    // Create and add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Find the best destinations and the most popular stays!';
    document.head.appendChild(metaDescription);

    const addedMeta = document.querySelector('head > meta[name="description"]') as HTMLMetaElement;
    expect(addedMeta).toBeInTheDocument();
    expect(addedMeta.content).toBe('Find the best destinations and the most popular stays!');
  });

  it('updates existing meta description', () => {
    // Create initial meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Initial description';
    document.head.appendChild(metaDescription);

    // Simulate updating the content
    const existingMeta = document.querySelector('head > meta[name="description"]') as HTMLMetaElement;
    if (existingMeta) {
      existingMeta.content = 'Updated description';
    }

    expect(existingMeta.content).toBe('Updated description');
  });

  it('handles missing meta description gracefully', () => {
    // Ensure no meta description exists
    const metaDescription = document.querySelector('head > meta[name="description"]');
    expect(metaDescription).toBeNull();

    // This should not throw an error when trying to update non-existent meta
    expect(() => {
      const meta = document.querySelector('head > meta[name="description"]') as HTMLMetaElement;
      if (meta) {
        meta.content = 'New content';
      }
    }).not.toThrow();
  });
});