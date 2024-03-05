import "@/styles/global.css";
import React, { useState } from 'react';

const AddingVehiclesAdmin = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const [transmissionType, setTransmissionType] = useState('');
  const [color, setColor] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState(0);
  const [totalDoors, setTotalDoors] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [mileage, setMileage] = useState(0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission, potentially sending data to a server
    // For example:
    // const carData = { brand, model, year, transmissionType, color, fuelType, engineCapacity, totalDoors, rentalPrice, mileage };
    // console.log(carData);
    // You would send carData to your server here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-4 bg-white p-8 shadow rounded-lg">
      {/* Input fields for each car attribute */}
      {/* Brand Field */}
      <div>
        {/* ... (other input fields similar to the following pattern) */}
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
      {/* Model Field */}
      <div>
        {/* ... */}
      </div>
      {/* Year Field */}
      <div>
        {/* ... */}
      </div>
      {/* ... other fields ... */}
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