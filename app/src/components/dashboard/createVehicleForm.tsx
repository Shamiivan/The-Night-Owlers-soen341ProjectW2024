import React, { useState } from 'react';
import "@/styles/global.css";
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';
import Footer from "@/components/ui/Footer";

const CreateVehicleForm = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [year, setYear] = useState('');
    const [automatic, setAutomatic] = useState(false);
    const [nPeople, setNPeople] = useState('');
    const [nBags, setNBags] = useState('');
    const [color, setColor] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [engineCapacity, setEngineCapacity] = useState('');
    const [totalDoors, setTotalDoors] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [mileage, setMileage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles`, {
            method: 'POST',
            body: JSON.stringify({
                brand,
                imageUrl,
                vehicleModel,
                category,
                year: parseInt(year),
                automatic,
                nPeople: parseInt(nPeople),
                nBags: parseInt(nBags),
                color,
                fuelType,
                engineCapacity: parseInt(engineCapacity),
                totalDoors: parseInt(totalDoors),
                rentalPrice: parseFloat(rentalPrice),
                mileage: parseFloat(mileage),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto max-h-[650px] overflow-y-auto">
            {/* Brand */}
            <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand:</label>
                <input
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Image URL */}
            <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Vehicle Model */}
            <div className="mb-4">
                <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">Vehicle Model:</label>
                <input
                    type="text"
                    id="vehicleModel"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Vehicle category */}
            <div className="mb-4">
                <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">Vehicle Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Year */}
            <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Transmission Type */}
            <div className="mb-4">
                <label htmlFor="automatic" className="block text-sm font-medium text-gray-700">Automatic:</label>
                <input
                    type="checkbox"
                    id="automatic"
                    checked={automatic}
                    onChange={(e) => setAutomatic(e.target.checked)}
                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Number of People */}
            <div className="mb-4">
                <label htmlFor="nPeople" className="block text-sm font-medium text-gray-700">Number of People:</label>
                <input
                    type="number"
                    id="nPeople"
                    value={nPeople}
                    onChange={(e) => setNPeople(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Number of Bags */}
            <div className="mb-4">
                <label htmlFor="nBags" className="block text-sm font-medium text-gray-700">Number of Bags:</label>
                <input
                    type="number"
                    id="nBags"
                    value={nBags}
                    onChange={(e) => setNBags(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Color */}
            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Fuel Type */}
            <div className="mb-4">
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type:</label>
                <input
                    type="text"
                    id="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Engine Capacity */}
            <div className="mb-4">
                <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700">Engine Capacity:</label>
                <input
                    type="number"
                    id="engineCapacity"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Total Doors */}
            <div className="mb-4">
                <label htmlFor="totalDoors" className="block text-sm font-medium text-gray-700">Total Doors:</label>
                <input
                    type="number"
                    id="totalDoors"
                    value={totalDoors}
                    onChange={(e) => setTotalDoors(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Rental Price */}
            <div className="mb-4">
                <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">Rental Price:</label>
                <input
                    type="number"
                    id="rentalPrice"
                    value={rentalPrice}
                    onChange={(e) => setRentalPrice(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Mileage */}
            <div className="mb-4">
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
                <input
                    type="number"
                    id="mileage"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {/* Submit */}
            <div className="mb-4">
                <Link href='/admin/vehicles'>
                    <Button
                        type="submit"
                        className="w-full bg-indigo-500 text-white p-3 rounded-md font-medium hover:bg-indigo-600"
                    >
                        Submit
                    </Button>
                </Link>

            </div>
        </form>

        </div>

    );
}
export default CreateVehicleForm;