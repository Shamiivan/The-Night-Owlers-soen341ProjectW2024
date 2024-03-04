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
        <div className="md:flex-1">
          <h2 className="text-lg font-semibold bg-gray-100 p-4 rounded-lg">{name}</h2>
        </div>
        <div className="md:flex-2">
          <img src={carImage} alt={`${name}`} className="w-full h-auto bg-gray-200 p-4 rounded-lg" />
        </div>
        <div className="md:flex-1 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Car Information</h3>
          {/* Car information goes here */}
        </div>
        <div className="md:flex-1 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Car Description</h3>
          <p>{carDescription}</p>
        </div>
      </div>
    );
  };

export default VehicleDetailCard;
