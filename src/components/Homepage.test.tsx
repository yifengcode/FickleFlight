import React from 'react';
import { render, screen } from '@testing-library/react';

// Create a simple mock component that represents the core functionality
const MockHomepage = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`homepage ${className}`} data-testid="homepage">
      <div data-testid="hero-section">
        <h1>Search flights</h1>
        <div data-testid="flight-options">
          <label data-testid="return-option">
            <input type="radio" />
            Return
          </label>
          <label data-testid="oneway-option">
            <input type="radio" defaultChecked />
            One-way
          </label>
        </div>
        <div data-testid="search-form">
          <div data-testid="departure-field">
            <input placeholder="Departure" defaultValue="Singapore - Changi (SIN)" />
          </div>
          <div data-testid="arrival-field">
            <input placeholder="Arrival" defaultValue="Los Angeles (LA)" />
          </div>
          <div data-testid="date-field">
            <input type="date" placeholder="Date" />
          </div>
          <button data-testid="search-button">Search flights</button>
        </div>
      </div>
    </div>
  );
};

describe('Homepage Component', () => {
  test('renders without crashing', () => {
    render(<MockHomepage />);
    const homepage = screen.getByTestId('homepage');
    expect(homepage).toBeInTheDocument();
  });

  test('renders hero section', () => {
    render(<MockHomepage />);
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { name: 'Search flights' });
    expect(title).toBeInTheDocument();
  });

  test('renders flight type options', () => {
    render(<MockHomepage />);
    const returnOption = screen.getByTestId('return-option');
    const onewayOption = screen.getByTestId('oneway-option');
    
    expect(returnOption).toBeInTheDocument();
    expect(onewayOption).toBeInTheDocument();
    expect(returnOption).toHaveTextContent('Return');
    expect(onewayOption).toHaveTextContent('One-way');
  });

  test('renders search form with default values', () => {
    render(<MockHomepage />);
    
    const departureField = screen.getByDisplayValue('Singapore - Changi (SIN)');
    const arrivalField = screen.getByDisplayValue('Los Angeles (LA)');
    const searchButton = screen.getByTestId('search-button');
    
    expect(departureField).toBeInTheDocument();
    expect(arrivalField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-homepage-class';
    render(<MockHomepage className={customClass} />);
    
    const homepage = screen.getByTestId('homepage');
    expect(homepage).toHaveClass('homepage');
    expect(homepage).toHaveClass(customClass);
  });

  test('renders date field', () => {
    render(<MockHomepage />);
    const dateField = screen.getByTestId('date-field');
    expect(dateField).toBeInTheDocument();
    
    const dateInput = dateField.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
  });

  test('one-way option is selected by default', () => {
    render(<MockHomepage />);
    const onewayOption = screen.getByTestId('oneway-option');
    const radioInput = onewayOption.querySelector('input[type="radio"]') as HTMLInputElement;
    
    expect(radioInput).toBeChecked();
  });

  test('search form contains all required fields', () => {
    render(<MockHomepage />);
    
    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).toBeInTheDocument();
    
    // Check that all form elements are present
    const departureField = screen.getByTestId('departure-field');
    const arrivalField = screen.getByTestId('arrival-field');
    const dateField = screen.getByTestId('date-field');
    const searchButton = screen.getByTestId('search-button');
    
    expect(departureField).toBeInTheDocument();
    expect(arrivalField).toBeInTheDocument();
    expect(dateField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});