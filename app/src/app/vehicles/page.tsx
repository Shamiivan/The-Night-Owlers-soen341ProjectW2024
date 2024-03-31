
import React from 'react';
import { VehicleIndex } from "@/components/vehicle-index";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getAllVehicles, getAvailableVehiclesByLocation, getVehiclesWithFilters, getVehicleCategories } from '@/utils/vehicleRepository';
import { SearchBar } from '@/components/vehicles/SearchBar';
import { getAllLocations } from '@/utils/locationRepository';



const fetchVehiclesWithSearchParams = async (searchParams) => {
  const response = await getVehiclesWithFilters(searchParams);
  if (response.success) {
    return response.value;
  } else {
    console.log(response.error.message);
    return [];
  }
}
const fetchAllLocations = async () => {
  const response = await getAllLocations();
  if (response.success) {
    return response.value;
  } else {
    console.log(response.error.message);
    return [];
  }
}

const fetchAllCategories = async () => {
  const response = await getVehicleCategories();
  if (response.success) {
    return response.value;
  } else {
    console.log(response.error.message);
    return [];
  }
}
const fetchAllVehicles = async () => {
  const response = await getAllVehicles();
  if (response.success) {
    return response.value;
  } else {
    console.log(response.error.message);
    return [];
  }

}
export default async function Vehicles({ searchParams }) {
  let vehicles;
  let categories = await fetchAllCategories();
  let locations = await fetchAllLocations();
  const locationOptions = locations?.map(location => ({
    id: location.id,
    name: location.name,
    postalCode: location.postalCode,
  }));
  locations = locations?.map(location => location.toJSON());
  if (Object.keys(searchParams).length === 0) {
    vehicles = await fetchAllVehicles();
  } else {
    vehicles = await fetchVehiclesWithSearchParams(searchParams);
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
        <SearchBar
          categories={categories}
          locations={locationOptions}
         />
        {/* <VehicleIndex vehicles={vehicles} /> */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vehicles?.map(vehicle => (
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
    </main>
  );
}
