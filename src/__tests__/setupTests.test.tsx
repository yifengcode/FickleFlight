import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock react-dom for PortalPopup  
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: any) => children,
}));

describe('setupTests', () => {
  it('jest-dom matchers are available', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello World';
    document.body.appendChild(div);
    
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('Hello World');
    
    document.body.removeChild(div);
  });
});