import reportWebVitals from '../reportWebVitals';

describe('reportWebVitals', () => {
  it('does not call when no handler provided', () => {
    // Should not throw any errors
    expect(() => reportWebVitals()).not.toThrow();
  });

  it('does not call when handler is not a function', () => {
    // Should not throw any errors
    expect(() => reportWebVitals('not a function' as any)).not.toThrow();
  });

  it('accepts a valid function handler', () => {
    const mockHandler = jest.fn();
    // Should not throw any errors
    expect(() => reportWebVitals(mockHandler)).not.toThrow();
  });
});