import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('does nothing when no callback is provided', () => {
    expect(() => reportWebVitals()).not.toThrow();
    expect(() => reportWebVitals(undefined)).not.toThrow();
  });

  test('does nothing when callback is not a function', () => {
    expect(() => reportWebVitals('not a function' as any)).not.toThrow();
    expect(() => reportWebVitals(123 as any)).not.toThrow();
    expect(() => reportWebVitals({} as any)).not.toThrow();
  });

  test('executes without error when valid callback is provided', () => {
    const mockCallback = jest.fn();
    
    expect(() => reportWebVitals(mockCallback)).not.toThrow();
  });

  test('function can be called multiple times', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    
    expect(() => {
      reportWebVitals(callback1);
      reportWebVitals(callback2);
    }).not.toThrow();
  });

  test('validates function type correctly', () => {
    const validCallback = () => {};
    const arrowFunction = () => {};
    
    expect(() => reportWebVitals(validCallback)).not.toThrow();
    expect(() => reportWebVitals(arrowFunction)).not.toThrow();
  });
});