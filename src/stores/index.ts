// Export all stores for easy importing
export { useSearchStore } from './searchStore';
export { useUserStore } from './userStore';

// Export types
export type {
  FlightSearchCriteria,
  HotelSearchCriteria,
} from './searchStore';

export type {
  UserPreferences,
  UserProfile,
} from './userStore';