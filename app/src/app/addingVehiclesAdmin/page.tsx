'use client';
import React, { useState } from 'react';
import "@/styles/global.css";

const AddingVehiclesAdmin = () => {
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
    const response = await fetch('/api/addCar', {
      method: 'POST',
      body: JSON.stringify({ brand, model, year, transmissionType, color, fuelType, engineCapacity, totalDoors, rentalPrice, mileage }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
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
      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />  
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="transmissionType" className="block text-sm font-medium text-gray-700">Transmission Type:</label>
        <input
          type="text"
          id="transmissionType"
          value={transmissionType}
          onChange={(e) => setTransmissionType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />  
      </div>
      <div className="mb-4">
        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type:</label>
        <input
          type="text"
          id="fuelType"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700">Engine Capacity:</label>
        <input
          type="text"
          id="engineCapacity"
          value={engineCapacity}
          onChange={(e) => setEngineCapacity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalDoors" className="block text-sm font-medium text-gray-700">Total Doors:</label>
        <input
          type="text"
          id="totalDoors"
          value={totalDoors}
          onChange={(e) => setTotalDoors(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">Rental Price:</label>
        <input
          type="text"
          id="rentalPrice"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
        <input
          type="text"
          id="mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
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