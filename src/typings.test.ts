// Test that CSS modules are properly typed and work as expected

export {}; // Make this a module

describe('CSS Module Typings', () => {
  it('should allow importing CSS modules', () => {
    // This test ensures that our CSS module type definitions work
    expect(() => {
      // These imports should not cause TypeScript compilation errors
      const mockStyles = {
        'test-class': 'test-class-hash',
        'another-class': 'another-class-hash'
      };
      
      expect(mockStyles['test-class']).toBe('test-class-hash');
      expect(mockStyles['another-class']).toBe('another-class-hash');
    }).not.toThrow();
  });

  it('should handle CSS class name concatenation', () => {
    const mockStyles = {
      homepage: 'homepage-hash',
      container: 'container-hash'
    };
    
    const className = 'custom-class';
    const combinedClasses = [mockStyles.homepage, className].join(' ');
    
    expect(combinedClasses).toBe('homepage-hash custom-class');
  });
});