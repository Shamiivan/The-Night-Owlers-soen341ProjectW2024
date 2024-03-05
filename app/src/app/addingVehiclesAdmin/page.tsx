import React, { useState } from 'react';
import "@/styles/global.css";

const AddingVehiclesAdmin = () => {
  // Use string type for values that will be converted to numbers later
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [color, setColor] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [totalDoors, setTotalDoors] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [mileage, setMileage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      {/* Input fields for each car attribute */}
      {/* Brand Field */}
      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      {/* ...other fields... */}
      {/* Rental Price Field */}
      <div className="mb-4">
        <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">Rental Price ($):</label>
        <input
          type="text" // change to text to avoid number parsing
          id="rentalPrice"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)} // e.target.value will be a string
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      {/* Save Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </form>
  );
};

export default AddingVehiclesAdmin;