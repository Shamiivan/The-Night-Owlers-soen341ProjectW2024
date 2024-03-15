// @/__mocks__/vehicleRepository.js

export const getAllVehicles = jest.fn().mockResolvedValue({
    success: true,
    value: [
      {
        id: '1',
        brand: 'Toyota',
        category: 'SUV',
        rentalPrice: 50,
        vehicleModel: 'RAV4',
        imageUrl: 'toyota-rav4.jpg',
      },
      {
        id: '2',
        brand: 'Honda',
        category: 'Sedan',
        rentalPrice: 40,
        vehicleModel: 'Civic',
        imageUrl: 'honda-civic.jpg',
      },
    ],
  });
  