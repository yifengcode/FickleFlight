// Test utilities and helper functions for flight search functionality
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Simple utility functions that could be used in the app
export const validateFlightForm = (departure: string, arrival: string, date: string) => {
  const errors: string[] = [];
  
  if (!departure.trim()) {
    errors.push('Departure is required');
  }
  
  if (!arrival.trim()) {
    errors.push('Arrival is required');
  }
  
  if (!date.trim()) {
    errors.push('Date is required');
  }
  
  if (departure === arrival && departure.trim() && arrival.trim()) {
    errors.push('Departure and arrival cannot be the same');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatAirportName = (airportCode: string) => {
  const airportMap: { [key: string]: string } = {
    'SIN': 'Singapore - Changi',
    'LA': 'Los Angeles',
    'SYD': 'Sydney',
    'CRK': 'Clark',
    'LST': 'Launceston',
    'KLO': 'Kalibo',
    'CMB': 'Colombo',
    'AVV': 'Melbourne'
  };
  
  return airportMap[airportCode] || airportCode;
};

// Mock component for testing form validation
const FlightSearchForm = () => {
  const [departure, setDeparture] = React.useState('');
  const [arrival, setArrival] = React.useState('');
  const [date, setDate] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = () => {
    const validation = validateFlightForm(departure, arrival, date);
    setErrors(validation.errors);
    return validation.isValid;
  };

  return (
    <div>
      <input
        data-testid="departure-input"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        placeholder="Departure"
      />
      <input
        data-testid="arrival-input"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        placeholder="Arrival"
      />
      <input
        data-testid="date-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <button data-testid="submit-button" onClick={handleSubmit}>
        Search
      </button>
      {errors.length > 0 && (
        <div data-testid="errors">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

describe('Flight Search Utilities', () => {
  describe('validateFlightForm', () => {
    it('returns valid for complete form', () => {
      const result = validateFlightForm('SIN', 'LA', '2024-01-01');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns invalid for empty departure', () => {
      const result = validateFlightForm('', 'LA', '2024-01-01');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Departure is required');
    });

    it('returns invalid for empty arrival', () => {
      const result = validateFlightForm('SIN', '', '2024-01-01');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Arrival is required');
    });

    it('returns invalid for empty date', () => {
      const result = validateFlightForm('SIN', 'LA', '');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Date is required');
    });

    it('returns invalid when departure equals arrival', () => {
      const result = validateFlightForm('SIN', 'SIN', '2024-01-01');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Departure and arrival cannot be the same');
    });

    it('returns multiple errors for multiple issues', () => {
      const result = validateFlightForm('', '', '');
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });

  describe('formatAirportName', () => {
    it('formats known airport codes correctly', () => {
      expect(formatAirportName('SIN')).toBe('Singapore - Changi');
      expect(formatAirportName('LA')).toBe('Los Angeles');
      expect(formatAirportName('SYD')).toBe('Sydney');
    });

    it('returns original code for unknown airports', () => {
      expect(formatAirportName('UNKNOWN')).toBe('UNKNOWN');
      expect(formatAirportName('XYZ')).toBe('XYZ');
    });
  });
});

describe('FlightSearchForm Integration', () => {
  it('renders form fields', () => {
    render(<FlightSearchForm />);
    
    expect(screen.getByTestId('departure-input')).toBeInTheDocument();
    expect(screen.getByTestId('arrival-input')).toBeInTheDocument();
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation errors on invalid submission', () => {
    render(<FlightSearchForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.getByTestId('errors')).toBeInTheDocument();
    expect(screen.getByText('Departure is required')).toBeInTheDocument();
    expect(screen.getByText('Arrival is required')).toBeInTheDocument();
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('handles form input correctly', () => {
    render(<FlightSearchForm />);
    
    const departureInput = screen.getByTestId('departure-input');
    const arrivalInput = screen.getByTestId('arrival-input');
    
    fireEvent.change(departureInput, { target: { value: 'SIN' } });
    fireEvent.change(arrivalInput, { target: { value: 'LA' } });
    
    expect(departureInput).toHaveValue('SIN');
    expect(arrivalInput).toHaveValue('LA');
  });
});