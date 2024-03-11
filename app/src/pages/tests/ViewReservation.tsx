import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewReservation from '@/pages/ViewReservation';

// Define exampleReservation here
const exampleReservation = {
  id: 'placeholder',
  location: 'Example Location',
  startDate: '2024-03-05',
  endDate: '2024-03-08',
  modelName: 'Example Model',
  seatCount: 4,
  fuelType: 'Petrol',
  driverName: 'John Doe',
  status: 'Checked In',
  img: 'car.jpg',
  name: 'Car Name',
  price: 99,
  description: 'This is a great car with excellent features for your next trip.',
  automatic: true,
  nPeople: 4,
  nBags: 2,
};

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
  }),
}));

describe('ViewReservation', () => {
  it('renders without crashing', () => {
    render(<ViewReservation />);
    // Add additional assertions if needed
  });

  it('displays reservation details correctly', () => {
    const { getByText } = render(<ViewReservation />);
    
    // Replace 'Example Location', 'Example Model', and other expected values
    expect(getByText(`Location: ${exampleReservation.location}`)).toBeInTheDocument();
    expect(getByText(`Start Date: ${exampleReservation.startDate}`)).toBeInTheDocument();
    expect(getByText(`End Date: ${exampleReservation.endDate}`)).toBeInTheDocument();
    expect(getByText(`Status: ${exampleReservation.status}`)).toBeInTheDocument();
    expect(getByText(`Model Name: ${exampleReservation.modelName}`)).toBeInTheDocument();
    expect(getByText(`Seat Count: ${exampleReservation.seatCount}`)).toBeInTheDocument();
    expect(getByText(`Fuel Type: ${exampleReservation.fuelType}`)).toBeInTheDocument();
    expect(getByText(`Person Name: ${exampleReservation.driverName}`)).toBeInTheDocument();

    // Add additional assertions for other reservation details
  });

  it('opens cancel popup when cancel button is clicked', () => {
    render(<ViewReservation />);
    
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByTestId('cancel-popup')).toBeInTheDocument();
    // Add additional assertions if needed
  });

  it('opens modify popup when modify button is clicked', () => {
    render(<ViewReservation />);
    
    fireEvent.click(screen.getByText('Modify'));

    expect(screen.getByTestId('modify-popup')).toBeInTheDocument();
    // Add additional assertions if needed
  });

  // Add more test cases as needed
});
