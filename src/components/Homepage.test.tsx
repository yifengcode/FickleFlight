import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Homepage from './Homepage';

// Mock MatterhornPopup component
jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup({ onClose }: { onClose?: () => void }) {
    return (
      <div data-testid="matterhorn-popup">
        <button onClick={onClose} data-testid="close-popup">Close</button>
      </div>
    );
  };
});

// Simple mock for useNavigate
const mockNavigate = jest.fn();
jest.doMock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Homepage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search flights text', () => {
    render(<Homepage />);
    expect(screen.getByText('Search flights')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Homepage className="custom-class" />);
    
    const homepage = container.querySelector('.homepage');
    expect(homepage).toHaveClass('custom-class');
  });

  it('renders flight type radio buttons', () => {
    render(<Homepage />);
    
    expect(screen.getByLabelText('Return')).toBeInTheDocument();
    expect(screen.getByLabelText('One-way')).toBeInTheDocument();
  });

  it('has one-way radio button checked by default', () => {
    render(<Homepage />);
    
    const oneWayRadio = screen.getByLabelText('One-way');
    expect(oneWayRadio).toBeChecked();
  });

  it('renders departure and arrival fields', () => {
    render(<Homepage />);
    
    expect(screen.getByLabelText('Departure')).toBeInTheDocument();
    expect(screen.getByLabelText('Arrival')).toBeInTheDocument();
  });

  it('has default values for departure and arrival', () => {
    render(<Homepage />);
    
    expect(screen.getByDisplayValue('Singapore -  Changi (SIN)')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Los Angeles (LA)')).toBeInTheDocument();
  });

  it('renders date picker', () => {
    render(<Homepage />);
    
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  it('renders search flights button', () => {
    render(<Homepage />);
    
    const searchButton = screen.getByRole('button', { name: /search flights/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders upcoming flight information', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Upcoming Flight')).toBeInTheDocument();
    expect(screen.getByText('SIN')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('15H 55M')).toBeInTheDocument();
  });

  it('does not show popup initially', () => {
    render(<Homepage />);
    
    expect(screen.queryByTestId('matterhorn-popup')).not.toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Homepage />);
    
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support Center')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });
});