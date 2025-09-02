import { render, screen } from '@testing-library/react';
import MatterhornPopup from './MatterhornPopup';

test('renders MatterhornPopup component', () => {
  render(<MatterhornPopup />);
  const popup = screen.getByTestId('matterhorn-popup');
  expect(popup).toBeInTheDocument();
});