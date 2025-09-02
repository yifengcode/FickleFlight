import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from './Homepage';

// Mock MatterhornPopup and PortalPopup to simplify testing
jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup() {
    return <div data-testid="matterhorn-popup">Matterhorn Popup</div>;
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children }: any) {
    return <div data-testid="portal-popup">{children}</div>;
  };
});

describe('Homepage', () => {
  it('renders the main homepage elements', () => {
    render(<Homepage />);

    // Check for main title
    expect(screen.getByText("Let's explore & travel the world")).toBeInTheDocument();
    expect(screen.getByText('Find the best destinations and the most popular stays!')).toBeInTheDocument();
  });

  it('renders search flights section', () => {
    render(<Homepage />);

    // Check for search flights section
    expect(screen.getByText('Search flights')).toBeInTheDocument();
    
    // Check for flight type radio buttons
    expect(screen.getByLabelText('Return')).toBeInTheDocument();
    expect(screen.getByLabelText('One-way')).toBeInTheDocument();
  });

  it('renders departure and arrival autocomplete fields', () => {
    render(<Homepage />);

    // Check for departure and arrival labels
    expect(screen.getByLabelText('Departure')).toBeInTheDocument();
    expect(screen.getByLabelText('Arrival')).toBeInTheDocument();
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

  it('renders navigation menu', () => {
    render(<Homepage />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('renders upcoming flight section', () => {
    render(<Homepage />);

    expect(screen.getByText('Upcoming Flight')).toBeInTheDocument();
    expect(screen.getByText('SIN')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('15H 55M')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClassName = 'custom-homepage';
    const { container } = render(<Homepage className={customClassName} />);

    const homepageElement = container.firstChild as HTMLElement;
    expect(homepageElement).toHaveClass(customClassName);
  });

  it('renders footer with company links', () => {
    render(<Homepage />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Support Center')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('has default values in autocomplete fields', () => {
    render(<Homepage />);

    // Check for default departure value
    expect(screen.getByDisplayValue('Singapore -  Changi (SIN)')).toBeInTheDocument();
    
    // Check for default arrival value
    expect(screen.getByDisplayValue('Los Angeles (LA)')).toBeInTheDocument();
  });

  it('has one-way radio button selected by default', () => {
    render(<Homepage />);

    const oneWayRadio = screen.getByLabelText('One-way');
    const returnRadio = screen.getByLabelText('Return');

    expect(oneWayRadio).toBeChecked();
    expect(returnRadio).not.toBeChecked();
  });

  it('renders with fickle flight branding', () => {
    render(<Homepage />);

    expect(screen.getByText('Fickle Flight is your one-stop travel portal. We offer hassle free flight and hotel bookings. We also have all your flight needs in you online shop.')).toBeInTheDocument();
  });
});