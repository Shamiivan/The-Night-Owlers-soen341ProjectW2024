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
  );
}
