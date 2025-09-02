# FickleFlight Test Suite

This directory contains comprehensive unit tests for the FickleFlight React application using Jest and React Testing Library.

## Test Coverage

### Components Tested
- ✅ **MatterhornPopup** - Video popup component
- ✅ **PortalPopup** - Modal portal component
- ✅ **CSS Modules** - Style module imports
- ✅ **reportWebVitals** - Performance monitoring utility

### Test Types
1. **Unit Tests** - Individual component functionality
2. **Integration Tests** - Component interaction and complex scenarios  
3. **Edge Case Tests** - Error handling and boundary conditions
4. **CSS Module Tests** - Style import validation

## Test Files Structure

```
src/
├── components/
│   ├── MatterhornPopup.test.tsx          # Basic unit tests
│   ├── MatterhornPopup.integration.test.tsx  # Integration scenarios
│   ├── PortalPopup.test.tsx              # Portal functionality tests
│   ├── PortalPopup.integration.test.tsx  # Advanced portal interactions
│   ├── CSSModules.test.tsx               # CSS module import tests
│   └── EdgeCases.test.tsx                # Error handling & edge cases
├── reportWebVitals.test.tsx              # Utility function tests
└── setupTests.ts                         # Jest configuration
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test MatterhornPopup.test.tsx

# Run tests in watch mode
npm test -- --watch
```

## Test Statistics

- **Total Test Suites**: 7
- **Total Tests**: 38
- **Components with Tests**: 2/5 major components
- **Utility Functions**: 1/1 tested

## What's Tested

### MatterhornPopup Component
- ✅ Iframe rendering with correct attributes
- ✅ Custom className handling
- ✅ Props acceptance (onClose callback)
- ✅ Component structure validation
- ✅ Accessibility attributes

### PortalPopup Component  
- ✅ Portal creation and DOM injection
- ✅ Overlay styling and positioning
- ✅ Click event handling (inside/outside)
- ✅ Multiple placement options
- ✅ Z-index management
- ✅ Window event handling (resize/scroll)
- ✅ Multiple portal coexistence
- ✅ Cleanup on unmount

### Utility Functions
- ✅ reportWebVitals input validation
- ✅ Error handling for invalid inputs
- ✅ Function type checking

## Testing Best Practices Used

1. **React Testing Library** - Testing behavior over implementation
2. **Accessibility Testing** - Using accessible queries when possible  
3. **Cleanup** - Proper test isolation and DOM cleanup
4. **Edge Cases** - Testing invalid inputs and error conditions
5. **Integration Testing** - Testing component interactions
6. **CSS Module Testing** - Ensuring styles are properly imported

## Future Testing Opportunities

The following components still need comprehensive tests:
- 🔄 Homepage (blocked by date-fns/router dependencies)
- 🔄 HotelsPage (blocked by router dependencies)  
- 🔄 ResultsPage (blocked by router dependencies)
- 🔄 App (blocked by router dependencies)

## Notes

Some components use `react-router-dom` which has module resolution issues in the current Jest setup. This is a configuration issue that can be resolved by updating Jest configuration to handle ES modules or by adjusting the mocking strategy.

The test suite provides a solid foundation for component testing and can be extended as the application grows.