import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { getSession } from 'next-auth/react';


// Mock the getSession function from next-auth/react
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

describe('VehicleCard', () => {
  // Mock vehicle data
  const vehicle = {
    brand: 'Toyota',
    category: 'SUV',
    price: 50,
    vehicleModel: 'Camry',
    image: 'car.jpg',
    id: 'vehicle123',
  };

  it('renders correctly', () => {
    // Mock session data
    const session = { user: { name: 'John Doe' } };
    // Mock getSession to return the session data
    getSession.mockReturnValue(session);

    const { getByText, getByAltText } = render(
      <VehicleCard {...vehicle} />
    );

    expect(getByText('Camry')).toBeInTheDocument();
    expect(getByText('Toyota')).toBeInTheDocument();
    expect(getByText('$50/day')).toBeInTheDocument();
    expect(getByAltText('Car')).toHaveAttribute('src', 'car.jpg');
    expect(getByText('Make a reservation')).toBeInTheDocument();
    expect(getByText('View More')).toBeInTheDocument();
  });

  it('redirects to sign-in page when making a reservation without session', () => {
    // Mock getSession to return null (no session)
    getSession.mockReturnValue(null);

    // Mock window.location.href to capture the redirection URL
    const mockLocationAssign = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { href: '', assign: mockLocationAssign },
      writable: true,
    });

    const { getByText } = render(
      <VehicleCard {...vehicle} />
    );

  });

  // You can add more test cases to simulate user interactions and verify the component's behavior
});
