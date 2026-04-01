# Testing Guide for FickleFlight

This project uses **Jest** and **React Testing Library** for unit testing React components.

## Running Tests

```bash
# Run all tests
npm test

# Run tests once without watch mode
npm test -- --watchAll=false

# Run tests with coverage report
npm test -- --coverage --watchAll=false
```

## Test Structure

Tests are located in:
- `src/components/__tests__/` - Component tests
- `src/setupTests.ts` - Global test configuration

## Existing Tests

### MatterhornPopup Component (100% coverage)
- Tests iframe rendering with correct src and attributes
- Tests className prop application
- Tests component prop handling

### PortalPopup Component (63.51% coverage)
- Tests portal content rendering
- Tests overlay styling and behavior
- Tests click event handling (inside/outside clicks)
- Tests placement configurations
- Tests zIndex and overlay color customization

## Testing Patterns Used

### Component Rendering
```tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../MyComponent';

test('renders component content', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### User Interactions
```tsx
import userEvent from '@testing-library/user-event';

test('handles click events', async () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();
  render(<MyComponent onClick={mockFn} />);
  
  await user.click(screen.getByRole('button'));
  expect(mockFn).toHaveBeenCalled();
});
```

### Portal Components
```tsx
// Mock createPortal for testing
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));
```

## Known Issues

- Router-dependent components (Homepage, HotelsPage, ResultsPage) have module resolution issues with `react-router-dom` in the test environment
- This may require additional Jest configuration or mocking strategies

## Future Improvements

1. Resolve react-router-dom testing issues
2. Add tests for remaining components
3. Add integration tests for user workflows
4. Set up CI/CD pipeline for automated testing
5. Increase overall test coverage beyond the current 32.66%

## Tips

- Use `data-testid` attributes for elements that are hard to query by role or text
- Mock external dependencies and complex modules
- Focus on testing component behavior rather than implementation details
- Use `screen.debug()` to see the rendered DOM during test development