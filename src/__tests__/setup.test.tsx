import '@testing-library/jest-dom';

describe('Test Setup', () => {
  it('should have jest-dom matchers available', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);
    
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
    
    // Clean up
    document.body.removeChild(element);
  });

  it('should be able to create and test basic DOM elements', () => {
    const button = document.createElement('button');
    button.className = 'test-button';
    button.setAttribute('data-testid', 'test-button');
    
    expect(button).toHaveClass('test-button');
    expect(button).toHaveAttribute('data-testid', 'test-button');
  });
});