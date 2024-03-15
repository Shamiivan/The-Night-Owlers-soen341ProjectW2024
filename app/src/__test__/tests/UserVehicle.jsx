import { render, screen } from '@testing-library/react';
import VehicleIndex from '@/app/vehicles/page';
import * as vehicleRepository from '@/utils/vehicleRepository';
import React from 'react';

jest.mock('@/__mocks__/vehicleRepository');

describe('VehicleIndex', () => {
  it('renders vehicle data correctly', async () => {
    // Mock vehicle data
    const mockVehicles = [
      {
        id: '1',
        brand: 'Toyota',
        category: 'SUV',
        rentalPrice: 50,
        vehicleModel: 'RAV4',
        imageUrl: 'toyota-rav4.jpg',
      },
      {
        id: '2',
        brand: 'Honda',
        category: 'Sedan',
        rentalPrice: 40,
        vehicleModel: 'Civic',
        imageUrl: 'honda-civic.jpg',
      },
    ];

    // Mock the getAllVehicles function to return mock vehicle data
    getAllVehicles.mockResolvedValue({ success: true, value: mockVehicles });

    // Render the VehicleIndex component
    render(<VehicleIndex />);

    // Ensure that loading state is displayed initially
    expect(screen.getByText('Rent a Car')).toBeInTheDocument(); // Assuming this text is present initially while loading

    // Wait for vehicle data to be fetched and UI to update
    await screen.findByText('Toyota');

    // Verify that the vehicle data is rendered correctly
    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('RAV4')).toBeInTheDocument();

    expect(screen.getByText('Honda')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(screen.getByText('Civic')).toBeInTheDocument();

    // Ensure that there are no additional vehicle cards rendered
    expect(screen.queryAllByTestId('vehicle-card')).toHaveLength(mockVehicles.length);
  });
});