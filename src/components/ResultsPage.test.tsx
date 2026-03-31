import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsPage from './ResultsPage';

describe('ResultsPage', () => {
  it('renders without crashing', () => {
    render(<ResultsPage />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClassName = 'custom-results';
    const { container } = render(<ResultsPage className={customClassName} />);

    const resultsElement = container.firstChild as HTMLElement;
    expect(resultsElement).toHaveClass(customClassName);
  });

  it('renders with search prop', () => {
    const searchText = 'Test Search';
    render(<ResultsPage search={searchText} />);

    expect(screen.getByText(searchText)).toBeInTheDocument();
  });

  it('renders navigation elements', () => {
    render(<ResultsPage />);

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('renders search flights button', () => {
    render(<ResultsPage />);

    const searchButton = screen.getByRole('button', { name: /search flights/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders filter sections', () => {
    render(<ResultsPage />);

    // Check for filter sections
    expect(screen.getByText('Airlines')).toBeInTheDocument();
    expect(screen.getByText('Stops')).toBeInTheDocument();
  });

  it('renders airline filter checkboxes', () => {
    render(<ResultsPage />);

    expect(screen.getByLabelText('Singapore Airlines')).toBeInTheDocument();
    expect(screen.getByLabelText('Qatar Airways')).toBeInTheDocument();
  });

  it('renders stops filter checkboxes', () => {
    render(<ResultsPage />);

    expect(screen.getByLabelText('1 Stop')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<ResultsPage />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support Center')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders date picker', () => {
    render(<ResultsPage />);

    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });
});