import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  currency: 'SGD' | 'USD' | 'EUR' | 'GBP';
  language: 'en' | 'zh' | 'ms';
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  passportNumber: string;
  frequentFlyerNumbers: { airline: string; number: string }[];
}

interface UserState {
  // User preferences
  preferences: UserPreferences;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  resetPreferences: () => void;

  // User profile
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  resetProfile: () => void;

  // Authentication state
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;

  // Booking preferences
  preferredAirlines: string[];
  addPreferredAirline: (airline: string) => void;
  removePreferredAirline: (airline: string) => void;

  preferredSeatType: 'economy' | 'premium-economy' | 'business' | 'first';
  setPreferredSeatType: (seatType: 'economy' | 'premium-economy' | 'business' | 'first') => void;

  // Recent bookings
  recentBookings: any[];
  addRecentBooking: (booking: any) => void;
}

const defaultPreferences: UserPreferences = {
  currency: 'SGD',
  language: 'en',
  theme: 'light',
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
};

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  dateOfBirth: null,
  passportNumber: '',
  frequentFlyerNumbers: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // User preferences
      preferences: defaultPreferences,
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      resetPreferences: () =>
        set(() => ({ preferences: defaultPreferences })),

      // User profile
      profile: defaultProfile,
      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
      resetProfile: () => set(() => ({ profile: defaultProfile })),

      // Authentication state
      isAuthenticated: false,
      setAuthenticated: (authenticated) =>
        set(() => ({ isAuthenticated: authenticated })),

      // Booking preferences
      preferredAirlines: [],
      addPreferredAirline: (airline) =>
        set((state) => ({
          preferredAirlines: state.preferredAirlines.includes(airline)
            ? state.preferredAirlines
            : [...state.preferredAirlines, airline],
        })),
      removePreferredAirline: (airline) =>
        set((state) => ({
          preferredAirlines: state.preferredAirlines.filter((a) => a !== airline),
        })),

      preferredSeatType: 'economy',
      setPreferredSeatType: (seatType) =>
        set(() => ({ preferredSeatType: seatType })),

      // Recent bookings
      recentBookings: [],
      addRecentBooking: (booking) =>
        set((state) => ({
          recentBookings: [booking, ...state.recentBookings.slice(0, 4)], // Keep last 5 bookings
        })),
    }),
    {
      name: 'fickle-flight-user',
      partialize: (state) => ({
        preferences: state.preferences,
        profile: state.profile,
        preferredAirlines: state.preferredAirlines,
        preferredSeatType: state.preferredSeatType,
        recentBookings: state.recentBookings,
      }),
    }
  )
);