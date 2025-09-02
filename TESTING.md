# Testing Documentation

## Overview
This project uses Jest and React Testing Library for unit testing React components.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm test -- --watch
```

## Test Structure

### Component Tests
- Located in `src/components/__tests__/`
- Each component has its own test file: `ComponentName.test.tsx`
- Tests cover rendering, props handling, and user interactions

### Utility Tests
- Located in `src/__tests__/`
- Include type checking and setup validation

## Coverage
Current test coverage focuses on:
- ✅ MatterhornPopup - 100% coverage
- ✅ PortalPopup - 77% coverage  
- ✅ TypeScript type definitions
- ✅ Test setup validation

## Components with Tests

### MatterhornPopup
- Renders without crashing
- Handles custom className prop
- Renders iframe with correct attributes
- Accepts onClose callback

### PortalPopup
- Renders children correctly
- Handles different placement options
- Responds to outside clicks
- Applies custom styling (overlay color, zIndex)

## Next Steps
Future testing additions should include:
- Homepage component tests (with router mocking)
- HotelsPage component tests
- ResultsPage component tests
- User interaction testing
- Form validation testing