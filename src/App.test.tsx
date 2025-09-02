import { render } from './test-utils';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom');

// Mock PortalPopup component
jest.mock('./components/PortalPopup', () => {
  return function MockPortalPopup() {
    return <div data-testid="portal-popup">Portal Popup</div>;
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders the PortalPopup component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('portal-popup')).toBeInTheDocument();
  });
});