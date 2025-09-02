import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  it('does nothing when no handler is provided', () => {
    // This should not throw an error
    expect(() => reportWebVitals()).not.toThrow();
  });

  it('does nothing when handler is not a function', () => {
    // Pass a non-function value
    expect(() => reportWebVitals('not-a-function' as any)).not.toThrow();
  });

  it('does nothing when handler is null', () => {
    expect(() => reportWebVitals(null as any)).not.toThrow();
  });

  it('does nothing when handler is undefined', () => {
    expect(() => reportWebVitals(undefined)).not.toThrow();
  });

  it('accepts a valid function handler', () => {
    const mockHandler = jest.fn();
    expect(() => reportWebVitals(mockHandler)).not.toThrow();
  });
});