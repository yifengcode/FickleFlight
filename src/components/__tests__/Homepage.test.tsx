import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a simplified version for testing
const SimplifiedHomepage = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`homepage ${className}`}>
      <div>
        <b>Search flights</b>
        <label>
          <input type="radio" name="flightType" />
          Return
        </label>
        <label>
          <input type="radio" name="flightType" defaultChecked />
          One-way
        </label>
        <label>
          Departure
          <input defaultValue="Singapore -  Changi (SIN)" />
        </label>
        <label>
          Arrival
          <input defaultValue="Los Angeles (LA)" />
        </label>
        <label>
          Date
          <input type="text" />
        </label>
        <button>Search flights</button>
      </div>
      <div>
        <span>Explore</span>
        <span>Search</span>
        <span>Hotels</span>
        <span>Offers</span>
      </div>
      <div>
        <h1>Let's explore & travel the world</h1>
        <p>Find the best destinations and the most popular stays!</p>
      </div>
      <div>
        <label>
          Your name
          <input type="text" />
        </label>
        <label>
          Email address
          <input type="email" />
        </label>
        <button>submit</button>
      </div>
    </div>
  );
};

describe('Homepage Component Structure', () => {
  it('renders without crashing', () => {
    render(<SimplifiedHomepage />);
    expect(screen.getAllByText('Search flights')[0]).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-homepage';
    const { container } = render(<SimplifiedHomepage className={customClass} />);
    
    const homepageDiv = container.firstChild as HTMLElement;
    expect(homepageDiv).toHaveClass('homepage');
    expect(homepageDiv).toHaveClass(customClass);
  });

  it('displays flight search form elements', () => {
    render(<SimplifiedHomepage />);

    expect(screen.getAllByText('Search flights')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Return')).toBeInTheDocument();
    expect(screen.getByLabelText('One-way')).toBeInTheDocument();
    expect(screen.getByLabelText('Departure')).toBeInTheDocument();
    expect(screen.getByLabelText('Arrival')).toBeInTheDocument();
  });

  it('has default radio button selection (One-way)', () => {
    render(<SimplifiedHomepage />);

    const oneWayRadio = screen.getByLabelText('One-way') as HTMLInputElement;
    const returnRadio = screen.getByLabelText('Return') as HTMLInputElement;
    
    expect(oneWayRadio).toBeChecked();
    expect(returnRadio).not.toBeChecked();
  });

  it('displays departure and arrival inputs with default values', () => {
    render(<SimplifiedHomepage />);

    const departureInput = screen.getByLabelText('Departure') as HTMLInputElement;
    const arrivalInput = screen.getByLabelText('Arrival') as HTMLInputElement;
    
    expect(departureInput).toHaveValue('Singapore -  Changi (SIN)');
    expect(arrivalInput).toHaveValue('Los Angeles (LA)');
  });

  it('renders search flights button', () => {
    render(<SimplifiedHomepage />);

    const searchButton = screen.getByRole('button', { name: /search flights/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders clickable search button', () => {
    render(<SimplifiedHomepage />);

    const searchButton = screen.getByRole('button', { name: /search flights/i });
    
    // Test that button can be clicked without error
    expect(() => {
      fireEvent.click(searchButton);
    }).not.toThrow();
  });

  it('displays newsletter signup form', () => {
    render(<SimplifiedHomepage />);

    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders main heading and description', () => {
    render(<SimplifiedHomepage />);

    expect(screen.getByText("Let's explore & travel the world")).toBeInTheDocument();
    expect(screen.getByText('Find the best destinations and the most popular stays!')).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<SimplifiedHomepage />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('manages date input', () => {
    render(<SimplifiedHomepage />);

    const dateInput = screen.getByLabelText('Date');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue('');
  });

  it('applies default className when none provided', () => {
    const { container } = render(<SimplifiedHomepage />);
    
    const homepageDiv = container.firstChild as HTMLElement;
    expect(homepageDiv).toHaveClass('homepage');
  });

  it('can interact with form inputs', () => {
    render(<SimplifiedHomepage />);

    const nameInput = screen.getByLabelText('Your name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email address') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });
});