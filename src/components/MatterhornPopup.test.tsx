import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

describe('MatterhornPopup Component', () => {
  test('renders video iframe', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  test('has correct video source URL', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/sssdfsdfY?rhjfjyfcgx/jgoplay=0&mute=0'
    );
  });

  test('has allowFullScreen attribute', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  test('has no frameBorder', () => {
    const { container } = render(<MatterhornPopup />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('frameBorder', '0');
  });

  test('applies custom className when provided', () => {
    const { container } = render(
      <MatterhornPopup className="custom-class" />
    );
    const popup = container.firstChild;
    expect(popup).toHaveClass('custom-class');
  });

  test('applies default styles', () => {
    const { container } = render(<MatterhornPopup />);
    const popup = container.firstChild;
    expect(popup).toHaveClass('matterhornPopup');
  });

  test('onClose prop is optional', () => {
    // Test that component renders without onClose prop
    expect(() => render(<MatterhornPopup />)).not.toThrow();
  });

  test('accepts onClose callback prop', () => {
    const mockOnClose = jest.fn();
    // Test that component renders with onClose prop
    expect(() => 
      render(<MatterhornPopup onClose={mockOnClose} />)
    ).not.toThrow();
  });
});