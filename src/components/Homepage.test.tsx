import React from 'react';
import { render } from '@testing-library/react';

// Mock all complex dependencies
jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({
  AdapterDateFns: jest.fn()
}));

jest.mock('@mui/x-date-pickers', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DatePicker: () => <input aria-label="Date" />
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock('./MatterhornPopup', () => {
  return function MockMatterhornPopup() {
    return <div data-testid="matterhorn-popup">Matterhorn Popup</div>;
  };
});

jest.mock('./PortalPopup', () => {
  return function MockPortalPopup({ children }: { children: React.ReactNode }) {
    return <div data-testid="portal-popup">{children}</div>;
  };
});

import Homepage from './Homepage';

describe('Homepage', () => {
  it('renders without crashing', () => {
    const { container } = render(<Homepage />);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Homepage className="test-class" />);
    const homepage = container.querySelector('.homepage');
    expect(homepage).toHaveClass('test-class');
  });

  it('renders main homepage structure', () => {
    const { container } = render(<Homepage />);
    const homepage = container.querySelector('.homepage');
    expect(homepage).toBeInTheDocument();
  });
});