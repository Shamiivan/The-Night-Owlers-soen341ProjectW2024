import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CreateUserForm from '../signUp';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('CreateUserForm', () => {
  it('renders form and handles submission', async () => {
    // Arrange: Render the CreateUserForm component
    render(<CreateUserForm />);

    // Act: Simulate user input
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Act: Trigger form submission
    fireEvent.submit(screen.getByRole('button', { name: /Create User/i }));

  });
});
