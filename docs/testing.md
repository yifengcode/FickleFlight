# FickleFlight Unit Tests

This document describes the unit tests implemented for the FickleFlight project.

## Test Coverage Summary

- **Test Suites**: 4 passed
- **Total Tests**: 39 passed
- **Coverage**: 32.66% statements, 41.5% branches, 23.52% functions

## Components Tested

### 1. MatterhornPopup Component
- **Coverage**: 100% statements, branches, functions, lines
- **Tests**: 5 tests
- **Functionality Tested**:
  - Component rendering
  - Props handling (className, onClose)
  - Iframe attributes and source URL
  - Default behavior

### 2. PortalPopup Component  
- **Coverage**: 63.51% statements, 65.62% branches, 100% functions
- **Tests**: 10 tests for PortalPopup + 3 tests for Portal utility
- **Functionality Tested**:
  - Portal creation and rendering
  - Placement positioning (centered, corners)
  - Overlay styling and z-index
  - Outside click handling
  - Portal container management
  - Custom container IDs

### 3. Homepage Functionality
- **Tests**: 13 tests (using mock component to avoid routing dependencies)
- **Functionality Tested**:
  - Form rendering (search form, radio buttons, inputs)
  - Navigation menu rendering
  - Default values and user interactions
  - Flight type selection
  - Hero section content

### 4. Flight Search Utilities
- **Tests**: 11 tests (8 utility tests + 3 integration tests)
- **Functionality Tested**:
  - Form validation logic
  - Airport name formatting
  - Error handling
  - Form integration patterns

## Test Infrastructure

### Setup Files
- `src/setupTests.ts` - Jest DOM configuration
- `src/__mocks__/react-router-dom.tsx` - Router mocking for components with navigation

### Configuration
- Jest configuration in `package.json` to handle ES modules
- Transform ignore patterns for date-fns and router dependencies

## Testing Strategy

1. **Unit Tests**: Individual component functionality testing
2. **Integration Tests**: Form validation and user interaction patterns  
3. **Mock Components**: Used to test functionality without external dependencies
4. **Utility Testing**: Business logic validation

## Dependencies Used

- **Jest**: Test runner (built into Create React App)
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

## Areas for Future Testing

Due to module resolution issues with `react-router-dom` and `date-fns` in the test environment, the following components need additional setup to test properly:

- Full Homepage component (with real routing)
- ResultsPage component (requires date picker mocking)
- HotelsPage component (requires router mocking)
- App component routing logic

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/components/MatterhornPopup.test.tsx
```