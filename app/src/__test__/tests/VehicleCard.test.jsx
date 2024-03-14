import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VehicleCard from '@/components/dashboard/vehicleCard';
import '@testing-library/jest-dom'

// Mock window.confirm
window.confirm = jest.fn(() => true);

describe('VehicleCard', () => {
  const reload = window.location.reload;

    
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    });
    window.alert = jest.fn();
  });

  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    });
  });

  afterAll(() => {
    window.confirm.mockRestore();
    window.location.reload = reload;
  });

  it('renders vehicle data correctly', () => {
    const vehicle = {
      brand: 'Toyota',
      imageUrl: 'toyota.jpg',
      category: 'SUV',
      vehicleModel: 'Rav4',
      year: 2022,
      automatic: true,
      nPeople: 5,
      nBags: 4,
      color: 'blue',
      fuelType: 'Gasoline',
      engineCapacity: 2.5,
      rentalPrice: 50,
      mileage: 30000,
      _id: '123456789',
    };

    render(<VehicleCard {...vehicle} />);

    expect(screen.getByText(`${vehicle.brand} ${vehicle.vehicleModel}`)).toBeInTheDocument();
    expect(screen.getByText(`${vehicle.category} - ${vehicle.year} - ${vehicle.color}`)).toBeInTheDocument();
  });

  it('deletes vehicle when delete button is clicked', async () => {
    const vehicle = {
      brand: 'Toyota',
      imageUrl: 'toyota.jpg',
      category: 'SUV',
      vehicleModel: 'Rav4',
      year: 2022,
      automatic: true,
      nPeople: 5,
      nBags: 4,
      color: 'blue',
      fuelType: 'Gasoline',
      engineCapacity: 2.5,
      rentalPrice: 50,
      mileage: 30000,
      _id: '123456789',
    };

    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    render(<VehicleCard {...vehicle} />);

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Confirm deletion
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledTimes(1);
    });

    // Confirm fetch call
    expect(fetch).toHaveBeenCalledWith(`/api/vehicles/${vehicle._id}`, {
      method: 'DELETE',
      body: JSON.stringify({ _id: vehicle._id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Confirm reload
    expect(window.location.reload).toHaveBeenCalled();
  });
});
