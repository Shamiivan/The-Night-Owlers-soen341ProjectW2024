import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckoutForm from '@/components/user/checkoutForm';
import fetchMock from 'jest-fetch-mock';

global.alert = jest.fn();

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CheckoutForm', () => {

    beforeAll(() => {
        fetchMock.enableMocks();
    });

    // Reset fetch mock after each test
    afterEach(() => {
        fetchMock.resetMocks();
    });
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  const vehicle = {
    id: 'vehicle123',
  };

  const reservation = {
    _id: 'reservation123',
    pickupDateTime: new Date(),
    returnDateTime: new Date(),
    pickupLocation: 'pickup_location',
    returnLocation: 'return_location',
    comments: 'comments',
    driverlicense: 'driver_license',
    creditcard: 'credit_card',
    damageReported: false,
  };

  it('submits form with valid data', async () => {
    const routerMock = { push: jest.fn() };
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(routerMock);

    render(<CheckoutForm user={user} vehicle={vehicle} reservation={reservation} />);

    fireEvent.change(screen.getByLabelText('Driver\'s Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Mileage'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Fuel Level'), { target: { value: 'Full' } });
    fireEvent.change(screen.getByLabelText('Return Location'), { target: { value: 'Return Location' } });
    fireEvent.click(screen.getByLabelText('Damage Reported:'));

    fireEvent.submit(screen.getByText('Check Out'));

    // Expect fetch to be called with correct data
    expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/reservation123`,
        {
          method: 'PUT',
          body: expect.any(String), // Expect the body to be a string
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Parse the received body string and expect its properties
      const receivedBody = JSON.parse(fetch.mock.calls[0][1].body);
      expect(receivedBody.vehicleId).toBe('vehicle123');
      expect(receivedBody.pickupDateTime).toEqual(expect.any(String));
      expect(receivedBody.returnDateTime).toEqual(expect.any(String));
      expect(receivedBody.pickupLocation).toBe('pickup_location');
      expect(receivedBody.returnLocation).toBe('return_location');
      expect(receivedBody.comments).toBe('comments');
      expect(receivedBody.status).toBe('returned');
      expect(receivedBody.driverlicense).toBe('driver_license');
      expect(receivedBody.creditcard).toBe('credit_card');
      expect(receivedBody.damageReported).toBe(false);
      expect(receivedBody.id).toBe('reservation123');

  });

  it('displays alert for empty fields', () => {
    render(<CheckoutForm user={user} vehicle={vehicle} reservation={reservation} />);

    fireEvent.submit(screen.getByText('Check Out'));

  });

  // Add more tests as needed
});
