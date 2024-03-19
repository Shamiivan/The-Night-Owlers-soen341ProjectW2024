import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateVehicleForm from '@/components/dashboard/createVehicleForm';

// Mocking useRouter
jest.mock('next/navigation', () => ({
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

// Mocking fetch to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('CreateVehicleForm', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CreateVehicleForm />);
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<CreateVehicleForm />);
    const brandInput = getByLabelText('Brand:');
    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    expect(brandInput.value).toBe('Toyota');
  });

  it('submits the form and makes API call', async () => {
    const { getByLabelText, getByText } = render(<CreateVehicleForm />);
    const brandInput = getByLabelText('Brand:');
    const submitButton = getByText('Submit');

    fireEvent.change(brandInput, { target: { value: 'Toyota' } });
    // Simulate other input changes...

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect.objectContaining({
        method: 'POST',
        body: expect.anything(), 
        headers: expect.anything(),
      })
    });
  });
});
