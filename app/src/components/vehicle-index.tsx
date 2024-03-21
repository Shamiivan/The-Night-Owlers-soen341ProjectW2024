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
    <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">Rent a Car</h1>
        <p className="max-w-[600px] text-gray-500 text-xl md:text-xl lg:text-2xl xl:text-3xl dark:text-gray-400">
          Find the perfect vehicle for your next adventure. Enter the make or model to get started.
        </p>
      </div>
      {/* Assuming you have an Input component that you want to keep */}
      <div className="border rounded-lg">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="search">Search</Label>
          <Input className="rounded-t-lg" id="search" placeholder="Search by make or model" />
        </div>
      </div>
      {/*Search bar #2 for branch */}
      <div className="flex gap-2 mt-4 items-center">
        <Input
          className="flex-grow border border-gray-300 text-gray-700 py-2 px-4 rounded-l-md leading-tight focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter a postal code or Airport"
        />
        <button
          className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-3 py-1.5 transition-colors duration-200"
          type="button"
        >
          Find Branch
        </button>
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
