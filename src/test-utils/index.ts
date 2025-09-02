import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function without wrapper for now  
export const renderWithWrapper = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult => {
  return render(ui, options);
};

// Common test data
export const mockFlightData = {
  departure: 'Singapore (SIN)',
  arrival: 'Los Angeles (LA)', 
  date: '2024-01-01'
};

export const mockHotelData = {
  destination: 'Sydney, Australia',
  checkIn: '2024-01-01',
  checkOut: '2024-01-03',
  guests: '1 room, 2 guests'
};

// Common assertions for form elements
export const expectFormInputToExist = (labelText: string) => {
  const { getByLabelText } = require('@testing-library/screen');
  expect(getByLabelText(labelText)).toBeInTheDocument();
};

export const expectButtonToExist = (buttonText: string | RegExp) => {
  const { getByRole } = require('@testing-library/screen');
  expect(getByRole('button', { name: buttonText })).toBeInTheDocument();
};

// Helper to test className combinations
export const expectToHaveClasses = (element: Element | null, ...classNames: string[]) => {
  expect(element).toBeInTheDocument();
  classNames.forEach(className => {
    expect(element).toHaveClass(className);
  });
};

// Helper to test navigation items
export const expectNavigationItems = () => {
  const { getByText } = require('@testing-library/screen');
  const navItems = ['Explore', 'Search', 'Hotels', 'Offers'];
  
  navItems.forEach(item => {
    expect(getByText(item)).toBeInTheDocument();
  });
};

// Helper to test footer links
export const expectFooterLinks = () => {
  const { getByText } = require('@testing-library/screen');
  const footerLinks = [
    'About Us', 'Company', 'News', 'Careers',
    'Account', 'Support', 'Support Center', 'FAQ',
    'Covid Advisory', 'More', 'Airline Fees', 'Tips'
  ];
  
  footerLinks.forEach(link => {
    expect(getByText(link)).toBeInTheDocument();
  });
};

export default {
  renderWithWrapper,
  mockFlightData,
  mockHotelData,
  expectFormInputToExist,
  expectButtonToExist,
  expectToHaveClasses,
  expectNavigationItems,
  expectFooterLinks
};