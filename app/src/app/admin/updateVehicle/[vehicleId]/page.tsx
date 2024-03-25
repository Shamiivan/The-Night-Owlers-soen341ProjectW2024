'use client'
import { useState, useEffect } from 'react';
import "@/styles/global.css";
import { IVehicle } from '@/models/vehicle';
import UpdateVehicleForm from '@/components/dashboard/updateVehicleForm';

export default function VehiclePage({params} : {params: {vehicleId: string}}) {
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    console.log(params);
    const id = params.vehicleId;

    useEffect(() => {
        const fetchVehicle = async () => {
            
            if (!id) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/${id}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch vehicle");
                }
                const data = await res.json();
                setVehicle(data.value);
            } catch (error) {
                console.log("Error loading vehicle: ", error);
            }
        };

        fetchVehicle();
    }, [id]);
    return (
        <div>
            {vehicle ? (
                <UpdateVehicleForm
                    oldBrand={vehicle.brand}
                    oldImageUrl={vehicle.imageUrl}
                    oldCategory={vehicle.category}
                    oldVehicleModel={vehicle.vehicleModel}
                    oldYear={vehicle.year}
                    oldAutomatic={vehicle.automatic}
                    oldNPeople={vehicle.nPeople}
                    oldNBags={vehicle.nBags}
                    oldColor={vehicle.color}
                    oldFuelType={vehicle.fuelType}
                    oldEngineCapacity={vehicle.engineCapacity}
                    oldRentalPrice={vehicle.rentalPrice}
                    oldMileage={vehicle.mileage}
                    oldDescription={vehicle.description}
                    oldLicensePlate={vehicle.licensePlate}
                    oldVIN={vehicle.VIN}
                    id={vehicle._id.toString()}
                />
            ) : (
                <p>Loading vehicle data...</p>
            )}
        </div>
    );
}
