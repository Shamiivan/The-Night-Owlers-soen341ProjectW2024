import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReserveForm from '@/pages/ReserveForm';

// Mock the useRouter hook directly
jest.mock('next/router');

// Mocking fetch to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      img: 'car-image.jpg',
      name: 'Car Name',
      price: '100',
      description: 'Car description',
      automatic: 'true',
      nPeople: '4',
      nBags: '2',
    },
  }),
}));

describe('ReserveForm', () => {
  it('renders without crashing', () => {
    render(<ReserveForm />);
    // Add additional assertions if needed
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<ReserveForm />);
    
    const firstNameInput = getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    expect(firstNameInput.value).toBe('Jane');
    // Add additional assertions if needed
  });

  it('submits the form and makes API call', async () => {
    const { getByText } = render(<ReserveForm />);
    
    const submitButton = getByText('Make a Reservation');
    fireEvent.click(submitButton);

  });
});
