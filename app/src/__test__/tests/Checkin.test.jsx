import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CheckinForm from '@/components/dashboard/checkinForm';
import { useRouter } from 'next/navigation';

global.alert = jest.fn();

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CheckinForm', () => {
  const reservation = {
    _id: 'reservation123',
    name: 'John Doe',
    driverlicense: 'ABC1234567890',
    creditcard: 'creditcard123',
  };

  it('submits form with valid data', async () => {
    const routerMock = { push: jest.fn() };
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(routerMock);

    render(<CheckinForm reservation={reservation} />);


    fireEvent.submit(screen.getByText('Check In'));

  });

  it('displays alert for empty fields', () => {
    render(<CheckinForm reservation={reservation} />);

    fireEvent.submit(screen.getByText('Check In'));

    expect(window.alert).toHaveBeenCalledWith('Please fill out all required fields.');
  });

  // Add more tests as needed
});

