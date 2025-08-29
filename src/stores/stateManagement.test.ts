// State Management Test
// This test validates the Zustand-based state management implementation

import { renderHook, act } from '@testing-library/react';
import { useSearchStore, useUserStore } from '../stores';

describe('State Management Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Search Store', () => {
    test('should initialize with default flight search values', () => {
      const { result } = renderHook(() => useSearchStore());
      
      expect(result.current.flightSearch).toEqual({
        departure: 'Singapore - Changi (SIN)',
        arrival: 'Los Angeles (LA)',
        departureDate: null,
        returnDate: null,
        tripType: 'one-way',
        passengers: 1,
      });
    });

    test('should update flight search criteria', () => {
      const { result } = renderHook(() => useSearchStore());
      
      act(() => {
        result.current.setFlightSearch({
          departure: 'Sydney (SYD)',
          arrival: 'Tokyo (NRT)',
          tripType: 'return',
        });
      });

      expect(result.current.flightSearch.departure).toBe('Sydney (SYD)');
      expect(result.current.flightSearch.arrival).toBe('Tokyo (NRT)');
      expect(result.current.flightSearch.tripType).toBe('return');
      // Other fields should remain unchanged
      expect(result.current.flightSearch.passengers).toBe(1);
    });

    test('should manage search history', () => {
      const { result } = renderHook(() => useSearchStore());
      
      const searchCriteria = {
        departure: 'Sydney (SYD)',
        arrival: 'Los Angeles (LA)',
        departureDate: new Date(),
        returnDate: null,
        tripType: 'one-way' as const,
        passengers: 1,
      };

      act(() => {
        result.current.addToSearchHistory(searchCriteria);
      });

      expect(result.current.searchHistory).toHaveLength(1);
      expect(result.current.searchHistory[0]).toEqual(searchCriteria);
    });

    test('should limit search history to 10 items', () => {
      const { result } = renderHook(() => useSearchStore());
      
      // Add 15 items to test the limit
      act(() => {
        for (let i = 0; i < 15; i++) {
          result.current.addToSearchHistory({
            departure: `City${i}`,
            arrival: 'Los Angeles (LA)',
            departureDate: null,
            returnDate: null,
            tripType: 'one-way',
            passengers: 1,
          });
        }
      });

      expect(result.current.searchHistory).toHaveLength(10);
      expect(result.current.searchHistory[0].departure).toBe('City14'); // Most recent
    });

    test('should clear search history', () => {
      const { result } = renderHook(() => useSearchStore());
      
      // Add some history
      act(() => {
        result.current.addToSearchHistory({
          departure: 'Sydney (SYD)',
          arrival: 'Los Angeles (LA)',
          departureDate: null,
          returnDate: null,
          tripType: 'one-way',
          passengers: 1,
        });
      });

      expect(result.current.searchHistory).toHaveLength(1);

      act(() => {
        result.current.clearSearchHistory();
      });

      expect(result.current.searchHistory).toHaveLength(0);
    });

    test('should manage searching state', () => {
      const { result } = renderHook(() => useSearchStore());
      
      expect(result.current.isSearching).toBe(false);

      act(() => {
        result.current.setIsSearching(true);
      });

      expect(result.current.isSearching).toBe(true);
    });
  });

  describe('User Store', () => {
    test('should initialize with default user preferences', () => {
      const { result } = renderHook(() => useUserStore());
      
      expect(result.current.preferences).toEqual({
        currency: 'SGD',
        language: 'en',
        theme: 'light',
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
      });
    });

    test('should update user preferences', () => {
      const { result } = renderHook(() => useUserStore());
      
      act(() => {
        result.current.setPreferences({
          currency: 'USD',
          theme: 'dark',
          emailNotifications: false,
        });
      });

      expect(result.current.preferences.currency).toBe('USD');
      expect(result.current.preferences.theme).toBe('dark');
      expect(result.current.preferences.emailNotifications).toBe(false);
      // Other preferences should remain unchanged
      expect(result.current.preferences.language).toBe('en');
    });

    test('should manage preferred airlines', () => {
      const { result } = renderHook(() => useUserStore());
      
      act(() => {
        result.current.addPreferredAirline('Singapore Airlines');
        result.current.addPreferredAirline('Emirates');
      });

      expect(result.current.preferredAirlines).toContain('Singapore Airlines');
      expect(result.current.preferredAirlines).toContain('Emirates');
      expect(result.current.preferredAirlines).toHaveLength(2);

      act(() => {
        result.current.removePreferredAirline('Singapore Airlines');
      });

      expect(result.current.preferredAirlines).not.toContain('Singapore Airlines');
      expect(result.current.preferredAirlines).toHaveLength(1);
    });

    test('should not add duplicate preferred airlines', () => {
      const { result } = renderHook(() => useUserStore());
      
      act(() => {
        result.current.addPreferredAirline('Singapore Airlines');
        result.current.addPreferredAirline('Singapore Airlines'); // Duplicate
      });

      expect(result.current.preferredAirlines).toHaveLength(1);
    });

    test('should manage authentication state', () => {
      const { result } = renderHook(() => useUserStore());
      
      expect(result.current.isAuthenticated).toBe(false);

      act(() => {
        result.current.setAuthenticated(true);
      });

      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  describe('State Persistence', () => {
    test('should persist search state to localStorage', () => {
      const { result } = renderHook(() => useSearchStore());
      
      act(() => {
        result.current.setFlightSearch({
          departure: 'Sydney (SYD)',
          arrival: 'Tokyo (NRT)',
        });
      });

      // Check if state is persisted in localStorage
      const persistedState = localStorage.getItem('fickle-flight-search');
      expect(persistedState).toBeTruthy();
      
      const parsedState = JSON.parse(persistedState!);
      expect(parsedState.state.flightSearch.departure).toBe('Sydney (SYD)');
    });

    test('should persist user state to localStorage', () => {
      const { result } = renderHook(() => useUserStore());
      
      act(() => {
        result.current.setPreferences({
          currency: 'USD',
          theme: 'dark',
        });
      });

      // Check if state is persisted in localStorage
      const persistedState = localStorage.getItem('fickle-flight-user');
      expect(persistedState).toBeTruthy();
      
      const parsedState = JSON.parse(persistedState!);
      expect(parsedState.state.preferences.currency).toBe('USD');
      expect(parsedState.state.preferences.theme).toBe('dark');
    });
  });
});