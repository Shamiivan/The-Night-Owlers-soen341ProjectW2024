import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateUserForm from '@/components/dashboard/createUserForm';

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
  
  describe('CreateUserForm', () => {
   beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      jest.clearAllMocks();
   });
  
   it('renders without crashing', () => {
      render(<CreateUserForm />);
   });
  
   it('updates state on input change', async () => {
      const { getByLabelText } = render(<CreateUserForm />);
      const firstNameInput = getByLabelText('First Name:');
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      expect(firstNameInput.value).toBe('John');
   });
  
   it('submits the form and redirects', async () => {
      const { getByLabelText, getByText } = render(<CreateUserForm />);
      const firstNameInput = getByLabelText('First Name:');
      const lastNameInput = getByLabelText('Last Name:');
      const emailInput = getByLabelText('Email:');
      const passwordInput = getByLabelText('Password:');
      const submitButton = getByText('Create User');
  
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/users/'), expect.anything());
      });
   });
  });
  