"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IVehicle } from '@/models/Vehicle';

interface Reservation {
    img: string;
    id: number;
    car: string;
    startDate: string;
    endDate: string;
    location: string;
}

interface ReservationListProps {
    reservationsData: Reservation[];
}

const vehicleId = '65eab257e9452a4c005179ce';

const ReservationList: React.FC<ReservationListProps> = ({ reservationsData }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        setReservations(reservationsData);
    }, [reservationsData]);

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
    <div className="container mx-auto mt-8 border-2 border-black bg-slate-100">
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div>
          {reservations.map((reservation) => (
            <Link key={reservation.id} href={`/ViewReservation`} >
                {/* Replace the href with the actual link when available */}
                {/* href={`/reservation-summary/${reservation.id}`} */}
                {vehicleDetails && (
                  <div className="p-4 grid grid-cols-6 gap-4 cursor-pointer">
                  <img src={vehicleDetails.imageUrl} alt='car' className="w-full col-span-2 h-32 object-cover mb-4" />
                  <div className="col-span-2 bg-slate-200 p-4 border-2 border-slate-300 rounded-md shadow-md">
                    <p className=" text-xl font-bold">{vehicleDetails.brand} {vehicleDetails.vehicleModel}</p>
                    <div className='mt-4'>
                      <p className=''><b>No. of seats:</b> {vehicleDetails.nPeople}</p>
                      <p className=''><b>Fuel Type:</b> {vehicleDetails.fuelType}</p>
                      <p className=''>
                      <b>Engine Capacity:</b> {vehicleDetails.engineCapacity} cc
                      </p>
                      <p className=''><b>Year:</b> {vehicleDetails.year}</p>
                    </div>
                    
                  </div>
                  <div className="col-span-2 grid grid-row-2 text-center gap-3">
                      <div className='bg-slate-200 p-2 rounded-md border-2 border-slate-300 shadow-md'>
                        <p className='text-xl font-medium'>Start Date:</p>
                        <p>{reservation.startDate}</p>
                      </div>
                      <div className='bg-slate-200 p-2 rounded-md border-2 border-slate-300 shadow-md'>
                        <p className='text-xl font-medium'>End Date:</p>
                        <p>{reservation.endDate}</p>

                    </div>
                  </div>
                </div>
                )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
