import React, { useState, useEffect } from 'react';
import { IVehicle } from '@/models/vehicle';

interface Props {
  isModify: boolean;
  vehicleId: string;
}

const ReserveDetail: React.FC<Props> = ({ isModify, vehicleId }) => {
  const [vehicleDetails, setVehicleDetails] = useState<IVehicle | null>(null);

  const fetchVehicleDetails = async () => {
    try {
      if (!vehicleId) {
        console.error('Vehicle ID is undefined.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/${vehicleId}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vehicle details');
      }

      const data = await response.json();

      if (data.success) {
        setVehicleDetails(data.value);
      } else {
        console.error('Failed to fetch vehicle details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    }
  };

  useEffect(() => {
    // Call fetchVehicleDetails when the component mounts or when isModify or vehicleId changes
    if (vehicleId) {
      fetchVehicleDetails();
    }
  }, [vehicleId]);

  return (
    <div className='px-10 pb-10 mt-5 border-2 border-black rounded-xl'>
      <h1 className='font-semibold'>{isModify ? 'New Car' : 'Reserve Car Detail'}</h1>
      {vehicleDetails && (
        <>
          <img src={vehicleDetails.imageUrl} className='w-fit my-3 rounded-sm' alt='Car' />
          <div className='border-1 rounded-sm bg-slate-200 p-3'>
            <p className='text-xl font-semibold'>{vehicleDetails.brand} {vehicleDetails.vehicleModel}</p>
            <p className=' mt-3'>
            <b>Type:</b> {vehicleDetails.automatic ? 'Automatic' : 'Manual'}
            </p>
            <p className=''><b>No. of seats:</b> {vehicleDetails.nPeople}</p>
            <p className=''><b>Fuel Type:</b> {vehicleDetails.fuelType}</p>
            <p className=''>
            <b>Engine Capacity:</b> {vehicleDetails.engineCapacity} cc
            </p>
            <p className=''><b>Year:</b> {vehicleDetails.year}</p>
            <p className='mt-4 text-lg font-semibold'>Rental Price: ${vehicleDetails.rentalPrice}/day</p>
          </div>
          
        </>
      )}
    </div>
  );
};

export default ReserveDetail;
