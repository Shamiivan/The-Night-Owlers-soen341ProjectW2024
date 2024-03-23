import React, { useEffect, useState } from "react";
import VehicleCard from "@/components/dashboard/vehicleCard"; // Adjust the import path as necessary
import { IVehicle } from "@/models/vehicle"; // Adjust the import path as necessary

export default function VehicleList() {
 const [vehicles, setVehicles] = useState<IVehicle[]>([]);

 useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const data = await res.json();
        const vehicles = Array.isArray(data.value) ? data.value : [];
        setVehicles(vehicles);
      } catch (error) {
        console.log("Error loading vehicles: ", error);
      }
    };

    fetchVehicles();
 }, []);

 return (
    <div className="p-8 bg-ghost mb-2 space-y-8 max-h-[650px] overflow-y-auto">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          _id={vehicle._id}
          brand={vehicle.brand}
          imageUrl={vehicle.imageUrl}
          category={vehicle.category}
          vehicleModel={vehicle.vehicleModel}
          year={vehicle.year}
          automatic={vehicle.automatic}
          nPeople={vehicle.nPeople}
          nBags={vehicle.nBags}
          color={vehicle.color}
          fuelType={vehicle.fuelType}
          engineCapacity={vehicle.engineCapacity}
          rentalPrice={vehicle.rentalPrice}
          mileage={vehicle.mileage}
        />
      ))}
    </div>
 );
}
