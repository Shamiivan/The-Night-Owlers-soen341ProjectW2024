import React from 'react';
import { getSession } from "next-auth/react"
import { getVehicleById } from "@/utils/vehicleRepository";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ViewVehicle({ params }) {

  async function getVehicle(){
    try {
      const res = await getVehicleById(params.vehicleId);
      if(res.success){
        return res.value;
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      return null;
    }
  }

  const vehicle = await getVehicle();

  if (!vehicle) {
    return (
      <div>
        <p className='flex items-center justify-center font-semibold text-2xl'>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className='mt-10 max-w-6xl mx-auto px-4 lg:px-6 space-y-6  mb-8'>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">Car Detail</h1>
      </div>
      <div className='px-10 pb-10 mt-5 border-2 border-slate-300 rounded-xl grid grid-cols-2'>
        
        <div className='flex justify-center items-center'>
          <img src={vehicle.imageUrl} className='w-auto h-auto max-h-96 rounded-sm' alt='Car' />
        </div>
        <div className='border-2 border-slate-300 rounded-sm bg-slate-200 shadow-md px-6 m-10'>
          <p className=' mt-3 mb-2 text-2xl font-bold flex justify-center'>{vehicle.brand} {vehicle.vehicleModel}</p>
          <p><b>Category:</b> {vehicle.category}</p>
          <p><b>Year:</b> {vehicle.year}</p>
          <p><b>Automatic:</b> {vehicle.automatic ? 'Yes' : 'No'}</p>
          <p><b>No. of seats:</b> {vehicle.nPeople}</p>
          <p><b>No. of bags:</b> {vehicle.nBags}</p>
          <p><b>Color:</b> {vehicle.color}</p>
          <p><b>Fuel Type:</b> {vehicle.fuelType}</p>
          <p><b>Engine Capacity:</b> {vehicle.engineCapacity} cc</p>
          <p><b>Rental Price:</b> ${vehicle.rentalPrice}/day</p>
          <p><b>Mileage:</b> {vehicle.mileage} km/l</p>
          <p><b>Description:</b> {vehicle.description ? vehicle.description : "None"}</p>
          <div className="mt-4 flex space-x-2 items-center flex-row">
            
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="mt-auto w-full">
            <Link href={`/reservation/${params.vehicleId}`}>
                <Button variant="secondary" className="text-primary-foreground mt-auto ">
                    Make a reservation
                </Button>
            </Link>
        </div>
        <Link href={`/vehicles`}>
            <Button variant="ghost" className="mt-auto w-full">Back</Button>
        </Link>
      </div>
    </div>
    
  );
}
