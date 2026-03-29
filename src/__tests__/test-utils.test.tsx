import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  renderWithWrapper, 
  mockFlightData, 
  mockHotelData,
  expectToHaveClasses
} from '../test-utils';

describe('Test Utilities', () => {
  describe('renderWithWrapper', () => {
    it('renders component normally', () => {
      const TestComponent = () => <div data-testid="test-component">Test</div>;
      
      renderWithWrapper(<TestComponent />);
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('mockFlightData', () => {
    it('contains expected flight data properties', () => {
      expect(mockFlightData).toHaveProperty('departure', 'Singapore (SIN)');
      expect(mockFlightData).toHaveProperty('arrival', 'Los Angeles (LA)');
      expect(mockFlightData).toHaveProperty('date', '2024-01-01');
    });
  });

  describe('mockHotelData', () => {
    it('contains expected hotel data properties', () => {
      expect(mockHotelData).toHaveProperty('destination', 'Sydney, Australia');
      expect(mockHotelData).toHaveProperty('checkIn', '2024-01-01');
      expect(mockHotelData).toHaveProperty('checkOut', '2024-01-03');
      expect(mockHotelData).toHaveProperty('guests', '1 room, 2 guests');
    });
  });

  describe('expectToHaveClasses', () => {
    it('checks element classes correctly', () => {
      const TestComponent = () => <div className="class1 class2" data-testid="test-element">Test</div>;
      
      renderWithWrapper(<TestComponent />);
      
      const element = screen.getByTestId('test-element');
      
      expect(() => {
        expectToHaveClasses(element, 'class1', 'class2');
      }).not.toThrow();
    });

    it('throws when element does not have expected class', () => {
      const TestComponent = () => <div className="class1" data-testid="test-element">Test</div>;
      
      renderWithWrapper(<TestComponent />);
      
      const element = screen.getByTestId('test-element');
      
      expect(() => {
        expectToHaveClasses(element, 'class1', 'nonexistent-class');
      }).toThrow();
    });
  });
});