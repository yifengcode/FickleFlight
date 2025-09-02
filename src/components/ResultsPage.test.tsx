import { render, screen } from '../test-utils';
import ResultsPage from './ResultsPage';

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

describe('ResultsPage', () => {
  it('renders without crashing', () => {
    expect(() => render(<ResultsPage />)).not.toThrow();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-results-class';
    const { container } = render(<ResultsPage className={customClass} />);
    
    const resultsDiv = container.querySelector('.resultsPage');
    expect(resultsDiv).toHaveClass(customClass);
  });

  it('renders within localization provider', () => {
    render(<ResultsPage />);
    expect(screen.getByTestId('localization-provider')).toBeInTheDocument();
  });

  it('renders the results page content', () => {
    const { container } = render(<ResultsPage />);
    
    // Check that the main results page class is present
    expect(container.querySelector('.resultsPage')).toBeInTheDocument();
  });

  it('renders with search prop', () => {
    const searchTerm = 'test search';
    expect(() => render(<ResultsPage search={searchTerm} />)).not.toThrow();
  });

  it('renders date picker', () => {
    render(<ResultsPage />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('renders flight search form', () => {
    render(<ResultsPage />);
    
    // Check for some common elements that should be present
    expect(screen.getByText('Where are you off too?')).toBeInTheDocument();
  });

  it('renders footer section', () => {
    render(<ResultsPage />);
    
    // Check for footer content
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });
});