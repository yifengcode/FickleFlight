import { render, screen, fireEvent } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup Integration Tests', () => {
  test('popup renders with all expected attributes', () => {
    const onCloseMock = jest.fn();
    render(<MatterhornPopup className="test-class" onClose={onCloseMock} />);
    
    const iframe = document.querySelector('iframe');
    const container = iframe?.parentElement;
    
    // Test iframe attributes
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveClass('video');
    
    // Test container
    expect(container).toHaveClass('matterhornPopup');
    expect(container).toHaveClass('test-class');
  });

  test('iframe has accessible content', () => {
    render(<MatterhornPopup />);
    
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.tagName.toLowerCase()).toBe('iframe');
  });

  test('component structure is correct', () => {
    render(<MatterhornPopup />);
    
    const container = document.querySelector('.matterhornPopup');
    const iframe = container?.querySelector('iframe');
    
    expect(container).toBeInTheDocument();
    expect(iframe).toBeInTheDocument();
    expect(container?.children.length).toBe(1);
  });
});