import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckinForm from '@/components/user/checkinForm';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ /* mock response data */ }),
  })
);

process.env.NEXT_PUBLIC_ADMIN_URL = 'http://example.com';

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

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText("Driver's License:"), { target: { value: 'ABC1234567890' } });
    fireEvent.change(screen.getByLabelText('Credit Card:'), { target: { value: 'creditcard123' } });

    fireEvent.click(screen.getByText('Check In'));

  });

  it('displays alert for empty fields', () => {
    render(<CheckinForm reservation={reservation} />);

    fireEvent.submit(screen.getByText('Check In'));

    expect(window.alert).toHaveBeenCalledWith('Please fill out all required fields.');
  });

  it('displays alert for mismatched name', () => {
    render(<CheckinForm reservation={reservation} />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText("Driver's License:"), { target: { value: 'ABC1234567890' } });
    fireEvent.change(screen.getByLabelText('Credit Card:'), { target: { value: 'creditcard123' } });
    fireEvent.click(screen.getByText('Check In'));

    expect(window.alert).toHaveBeenCalledWith("Driver's name does not match the reservation data. Please verify.");
  });

  it('displays alert for mismatched driver license', () => {
    render(<CheckinForm reservation={reservation} />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText("Driver's License:"), { target: { value: 'DEF9876543210' } });
    fireEvent.change(screen.getByLabelText('Credit Card:'), { target: { value: 'creditcard123' } });
    fireEvent.click(screen.getByText('Check In'));

    expect(window.alert).toHaveBeenCalledWith('Driver\'s license does not match the reservation data. Please verify.');
  });

  it('displays alert for mismatched credit card', () => {
    render(<CheckinForm reservation={reservation} />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText("Driver's License:"), { target: { value: 'ABC1234567890' } });
    fireEvent.change(screen.getByLabelText('Credit Card:'), { target: { value: 'invalidcreditcard' } });
    fireEvent.click(screen.getByText('Check In'));

    expect(window.alert).toHaveBeenCalledWith('Credit card number does not match the reservation data. Please verify.');
  });
});

