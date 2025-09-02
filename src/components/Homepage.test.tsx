import { render, screen } from '../test-utils';
import Homepage from './Homepage';

// Mock react-router-dom
jest.mock('react-router-dom');

// Mock the entire @mui/x-date-pickers module
jest.mock('@mui/x-date-pickers', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="localization-provider">{children}</div>,
  DatePicker: ({ label, onChange }: { label?: string; onChange?: (value: any) => void }) => (
    <input 
      data-testid="date-picker" 
      aria-label={label || "Date"}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={label || "Date"}
    />
  ),
}));

// Mock AdapterDateFns separately
jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({
  AdapterDateFns: function MockAdapterDateFns() {
    return {};
  },
}));

// Mock the popup components
jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup({ onClose }: { onClose?: () => void }) {
    return (
      <div data-testid="matterhorn-popup">
        <button onClick={onClose} data-testid="close-popup">Close</button>
      </div>
    );
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children, onOutsideClick }: { children: React.ReactNode; onOutsideClick?: () => void }) {
    return (
      <div data-testid="portal-popup" onClick={onOutsideClick}>
        {children}
      </div>
    );
  };
});

describe('Homepage', () => {
  it('renders without crashing', () => {
    expect(() => render(<Homepage />)).not.toThrow();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-homepage-class';
    const { container } = render(<Homepage className={customClass} />);
    
    const homepageDiv = container.querySelector('.homepage');
    expect(homepageDiv).toHaveClass(customClass);
  });

  it('renders within localization provider', () => {
    render(<Homepage />);
    expect(screen.getByTestId('localization-provider')).toBeInTheDocument();
  });

  it('renders search flights section', () => {
    render(<Homepage />);
    expect(screen.getAllByText('Search flights')[0]).toBeInTheDocument();
  });

  it('renders flight type radio buttons', () => {
    render(<Homepage />);
    expect(screen.getByLabelText('Return')).toBeInTheDocument();
    expect(screen.getByLabelText('One-way')).toBeInTheDocument();
  });

  it('renders departure and arrival autocomplete fields', () => {
    render(<Homepage />);
    expect(screen.getByLabelText('Departure')).toBeInTheDocument();
    expect(screen.getByLabelText('Arrival')).toBeInTheDocument();
  });

  it('renders date picker', () => {
    render(<Homepage />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('renders search flights button', () => {
    render(<Homepage />);
    const searchButtons = screen.getAllByText('Search flights');
    // Find the button element specifically
    const searchButton = searchButtons.find(el => el.closest('button'));
    expect(searchButton).toBeInTheDocument();
  });

  it('has departure and arrival fields with values', () => {
    render(<Homepage />);
    
    // These might be in input elements inside the Autocomplete components
    const inputs = screen.getAllByRole('combobox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders upcoming flight section', () => {
    render(<Homepage />);
    expect(screen.getByText('Upcoming Flight')).toBeInTheDocument();
    expect(screen.getByText('SIN')).toBeInTheDocument();
    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('15H 55M')).toBeInTheDocument();
  });

  it('does not show matterhorn popup by default', () => {
    render(<Homepage />);
    expect(screen.queryByTestId('matterhorn-popup')).not.toBeInTheDocument();
  });
});