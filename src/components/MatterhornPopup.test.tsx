import React from 'react';
import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup', () => {
  it('renders iframe with YouTube video', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('applies custom className', () => {
    const { container } = render(<MatterhornPopup className="custom-class" />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('custom-class');
  });

  it('applies default styling', () => {
    const { container } = render(<MatterhornPopup />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('matterhornPopup');
  });

  it('accepts onClose prop without breaking', () => {
    const onClose = jest.fn();
    const { container } = render(<MatterhornPopup onClose={onClose} />);
    
    // Component should render iframe without calling onClose automatically
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('combines custom className with default className', () => {
    const { container } = render(<MatterhornPopup className="test-class" />);
    
    const popup = container.firstChild as HTMLElement;
    expect(popup).toHaveClass('matterhornPopup');
    expect(popup).toHaveClass('test-class');
  });

  it('iframe has correct CSS class', () => {
    const { container } = render(<MatterhornPopup />);
    
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveClass('video');
  });
});