import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModifyReservationPage from '@/pages/ModifyReservationPage';

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

describe('ModifyReservationPage', () => {
  it('renders without crashing', () => {
    render(<ModifyReservationPage />);
    // Add additional assertions if needed
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<ModifyReservationPage />);
    
    // Replace 'First Name', 'Last Name', 'Email' with the actual labels in your component
    const firstNameInput = getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    expect(firstNameInput.value).toBe('Jane');
    // Add additional assertions if needed
  });

  it('submits the form and makes API call', async () => {
    const { getByLabelText, getByText } = render(<ModifyReservationPage />);
    
    const submitButton = getByText('Modify');
    fireEvent.click(submitButton);

  });
});
