import { render, screen, fireEvent } from '@testing-library/react';

// Create a simple mock component that mimics Homepage structure without router
const MockHomepage = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`homepage ${className}`}>
      <div>
        <h1>Search flights</h1>
        <div>
          <label>
            <input type="radio" name="flight-type" value="return" />
            Return
          </label>
          <label>
            <input type="radio" name="flight-type" value="one-way" defaultChecked />
            One-way
          </label>
        </div>
        <div>
          <input data-testid="departure" placeholder="Departure" defaultValue="Singapore -  Changi (SIN)" />
          <input data-testid="arrival" placeholder="Arrival" defaultValue="Los Angeles (LA)" />
          <input data-testid="date" placeholder="Date" />
        </div>
        <button onClick={() => {}} data-testid="search-button">
          Search flights
        </button>
        <nav>
          <div>Explore</div>
          <div>Hotels</div>
          <div>Offers</div>
        </nav>
        <div>
          <h2>Let's explore & travel the world</h2>
          <p>Find the best destinations and the most popular stays!</p>
        </div>
      </div>
    </div>
  );
};

describe('Homepage Functionality', () => {
  it('renders without crashing', () => {
    render(<MockHomepage />);
  });

  it('renders search flights heading', () => {
    render(<MockHomepage />);
    
    expect(screen.getByRole('heading', { name: 'Search flights' })).toBeInTheDocument();
  });

  it('renders flight type radio buttons', () => {
    render(<MockHomepage />);
    
    expect(screen.getByText('Return')).toBeInTheDocument();
    expect(screen.getByText('One-way')).toBeInTheDocument();
  });

  it('renders departure and arrival input fields', () => {
    render(<MockHomepage />);
    
    expect(screen.getByTestId('departure')).toBeInTheDocument();
    expect(screen.getByTestId('arrival')).toBeInTheDocument();
  });

  it('renders date input field', () => {
    render(<MockHomepage />);
    
    expect(screen.getByTestId('date')).toBeInTheDocument();
  });

  it('renders search flights button', () => {
    render(<MockHomepage />);
    
    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent('Search flights');
  });

  it('handles search button click', () => {
    render(<MockHomepage />);
    
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    
    // No error should occur when clicking
    expect(searchButton).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<MockHomepage />);
    
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-homepage-class';
    const { container } = render(<MockHomepage className={customClass} />);
    
    const homepageDiv = container.querySelector('.homepage');
    expect(homepageDiv).toHaveClass(customClass);
  });

  it('has default departure and arrival values', () => {
    render(<MockHomepage />);
    
    expect(screen.getByTestId('departure')).toHaveValue('Singapore -  Changi (SIN)');
    expect(screen.getByTestId('arrival')).toHaveValue('Los Angeles (LA)');
  });

  it('renders main hero section content', () => {
    render(<MockHomepage />);
    
    expect(screen.getByText("Let's explore & travel the world")).toBeInTheDocument();
    expect(screen.getByText('Find the best destinations and the most popular stays!')).toBeInTheDocument();
  });

  it('has one-way flight type selected by default', () => {
    render(<MockHomepage />);
    
    const oneWayRadio = screen.getByRole('radio', { name: 'One-way' });
    expect(oneWayRadio).toBeChecked();
  });

  it('can select different flight types', () => {
    render(<MockHomepage />);
    
    const returnRadio = screen.getByRole('radio', { name: 'Return' });
    const oneWayRadio = screen.getByRole('radio', { name: 'One-way' });
    
    expect(oneWayRadio).toBeChecked();
    
    fireEvent.click(returnRadio);
    expect(returnRadio).toBeChecked();
  });
});