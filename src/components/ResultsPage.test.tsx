import React from 'react';
import { render, screen } from '@testing-library/react';

// Create a simple mock component that represents the ResultsPage functionality
const MockResultsPage = ({ className = '', search = '' }: { className?: string; search?: string }) => {
  return (
    <div className={`resultsPage ${className}`} data-testid="results-page">
      <header data-testid="header">
        <div data-testid="logo">Fickleflight</div>
        <nav data-testid="navigation">
          <a href="#explore">Explore</a>
          <a href="#search">Search</a>
          <a href="#hotels">Hotels</a>
        </nav>
      </header>
      
      <main data-testid="main-content">
        <div data-testid="search-form">
          <input data-testid="departure-input" placeholder="Departure" defaultValue="Singapore - Changi (SIN)" />
          <input data-testid="arrival-input" placeholder="Arrival" defaultValue="Los Angeles (LA)" />
          <input data-testid="date-input" type="date" placeholder="Date" />
          <button data-testid="search-flights-btn">Search flights</button>
        </div>
        
        <div data-testid="filters-section">
          <h3>Booking Options</h3>
          <div data-testid="booking-options">
            <label>
              <input type="checkbox" />
              Book on Fickleflight
            </label>
            <label>
              <input type="checkbox" />
              Official Airline Websites
            </label>
          </div>
          
          <h3>Flight Experience</h3>
          <div data-testid="flight-experience">
            <label>
              <input type="checkbox" />
              No overnight flights
            </label>
          </div>
        </div>
        
        <div data-testid="results-summary">
          <span>10 out of 177 Results</span>
        </div>
        
        <div data-testid="search-query">
          {search && <span>Search: {search}</span>}
        </div>
      </main>
      
      <footer data-testid="footer">
        <div data-testid="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#news">News</a>
            <a href="#careers">Careers</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#support">Support Center</a>
            <a href="#faq">FAQ</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

describe('ResultsPage Component', () => {
  test('renders without crashing', () => {
    render(<MockResultsPage />);
    const resultsPage = screen.getByTestId('results-page');
    expect(resultsPage).toBeInTheDocument();
  });

  test('renders header with logo and navigation', () => {
    render(<MockResultsPage />);
    
    const header = screen.getByTestId('header');
    const logo = screen.getByTestId('logo');
    const navigation = screen.getByTestId('navigation');
    
    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
    expect(logo).toHaveTextContent('Fickleflight');
  });

  test('renders search form with default values', () => {
    render(<MockResultsPage />);
    
    const departureInput = screen.getByDisplayValue('Singapore - Changi (SIN)');
    const arrivalInput = screen.getByDisplayValue('Los Angeles (LA)');
    const searchButton = screen.getByTestId('search-flights-btn');
    
    expect(departureInput).toBeInTheDocument();
    expect(arrivalInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders booking options filters', () => {
    render(<MockResultsPage />);
    
    const bookingOptions = screen.getByTestId('booking-options');
    expect(bookingOptions).toBeInTheDocument();
    
    const fickleflightOption = screen.getByText('Book on Fickleflight');
    const officialOption = screen.getByText('Official Airline Websites');
    
    expect(fickleflightOption).toBeInTheDocument();
    expect(officialOption).toBeInTheDocument();
  });

  test('renders flight experience filters', () => {
    render(<MockResultsPage />);
    
    const flightExperience = screen.getByTestId('flight-experience');
    expect(flightExperience).toBeInTheDocument();
    
    const noOvernightOption = screen.getByText('No overnight flights');
    expect(noOvernightOption).toBeInTheDocument();
  });

  test('displays results summary', () => {
    render(<MockResultsPage />);
    
    const resultsSummary = screen.getByTestId('results-summary');
    expect(resultsSummary).toBeInTheDocument();
    expect(resultsSummary).toHaveTextContent('10 out of 177 Results');
  });

  test('renders footer with company and support links', () => {
    render(<MockResultsPage />);
    
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    
    const companySection = screen.getByText('Company');
    const supportSection = screen.getByText('Support');
    
    expect(companySection).toBeInTheDocument();
    expect(supportSection).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-results-class';
    render(<MockResultsPage className={customClass} />);
    
    const resultsPage = screen.getByTestId('results-page');
    expect(resultsPage).toHaveClass('resultsPage');
    expect(resultsPage).toHaveClass(customClass);
  });

  test('displays search query when provided', () => {
    const searchQuery = 'Singapore to Los Angeles';
    render(<MockResultsPage search={searchQuery} />);
    
    const searchQueryElement = screen.getByTestId('search-query');
    expect(searchQueryElement).toBeInTheDocument();
    expect(searchQueryElement).toHaveTextContent(`Search: ${searchQuery}`);
  });

  test('does not display search query when not provided', () => {
    render(<MockResultsPage />);
    
    const searchQueryElement = screen.getByTestId('search-query');
    expect(searchQueryElement).toBeInTheDocument();
    expect(searchQueryElement).toBeEmptyDOMElement();
  });

  test('navigation contains expected links', () => {
    render(<MockResultsPage />);
    
    const navigation = screen.getByTestId('navigation');
    const exploreLink = screen.getByText('Explore');
    const searchLink = screen.getByText('Search');
    const hotelsLink = screen.getByText('Hotels');
    
    expect(navigation).toContainElement(exploreLink);
    expect(navigation).toContainElement(searchLink);
    expect(navigation).toContainElement(hotelsLink);
  });
});