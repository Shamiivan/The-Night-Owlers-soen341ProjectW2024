import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Vehicles from '@/app/admin/vehicles/page';

describe('Vehicles Component', () => {
  it('should handle tab switch', async () => {
    render(<Vehicles navCollapsedSize={undefined} />);
    
    // Verify that the component renders with the default layout
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();

    // Click on the "Create Vehicle" tab trigger
    fireEvent.click(screen.getByText('Create Vehicle'));

    // Click on the "Main view" tab trigger to switch back to the default tab
    fireEvent.click(screen.getByText('Main view'));

  });
});
