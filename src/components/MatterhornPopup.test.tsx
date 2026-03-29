import React from 'react';
import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  test('renders iframe with YouTube video', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src');
    expect(iframe?.getAttribute('src')).toContain('youtube.com');
  });

  test('iframe has correct properties', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-popup-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass(customClass);
  });

  test('applies default matterhornPopup class', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('matterhornPopup');
  });

  test('accepts onClose prop without errors', () => {
    const onCloseMock = jest.fn();
    
    // Component should render without errors even though onClose is not used
    expect(() => {
      render(<MatterhornPopup onClose={onCloseMock} />);
    }).not.toThrow();
  });

  test('iframe src contains YouTube URL with video parameters', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    const src = iframe?.getAttribute('src');
    
    expect(src).toContain('youtube.com');
    expect(src).toContain('play=0');
    expect(src).toContain('mute=0');
  });

  test('combines custom className with default class correctly', () => {
    const customClass = 'my-custom-class';
    const { container } = render(<MatterhornPopup className={customClass} />);
    
    const popup = container.firstChild as HTMLElement;
    const classNames = popup.className.split(' ');
    
    expect(classNames).toContain('matterhornPopup');
    expect(classNames).toContain(customClass);
  });

  test('iframe has video class', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    
    expect(iframe).toHaveClass('video');
  });

  test('component renders as a div container', () => {
    const { container } = render(<MatterhornPopup />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.tagName.toLowerCase()).toBe('div');
  });
});