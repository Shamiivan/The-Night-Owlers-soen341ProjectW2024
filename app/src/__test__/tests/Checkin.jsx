import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CheckinForm from '@/components/dashboard/checkinForm';
import { useRouter } from 'next/navigation';

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CheckinForm', () => {
  const reservation = {
    _id: 'reservation123',
    name: 'John Doe',
    driverlicense: 'ABC123456',
    creditcard: '1234 5678 9012 3456',
  };

  it('submits form with valid data', async () => {
    // Mock useRouter
    useRouter.mockReturnValue({ push: jest.fn() });

    // Render the component
    const { getByLabelText, getByText } = render(<CheckinForm reservation={reservation} />);

    // Fill out the form
    fireEvent.change(getByLabelText('Name: John Doe'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText("Driver's License: ABC123456"), { target: { value: 'ABC123456' } });
    fireEvent.change(getByLabelText('Credit Card: 1234 5678 9012 3456'), { target: { value: '1234 5678 9012 3456' } });

    // Submit the form
    fireEvent.submit(getByText('Check In'));

    // Wait for the form submission
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith(`/rentalagreement/${reservation._id}`);
    });
  });

  it('displays alert for missing fields', async () => {
    // Render the component
    const { getByText } = render(<CheckinForm reservation={reservation} />);

    // Submit the form without filling out any fields
    fireEvent.submit(getByText('Check In'));

    // Wait for the alert to be displayed
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please fill out all required fields.');
    });
  });

  it('displays alert for mismatched name', async () => {
    // Render the component
    const { getByLabelText, getByText } = render(<CheckinForm reservation={reservation} />);

    // Fill out the form with mismatched name
    fireEvent.change(getByLabelText('Name: John Doe'), { target: { value: 'John Smith' } });

    // Submit the form
    fireEvent.submit(getByText('Check In'));

    // Wait for the alert to be displayed
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Driver's name does not match the reservation data. Please verify.");
    });
  });

  // Add more test cases for other scenarios as needed
});
