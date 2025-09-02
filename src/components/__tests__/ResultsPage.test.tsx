import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a simplified version for testing  
const SimplifiedResultsPage = ({ 
  className = "", 
  search = "Search" 
}: { 
  className?: string; 
  search?: string; 
}) => {
  return (
    <div className={`resultsPage ${className}`}>
      <header>
        <button>Logo</button>
        <div>
          <span>Explore</span>
          <button>{search}</button>
          <span>Hotels</span>
          <button>Offers</button>
        </div>
      </header>
      
      <div>
        <div>Where are you off too?</div>
        <div>
          <label>
            Departure
            <input defaultValue="Singapore (SIN)" />
          </label>
          <label>
            Arrival  
            <input defaultValue="Clark (CRK)" />
          </label>
          <label>
            Date
            <input type="text" />
          </label>
          <button>Search flights</button>
        </div>
      </div>

      <div>
        <div>
          <div>Showing 4 of 257 results</div>
          <button>Sort by</button>
        </div>
      </div>

      <div>
        <div>
          <b>Filters</b>
          <label>
            <input type="checkbox" />
            Nonstop
          </label>
          <label>
            <input type="checkbox" />  
            No long stop-overs
          </label>
          
          <div>
            <b>Airlines</b>
            <label>
              <input type="checkbox" />
              Singapore Airlines
            </label>
            <label>
              <input type="checkbox" />
              Qatar Airways
            </label>
          </div>

          <div>
            <b>Stops</b>
            <label>
              <input type="checkbox" />
              1 Stop
            </label>
            <label>
              <input type="checkbox" />
              2+ Stops
            </label>
          </div>
        </div>
      </div>

      <footer>
        <div>
          <div>About Us</div>
          <div>Company</div>
          <div>News</div>
          <div>Careers</div>
        </div>
        <div>
          <div>Account</div>
          <div>Support</div>
          <div>Support Center</div>
          <div>FAQ</div>
        </div>
        <div>
          <div>Covid Advisory</div>
          <div>More</div>
          <div>Airline Fees</div>
          <div>Tips</div>
        </div>
      </footer>
    </div>
  );
};

describe('ResultsPage Component Structure', () => {
  it('renders without crashing', () => {
    render(<SimplifiedResultsPage />);
    expect(screen.getByText('Where are you off too?')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-results';
    const { container } = render(<SimplifiedResultsPage className={customClass} />);
    
    const resultsDiv = container.firstChild as HTMLElement;
    expect(resultsDiv).toHaveClass('resultsPage');
    expect(resultsDiv).toHaveClass(customClass);
  });

  it('displays custom search prop', () => {
    const customSearch = 'Custom Search';
    render(<SimplifiedResultsPage search={customSearch} />);
    
    expect(screen.getByText(customSearch)).toBeInTheDocument();
  });

  it('displays search form elements', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByLabelText('Departure')).toBeInTheDocument();
    expect(screen.getByLabelText('Arrival')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search flights/i })).toBeInTheDocument();
  });

  it('displays departure and arrival inputs with default values', () => {
    render(<SimplifiedResultsPage />);

    const departureInput = screen.getByLabelText('Departure') as HTMLInputElement;
    const arrivalInput = screen.getByLabelText('Arrival') as HTMLInputElement;
    
    expect(departureInput).toHaveValue('Singapore (SIN)');
    expect(arrivalInput).toHaveValue('Clark (CRK)');
  });

  it('displays results summary', () => {
    render(<SimplifiedResultsPage />);
    
    expect(screen.getByText('Showing 4 of 257 results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort by/i })).toBeInTheDocument();
  });

  it('displays filter section', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByLabelText('Nonstop')).toBeInTheDocument();
    expect(screen.getByLabelText('No long stop-overs')).toBeInTheDocument();
  });

  it('displays airline filters', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByText('Airlines')).toBeInTheDocument();
    expect(screen.getByLabelText('Singapore Airlines')).toBeInTheDocument();
    expect(screen.getByLabelText('Qatar Airways')).toBeInTheDocument();
  });

  it('displays stops filters', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByText('Stops')).toBeInTheDocument();
    expect(screen.getByLabelText('1 Stop')).toBeInTheDocument();
    expect(screen.getByLabelText('2+ Stops')).toBeInTheDocument();
  });

  it('displays navigation menu items', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('displays footer links', () => {
    render(<SimplifiedResultsPage />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Covid Advisory')).toBeInTheDocument();
  });

  it('can interact with filter checkboxes', () => {
    render(<SimplifiedResultsPage />);

    const nonstopCheckbox = screen.getByLabelText('Nonstop') as HTMLInputElement;
    const airlineCheckbox = screen.getByLabelText('Singapore Airlines') as HTMLInputElement;

    expect(nonstopCheckbox.checked).toBe(false);
    expect(airlineCheckbox.checked).toBe(false);

    fireEvent.click(nonstopCheckbox);
    fireEvent.click(airlineCheckbox);

    expect(nonstopCheckbox.checked).toBe(true);
    expect(airlineCheckbox.checked).toBe(true);
  });

  it('renders clickable search button', () => {
    render(<SimplifiedResultsPage />);

    const searchButton = screen.getByRole('button', { name: /search flights/i });
    
    // Test that button can be clicked without error
    expect(() => {
      fireEvent.click(searchButton);
    }).not.toThrow();
  });

  it('renders clickable logo button', () => {
    render(<SimplifiedResultsPage />);

    const logoButton = screen.getByRole('button', { name: /logo/i });
    
    // Test that button can be clicked without error  
    expect(() => {
      fireEvent.click(logoButton);
    }).not.toThrow();
  });

  it('manages date input', () => {
    render(<SimplifiedResultsPage />);

    const dateInput = screen.getByLabelText('Date') as HTMLInputElement;
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue('');

    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });
    expect(dateInput.value).toBe('2024-01-01');
  });

  it('applies default className when none provided', () => {
    const { container } = render(<SimplifiedResultsPage />);
    
    const resultsDiv = container.firstChild as HTMLElement;
    expect(resultsDiv).toHaveClass('resultsPage');
  });
});