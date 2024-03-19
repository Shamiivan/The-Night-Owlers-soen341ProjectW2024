import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ReserveForm from '@/app/reserveForm/page';
import { customRender } from '@/__mocks__/mockNextAuth';

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
    customRender(<ReserveForm />);
    // Add additional assertions if needed
  });

  it('updates state on input change', () => {
    const { getByLabelText } = customRender(<ReserveForm />);
    
    const firstNameInput = getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    expect(firstNameInput.value).toBe('Jane');
    // Add additional assertions if needed
  });

  it('submits the form and makes API call', async () => {
    const { getByText } = customRender(<ReserveForm />);
    
    const submitButton = getByText('Make a Reservation');
    fireEvent.click(submitButton);

  });
});
