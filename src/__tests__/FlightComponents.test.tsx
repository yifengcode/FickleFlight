import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Simple card component for displaying flight information
const FlightCard = ({ 
  departure, 
  arrival, 
  price, 
  duration, 
  airline,
  isSelected = false,
  onSelect 
}) => {
  return (
    <div 
      className={`flight-card ${isSelected ? 'selected' : ''}`}
      data-testid="flight-card"
      onClick={onSelect}
    >
      <div className="flight-route">
        <span className="departure">{departure}</span>
        <span className="arrow">→</span>
        <span className="arrival">{arrival}</span>
      </div>
      <div className="flight-details">
        <div className="airline">{airline}</div>
        <div className="duration">{duration}</div>
        <div className="price">{price}</div>
      </div>
    </div>
  );
};

// Simple loading component
const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading" data-testid="loading">
      <div className="spinner"></div>
      <span>{message}</span>
    </div>
  );
};

// Error component
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message" data-testid="error-message">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} data-testid="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

// Search results component
const SearchResults = ({ flights = [], loading = false, error = null }) => {
  if (loading) {
    return <Loading message="Searching for flights..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (flights.length === 0) {
    return (
      <div data-testid="no-results">
        <p>No flights found. Please try different search criteria.</p>
      </div>
    );
  }

  return (
    <div className="search-results" data-testid="search-results">
      <p>{flights.length} flight(s) found</p>
      {flights.map((flight, index) => (
        <FlightCard
          key={index}
          departure={flight.departure}
          arrival={flight.arrival}
          price={flight.price}
          duration={flight.duration}
          airline={flight.airline}
        />
      ))}
    </div>
  );
};

describe('Flight Components', () => {
  describe('FlightCard', () => {
    const mockFlight = {
      departure: 'Singapore (SIN)',
      arrival: 'Los Angeles (LAX)',
      price: '$286',
      duration: '17h 45m',
      airline: 'Singapore Airlines'
    };

    test('renders flight information correctly', () => {
      render(<FlightCard {...mockFlight} />);
      
      expect(screen.getByText('Singapore (SIN)')).toBeInTheDocument();
      expect(screen.getByText('Los Angeles (LAX)')).toBeInTheDocument();
      expect(screen.getByText('$286')).toBeInTheDocument();
      expect(screen.getByText('17h 45m')).toBeInTheDocument();
      expect(screen.getByText('Singapore Airlines')).toBeInTheDocument();
    });

    test('shows arrow between departure and arrival', () => {
      render(<FlightCard {...mockFlight} />);
      expect(screen.getByText('→')).toBeInTheDocument();
    });

    test('applies selected class when selected', () => {
      render(<FlightCard {...mockFlight} isSelected={true} />);
      const card = screen.getByTestId('flight-card');
      expect(card).toHaveClass('selected');
    });

    test('does not apply selected class when not selected', () => {
      render(<FlightCard {...mockFlight} isSelected={false} />);
      const card = screen.getByTestId('flight-card');
      expect(card).not.toHaveClass('selected');
    });
  });

  describe('Loading', () => {
    test('renders with default message', () => {
      render(<Loading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders with custom message', () => {
      render(<Loading message="Searching for flights..." />);
      expect(screen.getByText('Searching for flights...')).toBeInTheDocument();
    });

    test('has correct test id', () => {
      render(<Loading />);
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  describe('ErrorMessage', () => {
    test('renders error message', () => {
      render(<ErrorMessage message="Something went wrong" />);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    test('renders retry button when onRetry provided', () => {
      const handleRetry = jest.fn();
      render(<ErrorMessage message="Error" onRetry={handleRetry} />);
      expect(screen.getByTestId('retry-button')).toBeInTheDocument();
    });

    test('does not render retry button when onRetry not provided', () => {
      render(<ErrorMessage message="Error" />);
      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });
  });

  describe('SearchResults', () => {
    test('shows loading state', () => {
      render(<SearchResults loading={true} />);
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    test('shows error state', () => {
      render(<SearchResults error="Network error" />);
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    test('shows no results message when flights array is empty', () => {
      render(<SearchResults flights={[]} />);
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText(/No flights found/)).toBeInTheDocument();
    });

    test('renders flight results when flights provided', () => {
      const flights = [
        {
          departure: 'Singapore (SIN)',
          arrival: 'Los Angeles (LAX)',
          price: '$286',
          duration: '17h 45m',
          airline: 'Singapore Airlines'
        },
        {
          departure: 'Singapore (SIN)',
          arrival: 'London (LHR)',
          price: '$450',
          duration: '13h 30m',
          airline: 'British Airways'
        }
      ];

      render(<SearchResults flights={flights} />);
      
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
      expect(screen.getByText('2 flight(s) found')).toBeInTheDocument();
      expect(screen.getAllByTestId('flight-card')).toHaveLength(2);
    });

    test('loading state takes priority over other states', () => {
      const flights = [{ departure: 'A', arrival: 'B', price: '$100', duration: '2h', airline: 'Test' }];
      render(<SearchResults flights={flights} loading={true} error="Error" />);
      
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    });

    test('error state takes priority over flights', () => {
      const flights = [{ departure: 'A', arrival: 'B', price: '$100', duration: '2h', airline: 'Test' }];
      render(<SearchResults flights={flights} error="Error occurred" />);
      
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    });
  });
});