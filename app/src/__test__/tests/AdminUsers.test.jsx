// users.test.js

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Users from '@/app/admin/users/page';

describe('Users Component', () => {
  it('should handle tab switch', async () => {
    render(<Users />);
    
    // Verify that the component renders with the default layout
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    //expect(screen.getByText('Settings')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Create User'));

    // Click on the "Main view" tab trigger to switch back to the default tab
    fireEvent.click(screen.getByText('Main view'));

  });
});