import '@testing-library/jest-dom';

// Utility functions that might be used in the application
export const formatFlightDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const validateFlightSearch = (departure: string, arrival: string): boolean => {
  return departure.length > 0 && arrival.length > 0 && departure !== arrival;
};

export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price);
};

export const generateFlightOptions = (departure: string, arrival: string) => {
  return [
    `${departure} (${departure.substring(0, 3).toUpperCase()})`,
    `${arrival} (${arrival.substring(0, 3).toUpperCase()})`
  ];
};

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Tests for utility functions
describe('Utility Functions', () => {
  describe('formatFlightDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatFlightDate(date);
      expect(formatted).toBe('Jan 15, 2024');
    });

    test('returns empty string for null date', () => {
      const formatted = formatFlightDate(null);
      expect(formatted).toBe('');
    });

    test('handles different dates', () => {
      const date = new Date('2024-12-25');
      const formatted = formatFlightDate(date);
      expect(formatted).toBe('Dec 25, 2024');
    });
  });

  describe('validateFlightSearch', () => {
    test('returns true for valid departure and arrival', () => {
      const result = validateFlightSearch('Singapore', 'Los Angeles');
      expect(result).toBe(true);
    });

    test('returns false for empty departure', () => {
      const result = validateFlightSearch('', 'Los Angeles');
      expect(result).toBe(false);
    });

    test('returns false for empty arrival', () => {
      const result = validateFlightSearch('Singapore', '');
      expect(result).toBe(false);
    });

    test('returns false for same departure and arrival', () => {
      const result = validateFlightSearch('Singapore', 'Singapore');
      expect(result).toBe(false);
    });

    test('handles case sensitivity', () => {
      const result = validateFlightSearch('singapore', 'Singapore');
      expect(result).toBe(true); // Different cases should be allowed
    });
  });

  describe('formatPrice', () => {
    test('formats USD price correctly', () => {
      const formatted = formatPrice(286);
      expect(formatted).toBe('$286.00');
    });

    test('formats different currency', () => {
      const formatted = formatPrice(286, 'EUR');
      expect(formatted).toBe('€286.00');
    });

    test('handles decimal values', () => {
      const formatted = formatPrice(286.50);
      expect(formatted).toBe('$286.50');
    });

    test('handles large numbers', () => {
      const formatted = formatPrice(1286.99);
      expect(formatted).toBe('$1,286.99');
    });
  });

  describe('generateFlightOptions', () => {
    test('generates flight options with airport codes', () => {
      const options = generateFlightOptions('Singapore', 'Los Angeles');
      expect(options).toEqual([
        'Singapore (SIN)',
        'Los Angeles (LOS)'
      ]);
    });

    test('handles short city names', () => {
      const options = generateFlightOptions('LA', 'NYC');
      expect(options).toEqual([
        'LA (LA)',
        'NYC (NYC)'
      ]);
    });

    test('handles different cases', () => {
      const options = generateFlightOptions('singapore', 'paris');
      expect(options).toEqual([
        'singapore (SIN)',
        'paris (PAR)'
      ]);
    });
  });

  describe('classNames', () => {
    test('joins valid class names', () => {
      const result = classNames('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    test('filters out falsy values', () => {
      const result = classNames('class1', null, 'class2', undefined, false, 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    test('handles empty input', () => {
      const result = classNames();
      expect(result).toBe('');
    });

    test('handles only falsy values', () => {
      const result = classNames(null, undefined, false);
      expect(result).toBe('');
    });

    test('handles single class name', () => {
      const result = classNames('single-class');
      expect(result).toBe('single-class');
    });
  });
});