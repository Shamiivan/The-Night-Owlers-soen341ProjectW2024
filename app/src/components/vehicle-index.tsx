import React from "react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";



export const VehicleIndex: React.FC<any> = ({ vehicles }) => {
 return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
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
