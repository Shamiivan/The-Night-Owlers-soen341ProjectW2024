import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without error', async () => {
    // Mock the getAllUsers function (assuming it's an async function)
    jest.spyOn(require('../../utils/userRepository'), 'getAllUsers').mockResolvedValue({
      success: true,
      value: [{ _id: 'sample-id'}],
    });

    // Render the Home component
    const { getByText } = render(<Home />);

    // Add more specific tests based on your component structure
    expect(getByText('Navbar')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
    // Assertions based on user data
    expect(getByText('sample-id')).toBeInTheDocument();

    // Add more assertions as needed
  });
});
