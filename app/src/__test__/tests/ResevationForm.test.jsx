import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ReservationForm } from '@/components/reservation-form'; // Import ReservationForm directly
import { SessionProvider } from 'next-auth/react';

global.alert = jest.fn();

// Mocking useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe('ReservationForm', () => {
  it('submits the form and redirects', async () => {
    // Render the ReservationForm inside SessionProvider
    const { getByLabelText, getByText } = render(
      <SessionProvider session={{ user: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }}}>
        <ReservationForm
          vehicleId="vehicle123"
          imgUrl="/car.jpg"
          brand="Toyota"
          model="Camry"
          year="2022"
          nPeople="5"
          color="Red"
          fuelType="Petrol"
          rentalPrice="50"
        />
      </SessionProvider>
    );

    // Fill in form fields
    fireEvent.change(getByLabelText(/Pickup date/), { target: { value: '2024-03-30' } });
    fireEvent.change(getByLabelText(/Pickup time/), { target: { value: '10:00' } });
    fireEvent.change(getByLabelText(/Return date/), { target: { value: '2024-03-31' } });
    fireEvent.change(getByLabelText(/Return time/), { target: { value: '10:00' } });
    fireEvent.change(getByLabelText(/Driver license/), { target: { value: 'ABC1234567890' } });
    fireEvent.change(getByLabelText(/Additional comments or requests/), { target: { value: 'Test comments' } });

    // Simulate form submission
    const submitButton = getByText('Make a Reservation');
    fireEvent.click(submitButton);

    window.alert = jest.fn();
    // Wait for redirection or other side effects
  });
});
