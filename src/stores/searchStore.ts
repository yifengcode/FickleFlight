import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FlightSearchCriteria {
  departure: string;
  arrival: string;
  departureDate: Date | null;
  returnDate: Date | null;
  tripType: 'one-way' | 'return';
  passengers: number;
}

export interface HotelSearchCriteria {
  destination: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: number;
  rooms: number;
}

interface SearchState {
  // Flight search state
  flightSearch: FlightSearchCriteria;
  setFlightSearch: (criteria: Partial<FlightSearchCriteria>) => void;
  resetFlightSearch: () => void;

  // Hotel search state
  hotelSearch: HotelSearchCriteria;
  setHotelSearch: (criteria: Partial<HotelSearchCriteria>) => void;
  resetHotelSearch: () => void;

  // Search history
  searchHistory: FlightSearchCriteria[];
  addToSearchHistory: (criteria: FlightSearchCriteria) => void;
  clearSearchHistory: () => void;

  // UI state
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
}

const defaultFlightSearch: FlightSearchCriteria = {
  departure: 'Singapore - Changi (SIN)',
  arrival: 'Los Angeles (LA)',
  departureDate: null,
  returnDate: null,
  tripType: 'one-way',
  passengers: 1,
};

const defaultHotelSearch: HotelSearchCriteria = {
  destination: '',
  checkInDate: null,
  checkOutDate: null,
  guests: 1,
  rooms: 1,
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      // Flight search state
      flightSearch: defaultFlightSearch,
      setFlightSearch: (criteria) =>
        set((state) => ({
          flightSearch: { ...state.flightSearch, ...criteria },
        })),
      resetFlightSearch: () =>
        set(() => ({ flightSearch: defaultFlightSearch })),

      // Hotel search state
      hotelSearch: defaultHotelSearch,
      setHotelSearch: (criteria) =>
        set((state) => ({
          hotelSearch: { ...state.hotelSearch, ...criteria },
        })),
      resetHotelSearch: () =>
        set(() => ({ hotelSearch: defaultHotelSearch })),

      // Search history
      searchHistory: [],
      addToSearchHistory: (criteria) =>
        set((state) => ({
          searchHistory: [criteria, ...state.searchHistory.slice(0, 9)], // Keep last 10 searches
        })),
      clearSearchHistory: () => set(() => ({ searchHistory: [] })),

      // UI state
      isSearching: false,
      setIsSearching: (searching) => set(() => ({ isSearching: searching })),
    }),
    {
      name: 'fickle-flight-search',
      partialize: (state) => ({
        flightSearch: state.flightSearch,
        hotelSearch: state.hotelSearch,
        searchHistory: state.searchHistory,
      }),
    }
  )
);