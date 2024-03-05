import React from 'react';

interface VehicleDetailCardProps {
  name: string;
  carDescription: string;
  carInformation: CarInformation;
  carImage:string;
}

interface TransmissionType {
    automatic: boolean;
    nPeople: number;
    nBags: number;
  }
  
  // Define the structure for car information
  interface CarInformation {
    brand: string;
    model: string;
    year: number;
    transmissionType: TransmissionType;
    color: string;
    fuelType: string;
    engineCapacity: number;
    totalDoors: number;
    rentalPrice: number;
    mileage: number;
  }

  const VehicleDetailCard: React.FC<VehicleDetailCardProps> = ({ name, carDescription, carImage, carInformation }) => {
    return (
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
        {/* Other components */}
        <div className="md:flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">{name}</h2>
          <img src={carImage} alt={`${name}`} className="w-full h-auto bg-gray-200 p-4 rounded-lg" />
        </div>
        <div className="md:flex-1 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Car Information</h3>
          <div className="grid grid-cols-2 gap-4"> {/* This creates a two-column grid layout */}
            <p>Brand name: {carInformation.brand}</p>
            <p>Fuel: {carInformation.fuelType}</p>
            <p>Model: {carInformation.model}</p>
            <p>Engine capacity: {carInformation.engineCapacity}</p>
            <p>Year: {carInformation.year}</p>
            <p>Total doors: {carInformation.totalDoors}</p>
            <p>Car Type: {carInformation.transmissionType.automatic ? 'Automatic' : 'Manual'}</p>
            <p>Rental price: {carInformation.rentalPrice}</p>
            <p>Car colors: {carInformation.color}</p>
            <p>Mileage: {carInformation.mileage}</p>
            {/* ...other car information */}
          </div>
        </div>
        <div className="md:flex-1 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Car Description</h3>
          <p>{carDescription}</p>
        </div>
        {/* Other components */}
      </div>
    );
  };
  

export default VehicleDetailCard;
