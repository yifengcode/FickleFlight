# FickleFlight Testing Guide

This project now includes comprehensive unit tests using Jest and React Testing Library.

## Test Structure

```
src/
├── __tests__/           # Global tests (App, utilities)
│   ├── setup.test.tsx
│   └── reportWebVitals.test.tsx
└── components/
    └── __tests__/       # Component tests
        ├── MatterhornPopup.test.tsx
        └── PortalPopup.test.tsx
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run specific test file
```bash
npm test MatterhornPopup
```

### Generate coverage report
```bash
npm test -- --coverage
```

## Test Coverage

Current test coverage:
- **MatterhornPopup**: 100% coverage (5 tests)
- **PortalPopup**: 77% coverage (16 tests)
- **reportWebVitals**: 25% coverage (5 tests)

### Components Tested

#### MatterhornPopup
- Basic rendering
- Props handling (className, onClose)
- iframe element verification
- Default value testing

#### PortalPopup
- Portal creation and management
- Placement options (Centered, Top left/center/right, Bottom left/center/right)
- Event handling (outside clicks)
- Style application (zIndex, overlay color)
- Portal container reuse

## Testing Utilities

The tests use:
- **Jest**: Test runner and assertion library
- **React Testing Library**: React component testing utilities
- **@testing-library/jest-dom**: Additional DOM matchers
- **@testing-library/user-event**: User interaction simulation

## Future Test Additions

Due to router dependency issues, the following components need additional testing setup:
- **Homepage**: Main landing page with forms and navigation
- **HotelsPage**: Hotel booking interface
- **ResultsPage**: Search results display
- **App**: Main application component

To add tests for these components, consider:
1. Setting up proper router mocking
2. Mocking external dependencies (MUI components)
3. Testing user interactions (form submissions, navigation)
4. Testing state management and data flow

## Best Practices

1. **Arrange, Act, Assert**: Structure tests clearly
2. **Test behavior, not implementation**: Focus on what users can do
3. **Use descriptive test names**: Make tests self-documenting
4. **Mock external dependencies**: Keep tests isolated
5. **Clean up after tests**: Prevent test pollution

## Example Test Pattern

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const mockCallback = jest.fn();
    render(<MyComponent onAction={mockCallback} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
```