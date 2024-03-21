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
      {/*Search bar #2 that contains branch location in drop down*/}
        <div className="relative border rounded-lg mt-4">
        <select
          id="search-branch"
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md leading-tight focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select a branch</option>
          <option value="west-island">West Island</option>
          <option value="lasalle">Lasalle</option>
          <option value="montreal">Montreal</option>
          <option value="laval">Laval</option>
          <option value="brossard">Brossard</option>
          <option value="pie-ix">Pie-IX</option>
          {/* Add more options as needed */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <span>▼</span>
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
