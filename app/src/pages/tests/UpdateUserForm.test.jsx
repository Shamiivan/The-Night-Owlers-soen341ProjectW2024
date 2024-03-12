import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Mock the useRouter hook directly
jest.mock('next/router');

import UpdateUserForm from '@/components/dashboard/updateUserForm';

// Mocking fetch to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('UpdateUserForm', () => {
  it('renders without crashing', () => {
    const userProps = {
      oldFirstName: 'John',
      oldLastName: 'Doe',
      oldEmail: 'john.doe@example.com',
      oldPassword: 'password123',
      id: 'user-id-123',
    };
    render(<UpdateUserForm {...userProps} />);
    // Add additional assertions if needed
  });

  it('updates state on input change', () => {
    const userProps = {
      oldFirstName: 'John',
      oldLastName: 'Doe',
      oldEmail: 'john.doe@example.com',
      oldPassword: 'password123',
      id: 'user-id-123',
    };
    const { getByLabelText } = render(<UpdateUserForm {...userProps} />);
    
    const firstNameInput = getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    expect(firstNameInput.value).toBe('Jane');
    // Add additional assertions if needed
  });

  it('submits the form and makes API call', async () => {
    const userProps = {
      oldFirstName: 'John',
      oldLastName: 'Doe',
      oldEmail: 'john.doe@example.com',
      oldPassword: 'password123',
      id: 'user-id-123',
    };
    const { getByLabelText, getByText } = render(<UpdateUserForm {...userProps} />);
    
    const submitButton = getByText('Update User');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/users/${userProps.id}`),
        expect.objectContaining({
          method: 'PUT',
          body: expect.anything(),
          headers: expect.anything(),
        })
      );
    });
    // Add additional assertions if needed
  });
});
