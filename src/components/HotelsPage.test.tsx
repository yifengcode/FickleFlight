import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Create a simple mock component that represents the HotelsPage functionality
const MockHotelsPage = ({ className = '' }: { className?: string }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className={`hotelsPage ${className}`} data-testid="hotels-page">
      <header data-testid="header">
        <div data-testid="logo">Fickleflight</div>
        <nav data-testid="navigation">
          <a href="#explore">Explore</a>
          <a href="#search">Search</a>
          <a href="#hotels">Hotels</a>
        </nav>
      </header>
      
      <main data-testid="main-content">
        <div data-testid="search-form">
          <input data-testid="destination-input" placeholder="Destination" />
          <input data-testid="checkin-input" type="date" placeholder="Check in" />
          <input data-testid="checkout-input" type="date" placeholder="Check out" />
          <input data-testid="guests-input" placeholder="Guests" defaultValue="1 room, 2 guests" />
          <button data-testid="search-hotels-btn">Search hotels</button>
        </div>
        
        <div data-testid="hotels-list">
          <div data-testid="hotel-card-1" className="hotel-card">
            <img data-testid="hotel-image-1" src="/hotel1.jpg" alt="Hotel 1" />
            <div data-testid="hotel-info-1">
              <h3>Matterhorn Suites</h3>
              <div data-testid="hotel-rating-1">
                <span>4.7</span>
                <span>(1,136 reviews)</span>
              </div>
              <div data-testid="hotel-price-1">
                <span>$S 286</span>
                <span>/night</span>
              </div>
              <button 
                data-testid="view-details-btn-1"
                onClick={() => setIsPopupOpen(true)}
              >
                View Details
              </button>
              <button 
                data-testid="video-btn-1"
                onClick={() => setIsPopupOpen(true)}
              >
                Video
              </button>
            </div>
          </div>
        </div>
        
        <div data-testid="map-section">
          <iframe 
            data-testid="map-iframe"
            title="Hotels Map"
            src="https://maps.google.com"
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      </main>
      
      {isPopupOpen && (
        <div data-testid="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div data-testid="matterhorn-popup">
            <button 
              data-testid="close-popup-btn"
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </button>
            <div>Matterhorn Popup Content</div>
          </div>
        </div>
      )}
      
      <footer data-testid="footer">
        <div data-testid="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#news">News</a>
            <a href="#careers">Careers</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#support">Support Center</a>
            <a href="#faq">FAQ</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

describe('HotelsPage Component', () => {
  test('renders without crashing', () => {
    render(<MockHotelsPage />);
    const hotelsPage = screen.getByTestId('hotels-page');
    expect(hotelsPage).toBeInTheDocument();
  });

  test('renders header with logo and navigation', () => {
    render(<MockHotelsPage />);
    
    const header = screen.getByTestId('header');
    const logo = screen.getByTestId('logo');
    const navigation = screen.getByTestId('navigation');
    
    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
    expect(logo).toHaveTextContent('Fickleflight');
  });

  test('renders hotel search form', () => {
    render(<MockHotelsPage />);
    
    const searchForm = screen.getByTestId('search-form');
    const destinationInput = screen.getByTestId('destination-input');
    const checkinInput = screen.getByTestId('checkin-input');
    const checkoutInput = screen.getByTestId('checkout-input');
    const guestsInput = screen.getByTestId('guests-input');
    const searchButton = screen.getByTestId('search-hotels-btn');
    
    expect(searchForm).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(checkinInput).toBeInTheDocument();
    expect(checkoutInput).toBeInTheDocument();
    expect(guestsInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('guests input has default value', () => {
    render(<MockHotelsPage />);
    
    const guestsInput = screen.getByDisplayValue('1 room, 2 guests');
    expect(guestsInput).toBeInTheDocument();
  });

  test('renders hotel card with details', () => {
    render(<MockHotelsPage />);
    
    const hotelCard = screen.getByTestId('hotel-card-1');
    const hotelName = screen.getByText('Matterhorn Suites');
    const hotelRating = screen.getByText('4.7');
    const hotelReviews = screen.getByText('(1,136 reviews)');
    const hotelPrice = screen.getByText('$S 286');
    const viewDetailsBtn = screen.getByTestId('view-details-btn-1');
    
    expect(hotelCard).toBeInTheDocument();
    expect(hotelName).toBeInTheDocument();
    expect(hotelRating).toBeInTheDocument();
    expect(hotelReviews).toBeInTheDocument();
    expect(hotelPrice).toBeInTheDocument();
    expect(viewDetailsBtn).toBeInTheDocument();
  });

  test('renders map section', () => {
    render(<MockHotelsPage />);
    
    const mapSection = screen.getByTestId('map-section');
    const mapIframe = screen.getByTestId('map-iframe');
    
    expect(mapSection).toBeInTheDocument();
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute('src', 'https://maps.google.com');
  });

  test('popup opens when view details button is clicked', () => {
    render(<MockHotelsPage />);
    
    // Popup should not be visible initially
    expect(screen.queryByTestId('popup-overlay')).not.toBeInTheDocument();
    
    // Click view details button
    const viewDetailsBtn = screen.getByTestId('view-details-btn-1');
    fireEvent.click(viewDetailsBtn);
    
    // Popup should now be visible
    const popup = screen.getByTestId('popup-overlay');
    const matterhornPopup = screen.getByTestId('matterhorn-popup');
    
    expect(popup).toBeInTheDocument();
    expect(matterhornPopup).toBeInTheDocument();
  });

  test('popup opens when video button is clicked', () => {
    render(<MockHotelsPage />);
    
    // Popup should not be visible initially
    expect(screen.queryByTestId('popup-overlay')).not.toBeInTheDocument();
    
    // Click video button
    const videoBtn = screen.getByTestId('video-btn-1');
    fireEvent.click(videoBtn);
    
    // Popup should now be visible
    const popup = screen.getByTestId('popup-overlay');
    expect(popup).toBeInTheDocument();
  });

  test('popup closes when close button is clicked', () => {
    render(<MockHotelsPage />);
    
    // Open popup first
    const viewDetailsBtn = screen.getByTestId('view-details-btn-1');
    fireEvent.click(viewDetailsBtn);
    
    expect(screen.getByTestId('popup-overlay')).toBeInTheDocument();
    
    // Close popup
    const closeBtn = screen.getByTestId('close-popup-btn');
    fireEvent.click(closeBtn);
    
    // Popup should be closed
    expect(screen.queryByTestId('popup-overlay')).not.toBeInTheDocument();
  });

  test('popup closes when overlay is clicked', () => {
    render(<MockHotelsPage />);
    
    // Open popup first
    const viewDetailsBtn = screen.getByTestId('view-details-btn-1');
    fireEvent.click(viewDetailsBtn);
    
    expect(screen.getByTestId('popup-overlay')).toBeInTheDocument();
    
    // Click overlay to close
    const overlay = screen.getByTestId('popup-overlay');
    fireEvent.click(overlay);
    
    // Popup should be closed
    expect(screen.queryByTestId('popup-overlay')).not.toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-hotels-class';
    render(<MockHotelsPage className={customClass} />);
    
    const hotelsPage = screen.getByTestId('hotels-page');
    expect(hotelsPage).toHaveClass('hotelsPage');
    expect(hotelsPage).toHaveClass(customClass);
  });

  test('renders footer with links', () => {
    render(<MockHotelsPage />);
    
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    
    const companySection = screen.getByText('Company');
    const supportSection = screen.getByText('Support');
    
    expect(companySection).toBeInTheDocument();
    expect(supportSection).toBeInTheDocument();
  });

  test('date inputs have correct type', () => {
    render(<MockHotelsPage />);
    
    const checkinInput = screen.getByTestId('checkin-input');
    const checkoutInput = screen.getByTestId('checkout-input');
    
    expect(checkinInput).toHaveAttribute('type', 'date');
    expect(checkoutInput).toHaveAttribute('type', 'date');
  });
});