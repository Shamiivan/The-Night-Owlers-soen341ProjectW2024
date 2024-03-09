// adminUsers.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Users from '@/models/User'; // Adjust the import path

describe('Users Component', () => {
  it('renders the component with default layout', () => {
    render(<Users />);
    
    // Check if the main elements are present in the rendered component
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // You may add more specific checks based on your component's structure
    
    // Example: Check if the "Create User" button is rendered
    expect(screen.getByText('Create User')).toBeInTheDocument();
  });

  it('handles tab switch', async () => {
    render(<Users />);
    
    // Click on the "Create User" tab trigger
    fireEvent.click(screen.getByText('Create User'));

    // Check if the content for the "Create User" tab is rendered
    expect(await screen.findByText('Create User Form')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
