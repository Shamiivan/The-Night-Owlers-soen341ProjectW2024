'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import "@/styles/global.css"
import { Button } from '../ui/button';
import Link from 'next/link';

interface vehicleProps{
    oldBrand: string;
    oldImageUrl: string;
    oldCategory: string;
    oldVehicleModel: string;
    oldYear: number;
    oldAutomatic: boolean;
    oldNPeople: number;
    oldNBags: number;
    oldColor: string;
    oldFuelType: string;
    oldEngineCapacity: number;
    oldRentalPrice: number;
    oldMileage: number;
    oldLicensePlate: string;
    oldVIN: string;
    oldDescription: string;
    id: string;
}

const UpdateVehicleForm = ({ oldBrand, oldImageUrl, oldCategory, 
    oldVehicleModel,oldYear, oldAutomatic,oldNPeople,
    oldNBags, oldColor, oldFuelType, oldEngineCapacity,
    oldRentalPrice, oldMileage, oldLicensePlate, oldVIN, oldDescription, id}: vehicleProps) => {

    const [newBrand, setNewBrand] = useState(oldBrand);
    const [newImageUrl, setNewImageUrl] = useState(oldImageUrl);
    const [newCategory, setNewCategory] = useState(oldCategory);
    const [newVehicleModel, setNewVehicleModel] = useState(oldVehicleModel);
    const [newYear, setNewYear] = useState(oldYear);
    const [newAutomatic, setNewAutomatic] = useState(oldAutomatic);
    const [newNPeople, setNewNPeople] = useState(oldNPeople);
    const [newNBags, setNewNBags] = useState(oldNBags);
    const [newColor, setNewColor] = useState(oldColor);
    const [newFuelType, setNewFuelType] = useState(oldFuelType);
    const [newEngineCapacity, setNewEngineCapacity] = useState(oldEngineCapacity);
    const [newRentalPrice, setNewRentalPrice] = useState(oldRentalPrice);
    const [newMileage, setNewMileage] = useState(oldMileage);
    const [newLicensePlate, setNewLicensePlate] = useState(oldLicensePlate);
    const [newVIN, setNewVIN] = useState(oldVIN);
    const [newDescription, setNewDescription] = useState(oldDescription);
    const router = useRouter();
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to update this vehicle?');

        if (isConfirmed) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ brand: newBrand, imageUrl: newImageUrl, category: newCategory, vehicleModel: newVehicleModel, year: newYear, automatic: newAutomatic, nPeople: newNPeople, nBags: newNBags, color: newColor, fuelType: newFuelType, engineCapacity: newEngineCapacity, rentalPrice: newRentalPrice, mileage: newMileage, licensePlate: newLicensePlate, VIN: newVIN, id}),
                headers: {
                    'Content-Type': 'application/json',
                },
            
            });
            if (response.ok) {
                const data = await response.json();
                router.push("/admin/vehicles");
            } else {
                console.error('Error updating vehicle:', response.statusText);
            }
            alert('Information sent successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 bg-slate-200 p-8 rounded">
            <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand:</label>
                <input
                    type="text"
                    id="brand"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <img src={newImageUrl} alt="Vehicle Image" className="mt-2 h-20 rounded-md shadow-md " />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">Vehicle Model:</label>
                <input
                    type="text"
                    id="vehicleModel"
                    value={newVehicleModel}
                    onChange={(e) => setNewVehicleModel(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
                <input
                    type="number"
                    id="year"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4 flex">
                <label htmlFor="automatic" className=" text-sm font-medium text-gray-700">Automatic:</label>
                <input
                    type="checkbox"
                    id="automatic"
                    checked={newAutomatic}
                    onChange={(e) => setNewAutomatic(e.target.checked)}
                    className="ml-2 mt-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="nPeople" className="block text-sm font-medium text-gray-700">Number of People:</label>
                <input
                    type="number"
                    id="nPeople"
                    value={newNPeople}
                    onChange={(e) => setNewNPeople(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="nBags" className="block text-sm font-medium text-gray-700">Number of Bags:</label>
                <input
                    type="number"
                    id="nBags"
                    value={newNBags}
                    onChange={(e) => setNewNBags(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type:</label>
                <input
                    type="text"
                    id="fuelType"
                    value={newFuelType}
                    onChange={(e) => setNewFuelType(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700">Engine Capacity:</label>
                <input
                    type="number"
                    id="engineCapacity"
                    value={newEngineCapacity}
                    onChange={(e) => setNewEngineCapacity(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">Rental Price:</label>
                <input
                    type="number"
                    id="rentalPrice"
                    value={newRentalPrice}
                    onChange={(e) => setNewRentalPrice(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage:</label>
                <input
                    type="number"
                    id="mileage"
                    value={newMileage}
                    onChange={(e) => setNewMileage(parseInt(e.target.value))}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">Liense Plate:</label>
                <input
                    type="text"
                    id="licensePlate"
                    value={newLicensePlate}
                    onChange={(e) => setNewLicensePlate(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="VIN" className="block text-sm font-medium text-gray-700">VIN:</label>
                <input
                    type="text"
                    id="VIN"
                    value={newVIN}
                    onChange={(e) => setNewVIN(e.target.value)}
                    className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className='flex justify-evenly'>
               <Button
                    type="submit"
                    className=" bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Vehicle
                </Button>
                <Link href="/admin/users">
                    <Button className=' py-2 px-4 '>
                        Back
                    </Button>
                </Link> 
            </div>
            
        </form>
    );
}
export default UpdateVehicleForm;