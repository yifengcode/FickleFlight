import reportWebVitals from '../reportWebVitals';

describe('reportWebVitals', () => {
  it('should not crash when called without arguments', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  it('should not crash when called with null', () => {
    expect(() => reportWebVitals(null as any)).not.toThrow();
  });

  it('should not crash when called with undefined', () => {
    expect(() => reportWebVitals(undefined)).not.toThrow();
  });

  it('should accept a function as argument', () => {
    const mockFunction = jest.fn();
    expect(() => reportWebVitals(mockFunction)).not.toThrow();
  });

  it('should not crash when called with non-function argument', () => {
    expect(() => reportWebVitals('not a function' as any)).not.toThrow();
  });
});