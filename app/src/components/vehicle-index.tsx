import { getAllVehicles } from "@/utils/vehicleRepository";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

async function fetchVehicles() {
  const response = await getAllVehicles();
  if (response.success) {
    return response.value;
  } else {
    return [];
  }
}


export async function VehicleIndex() {
  const data = await fetchVehicles();
  console.log(data);
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6 mb-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {/* Title and Subtitle */}
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">Rent a Car</h1>
        <p className="max-w-[600px] text-gray-500 text-xl md:text-xl lg:text-2xl xl:text-3xl dark:text-gray-400">
          Find the perfect vehicle for your next adventure.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 mt-4 items-center">
        {/* Search Bar #1 */}
        <div className="flex-grow">
          <Label className="sr-only" htmlFor="search-make-model">Search by make or model</Label>
          <Input
            id="search-make-model"
            className="w-full border border-gray-300 text-gray-700 py-1.5 px-4 rounded-md leading-tight focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search by make or model"
          />
        </div>
      {/*Search bar #2 for branch */}
      <div className="flex-grow">
          <div className="relative w-full">
            <Input
              className="w-full border border-gray-300 text-gray-700 py-1.5 px-4 rounded-l-md leading-tight focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter a postal code or Airport"
            />
            <button
             className="absolute inset-y-0 right-0 bg-primary hover:bg-primary-dark text-white rounded-r-md py-1.5 px-3 text-sm leading-normal transition-colors duration-200"
             type="button"
            >
              Find Branch
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map(vehicle => (
          <VehicleCard
            key={vehicle.id} // Always use a key when mapping over an array
            brand={vehicle.brand}
            category={vehicle.category}
            price={vehicle.rentalPrice}
            vehicleModel={vehicle.vehicleModel}
            image={vehicle.imageUrl}
            id={vehicle.id}
          />
        ))}
      </div>
    </div>
  );
}
