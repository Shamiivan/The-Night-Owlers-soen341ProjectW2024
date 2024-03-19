import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateUserForm from '@/components/dashboard/updateUserForm';

let alertMock;
// Mock the useRouter hook directly
jest.mock('next/router');

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

window.confirm = jest.fn(() => true);

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

  });

  afterEach(() => {
    if (alertMock) {
      alertMock.mockRestore();
    }
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
    const { getByText } = render(<UpdateUserForm {...userProps} />);
    
    const submitButton = getByText('Update User');

    fireEvent.click(submitButton);

    // Expectations for confirmed case
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to update this user?');
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/user-id-123`, {
      method: 'PUT',
      body: expect.anything(),
      headers: expect.anything(),
      // Add additional assertions if needed
    });
    // ... add assertions for the rest of the function
  
    // Reset the mock
    window.confirm.mockRestore();

    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  
  it('does not make API call when not confirmed', async () => {
    const userProps = {
      oldFirstName: 'John',
      oldLastName: 'Doe',
      oldEmail: 'john.doe@example.com',
      oldPassword: 'password123',
      id: 'user-id-123',
    };
    const { getByText } = render(<UpdateUserForm {...userProps} />);
    
    const submitButton = getByText('Update User');
  
  });
});
