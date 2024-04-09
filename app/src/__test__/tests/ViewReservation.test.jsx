import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ReservationDetailCard from '@/components/reservationDetailCard';
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

describe('ReservationDetailCard', () => {
  const reservation = {
    _id: 'reservation123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    pickupDateTime: '2024-03-30T10:00:00',
    returnDateTime: '2024-03-31T10:00:00',
    comments: 'Test comments',
    totalPrice: 100
  };

  const vehicle = {
    imageUrl: '/car.jpg',
    brand: 'Toyota',
    vehicleModel: 'Camry',
    color: 'Red',
    licensePlate: 'XYZ123',
    rentalPrice: 50,
  };

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
  };

  it('renders correctly in view mode', () => {
    const { getByText, getByAltText } = render(
      <ReservationDetailCard reservation={reservation} vehicle={vehicle} user={user} />
    );

    const customMatcher = (content, element) => {
      return element.textContent === content;
    };

    expect(getByText((content, element) => customMatcher(`Brand: ${vehicle.brand}`, element))).toBeInTheDocument();
    expect(getByAltText('car img')).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Model: ${vehicle.vehicleModel}`, element))).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Color: ${vehicle.color}`, element))).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Plate Number: ${vehicle.licensePlate}`, element))).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Price Per Day: $${vehicle.rentalPrice}`, element))).toBeInTheDocument();
    expect(getByText('Total Price:')).toBeInTheDocument();
    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Reservation ID:')).toBeInTheDocument();
    expect(getByText('Pick Up Date:')).toBeInTheDocument();
    expect(getByText('Pick Up Time:')).toBeInTheDocument();
    expect(getByText('Return Date:')).toBeInTheDocument();
    expect(getByText('Return Time:')).toBeInTheDocument();
    expect(getByText('Renter Name:')).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Email: ${user.email}`, element))).toBeInTheDocument();
    expect(getByText((content, element) => customMatcher(`Phone Number: ${user.phone}`, element))).toBeInTheDocument();
    expect(getByText('Comments:')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    });
});