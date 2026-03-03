import { render } from '../test-utils';
import HotelsPage from './HotelsPage';

// Mock react-router-dom
jest.mock('react-router-dom');

// Mock the popup components
jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup() {
    return <div data-testid="matterhorn-popup">Matterhorn Popup</div>;
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children }: { children: React.ReactNode }) {
    return <div data-testid="portal-popup">{children}</div>;
  };
});

describe('HotelsPage', () => {
  it('renders without crashing', () => {
    expect(() => render(<HotelsPage />)).not.toThrow();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-hotels-class';
    const { container } = render(<HotelsPage className={customClass} />);
    
    const hotelsDiv = container.querySelector('.hotelsPage');
    expect(hotelsDiv).toHaveClass(customClass);
  });

  it('renders the hotels page content', () => {
    const { container } = render(<HotelsPage />);
    
    // Check that the main hotels page class is present
    expect(container.querySelector('.hotelsPage')).toBeInTheDocument();
  });
});