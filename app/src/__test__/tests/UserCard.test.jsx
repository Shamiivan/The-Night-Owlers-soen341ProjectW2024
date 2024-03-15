import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserCard } from '@/components/dashboard/user-card';
import '@testing-library/jest-dom'

// Mock window.confirm
window.confirm = jest.fn(() => true);

describe('UserCard', () => {
  const reload = window.location.reload;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    });
    window.alert = jest.fn();
  });

  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    });
  });

  afterAll(() => {
    window.confirm.mockRestore();
    window.location.reload = reload;
  });

  it('renders user data correctly', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      _id: '123456789',
    };

    render(<UserCard {...user} />);

    expect(screen.getByText(`${user.firstName} ${user.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('deletes user when delete button is clicked', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      _id: '123456789',
    };

    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    render(<UserCard {...user} />);

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Confirm deletion
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledTimes(1);
    });

    // Confirm fetch call
    expect(fetch).toHaveBeenCalledWith(`/api/users/${user._id}`, {
      method: 'DELETE',
      body: JSON.stringify({ _id: user._id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Confirm reload
    expect(window.location.reload).toHaveBeenCalled();
  
  });
});
