
import React from 'react';
import { VehicleIndex } from "@/components/vehicle-index";
import { getAvailableVehicles, getAllVehicles } from '@/utils/vehicleRepository';
import { SearchBar } from '@/components/vehicles/SearchBar';

const fetchAvailableVehicles = async (pickUpDate:string, returnDate:string) => {
  const response = await getAvailableVehicles(pickUpDate, returnDate);
  if(response.success) {
    return response.value;
   } else{
      console.log(response.error.message);
      return [];
    }
}
const fetchAllVehicles = async () =>{
  const response = await getAllVehicles();
  if(response.success) {
    return response.value;
   } else{
      console.log(response.error.message);
      return [];
    }

}
export default async function Vehicles({searchParams}) {
  
  let vehicles = await fetchAllVehicles();
  if(searchParams.pickUpDate !== '' && searchParams.returnDate !== ''){
    console.log("new vehicles");
    vehicles = await fetchAvailableVehicles(searchParams.pickUpDate, searchParams.returnDate);
  }
  
 return (
      <main>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {/* Title and Subtitle */}
            <h1 className="text-3xl fontS-bold text-primary tracking-tighter sm:text-5xl">Rent a Car</h1>
            <p className="max-w-[600px] text-gray-500 text-xl md:text-xl lg:text-2xl xl:text-3xl dark:text-gray-400">
              Find the perfect vehicle for your next adventure.
            </p>
          </div>
          <SearchBar />
          <VehicleIndex vehicles={vehicles} />
        </div>
      </main>
 );
}
