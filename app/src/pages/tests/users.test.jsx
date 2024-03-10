// users.test.js

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor  } from '@testing-library/react';
import Users from '@/app/admin/users/page';

describe('Users Component', () => {
  it('should handle tab switch', async () => {
    render(<Users />);
    
    // Verify that the component renders with the default layout
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

  });
});