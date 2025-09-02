import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('should be a function', () => {
    expect(typeof reportWebVitals).toBe('function');
  });

  test('should handle undefined onPerfEntry gracefully', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('should handle null onPerfEntry gracefully', () => {
    expect(() => reportWebVitals(null as any)).not.toThrow();
  });

  test('should handle function onPerfEntry', () => {
    const mockHandler = jest.fn();
    expect(() => reportWebVitals(mockHandler)).not.toThrow();
  });

  test('should handle non-function onPerfEntry gracefully', () => {
    expect(() => reportWebVitals('not a function' as any)).not.toThrow();
    expect(() => reportWebVitals(123 as any)).not.toThrow();
    expect(() => reportWebVitals({} as any)).not.toThrow();
  });
});