import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock a simple button component to test user interactions
const SimpleButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  className = "",
  variant = "primary" 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} ${className}`}
      data-testid="simple-button"
    >
      {children}
    </button>
  );
};

// Mock a form component to test form interactions
const SimpleForm = ({ onSubmit, initialValues = {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="simple-form">
      <input 
        name="departure" 
        placeholder="Departure city"
        defaultValue={initialValues.departure || ""}
        data-testid="departure-input"
      />
      <input 
        name="arrival" 
        placeholder="Arrival city"
        defaultValue={initialValues.arrival || ""}
        data-testid="arrival-input"
      />
      <select name="flightType" defaultValue={initialValues.flightType || "one-way"}>
        <option value="one-way">One-way</option>
        <option value="return">Return</option>
      </select>
      <SimpleButton type="submit">Search Flights</SimpleButton>
    </form>
  );
};

describe('Interactive Components', () => {
  describe('SimpleButton', () => {
    test('renders button with text', () => {
      render(<SimpleButton>Click me</SimpleButton>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<SimpleButton onClick={handleClick}>Click me</SimpleButton>);
      
      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('can be disabled', () => {
      render(<SimpleButton disabled>Disabled button</SimpleButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('applies custom className', () => {
      render(<SimpleButton className="custom-class">Button</SimpleButton>);
      const button = screen.getByTestId('simple-button');
      expect(button).toHaveClass('custom-class');
    });

    test('applies variant class', () => {
      render(<SimpleButton variant="secondary">Button</SimpleButton>);
      const button = screen.getByTestId('simple-button');
      expect(button).toHaveClass('secondary');
    });
  });

  describe('SimpleForm', () => {
    test('renders form with input fields', () => {
      render(<SimpleForm onSubmit={jest.fn()} />);
      
      expect(screen.getByPlaceholderText('Departure city')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Arrival city')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Search Flights')).toBeInTheDocument();
    });

    test('has default values when provided', () => {
      const initialValues = {
        departure: 'Singapore',
        arrival: 'Los Angeles',
        flightType: 'return'
      };
      
      render(<SimpleForm onSubmit={jest.fn()} initialValues={initialValues} />);
      
      expect(screen.getByDisplayValue('Singapore')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Los Angeles')).toBeInTheDocument();
      // Check that the return option is selected
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toHaveValue('return');
    });

    test('submits form with entered values', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn();
      
      render(<SimpleForm onSubmit={handleSubmit} />);
      
      await user.type(screen.getByPlaceholderText('Departure city'), 'New York');
      await user.type(screen.getByPlaceholderText('Arrival city'), 'London');
      await user.selectOptions(screen.getByRole('combobox'), 'return');
      await user.click(screen.getByText('Search Flights'));
      
      expect(handleSubmit).toHaveBeenCalledWith({
        departure: 'New York',
        arrival: 'London',
        flightType: 'return'
      });
    });

    test('can clear and refill form fields', async () => {
      const user = userEvent.setup();
      
      render(<SimpleForm onSubmit={jest.fn()} />);
      
      const departureInput = screen.getByPlaceholderText('Departure city');
      
      await user.type(departureInput, 'Test City');
      expect(departureInput).toHaveValue('Test City');
      
      await user.clear(departureInput);
      expect(departureInput).toHaveValue('');
      
      await user.type(departureInput, 'New City');
      expect(departureInput).toHaveValue('New City');
    });
  });
});