import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Homepage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders without crashing', () => {
    render(<Homepage />);
    
    // Check that the component renders
    const searchText = screen.getByText('Search flights');
    expect(searchText).toBeInTheDocument();
  });

  test('renders main title', () => {
    render(<Homepage />);
    
    expect(screen.getByText(/Let's explore & travel the world/)).toBeInTheDocument();
    expect(screen.getByText('Find the best destinations and the most popular stays!')).toBeInTheDocument();
  });

  test('renders flight type radio buttons', () => {
    render(<Homepage />);
    
    const returnRadio = screen.getByLabelText('Return');
    const oneWayRadio = screen.getByLabelText('One-way');
    
    expect(returnRadio).toBeInTheDocument();
    expect(oneWayRadio).toBeInTheDocument();
    expect(oneWayRadio).toBeChecked(); // One-way is checked by default
  });

  test('renders autocomplete fields', () => {
    render(<Homepage />);
    
    const departureField = screen.getByLabelText('Departure');
    const arrivalField = screen.getByLabelText('Arrival');
    
    expect(departureField).toBeInTheDocument();
    expect(arrivalField).toBeInTheDocument();
  });

  test('renders date picker', () => {
    render(<Homepage />);
    
    const dateField = screen.getByLabelText('Date');
    expect(dateField).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(<Homepage />);
    
    const searchButton = screen.getByRole('button', { name: /search flights/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-homepage';
    render(<Homepage className={customClass} />);
    
    const homepage = document.querySelector('.homepage');
    expect(homepage).toHaveClass(customClass);
  });

  test('renders navigation menu items', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  test('does not show popup initially', () => {
    render(<Homepage />);
    
    // Popup should not be visible initially
    expect(screen.queryByRole('iframe')).not.toBeInTheDocument();
  });

  test('renders footer section', () => {
    render(<Homepage />);
    
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
});