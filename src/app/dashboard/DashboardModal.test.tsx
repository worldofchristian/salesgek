import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardModal from './DashboardModal';

describe('DashboardModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockData = { label: 'Test Stage', count: 10, color: 'rgb(59, 130, 246)' };

  it('renders modal when isOpen is true', () => {
    render(<DashboardModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} data={mockData} />);
    expect(screen.getByText('Test Stage')).toBeInTheDocument();
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<DashboardModal isOpen={false} onClose={mockOnClose} onSave={mockOnSave} data={mockData} />);
    expect(screen.queryByText('Test Stage')).not.toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<DashboardModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} data={mockData} />);
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('toggles select multiple mode', () => {
    render(<DashboardModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} data={mockData} />);
    const selectMultipleButton = screen.getByRole('button', { name: 'Select multiple' });
    fireEvent.click(selectMultipleButton);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
