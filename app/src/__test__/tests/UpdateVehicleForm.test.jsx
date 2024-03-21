import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateVehicleForm from '@/components/dashboard/updateVehicleForm';

let alertMock;

// Mock the useRouter hook directly
jest.mock("next/router");

// Mocking fetch to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
);

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

window.confirm = jest.fn(() => true);

describe("UpdateVehicleForm", () => {
  const vehicleProps = {
    oldBrand: "OldBrand",
    oldImageUrl: "OldImageUrl",
    oldCategory: "OldCategory",
    oldVehicleModel: "OldVehicleModel",
    oldYear: 2020,
    oldAutomatic: true,
    oldNPeople: 5,
    oldNBags: 2,
    oldColor: "OldColor",
    oldFuelType: "OldFuelType",
    oldEngineCapacity: 2000,
    oldRentalPrice: 50,
    oldMileage: 50000,
    id: "123",
  };

  afterEach(() => {
    if (alertMock) {
      alertMock.mockRestore();
    }
  });
  
  it('renders without crashing', () => {
  render(<UpdateVehicleForm {...vehicleProps} />);
  // Add additional assertions if needed
  });

  it("updates state on input change", () => {
    const { getByLabelText } = render(<UpdateVehicleForm {...vehicleProps} />);
    fireEvent.change(getByLabelText("Brand:"), {
      target: { value: "NewBrand" },
    });
    fireEvent.change(getByLabelText("Image URL:"), {
      target: { value: "NewImageUrl" },
    });
    // Add fireEvent.change for other form elements

    expect(getByLabelText("Brand:").value).toBe("NewBrand");
    expect(getByLabelText("Image URL:").value).toBe("NewImageUrl");
    // Add assertions for other form elements
  });

  it("submits form and calls API", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: jest.fn() });
    render(<UpdateVehicleForm {...vehicleProps} />);
    fireEvent.submit(screen.getByRole("button", { name: /update vehicle/i }));

    // Ensure that the API endpoint is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/123`, {
      method: 'PUT',
      body: expect.anything(),
      headers: expect.anything(),
    });

    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
});
