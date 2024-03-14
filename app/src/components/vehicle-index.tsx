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
