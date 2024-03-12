import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateVehicleForm from '@/components/dashboard/updateVehicleForm';

// Mocking useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('UpdateVehicleForm', () => {
  const vehicleProps = {
    oldBrand: 'OldBrand',
    oldImageUrl: 'OldImageUrl',
    oldCategory: 'OldCategory',
    oldVehicleModel: 'OldVehicleModel',
    oldYear: 2020,
    oldAutomatic: true,
    oldNPeople: 5,
    oldNBags: 2,
    oldColor: 'OldColor',
    oldFuelType: 'OldFuelType',
    oldEngineCapacity: 2000,
    oldRentalPrice: 50,
    oldMileage: 50000,
    id: '123',
  };

  test('renders form elements', () => {
    render(<UpdateVehicleForm {...vehicleProps} />);
    
    expect(screen.getByLabelText(/brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    // Add assertions for other form elements
  });

  test('updates state on input change', () => {
    render(<UpdateVehicleForm {...vehicleProps} />);

    fireEvent.change(screen.getByLabelText(/brand/i), { target: { value: 'NewBrand' } });
    fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: 'NewImageUrl' } });
    // Add fireEvent.change for other form elements

    expect(screen.getByLabelText(/brand/i).value).toBe('NewBrand');
    expect(screen.getByLabelText(/image url/i).value).toBe('NewImageUrl');
    // Add assertions for other form elements
  });

  test('submits form and calls API', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: jest.fn() });

    render(<UpdateVehicleForm {...vehicleProps} />);

    fireEvent.submit(screen.getByRole('button', { name: /update vehicle/i }));

    // Ensure that the API endpoint is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/123`, {
      method: 'PUT',
      body: expect.anything(),
      headers: expect.anything(),
    });
  });
});
