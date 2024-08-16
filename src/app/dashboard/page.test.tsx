import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './page';

describe('Dashboard', () => {
  it('renders dashboard components', () => {
    render(<Dashboard />);
    expect(screen.getByText('Funnel 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('opens modal when stage is clicked', () => {
    render(<Dashboard />);
    const openButton = screen.getAllByRole('button', { name: 'Open' })[0];
    fireEvent.click(openButton);
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('closes modal when back button is clicked', () => {
    render(<Dashboard />);
    const openButton = screen.getAllByRole('button', { name: 'Open' })[0];
    fireEvent.click(openButton);
    const backButton = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);
    expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
  });
});