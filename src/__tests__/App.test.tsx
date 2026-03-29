import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Simple test component to verify basic functionality
const SimpleComponent = ({ title = "Test Title", className = "" }) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
      <p>This is a test component</p>
      <button onClick={() => console.log('Button clicked')}>
        Click me
      </button>
    </div>
  );
};

describe('Basic Component Testing', () => {
  test('renders component with title', () => {
    render(<SimpleComponent title="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders component with default title', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders test description', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('This is a test component')).toBeInTheDocument();
  });

  test('renders button element', () => {
    render(<SimpleComponent />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<SimpleComponent className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('component structure is correct', () => {
    const { container } = render(<SimpleComponent title="Structure Test" />);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();
  });
});