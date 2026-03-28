import React from 'react';
import { render } from '@testing-library/react';

// Simple component test without dependencies
describe('Basic Component Tests', () => {
  test('renders a basic React component', () => {
    const SimpleComponent = () => <div>Hello World</div>;
    const { getByText } = render(<SimpleComponent />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  test('checks if test environment is working', () => {
    expect(1 + 1).toBe(2);
  });

  test('verifies jest-dom matchers are available', () => {
    const element = document.createElement('div');
    element.textContent = 'Test';
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
  });
});