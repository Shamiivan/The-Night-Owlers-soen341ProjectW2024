"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

const ReservationList: React.FC<ReservationListProps> = ({ reservationsData }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        setReservations(reservationsData);
    }, [reservationsData]);

    return (
    <div className="container mx-auto mt-8 border-2 border-black bg-slate-100">
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div>
          {reservations.map((reservation) => (
            <Link key={reservation.id} href={`/ViewReservation`}>
                {/* Replace the href with the actual link when available */}
                {/* href={`/reservation-summary/${reservation.id}`} */}
                <div className="p-4 grid grid-cols-6 gap-4 cursor-pointer">
                  <img src={reservation.img} alt='car' className="w-full h-32 object-cover mb-4" />
                  <div className="col-span-2 bg-slate-200 p-4 rounded-md">
                    <p className=" text-xl font-medium">{reservation.car}</p>
                    <p>Add more detail</p>
                  </div>
                  <div className="col-span-3 grid grid-row-2">
                    <div className='pl-10 bg-slate-200 p-4 mb-2 rounded-md'>
                      <p className='text-xl font-medium'>Location:</p>
                      <p>{reservation.location}</p>
                    </div>
                    <div className='grid grid-cols-2 pl-10 bg-slate-200 p-4 rounded-md'>
                      <div>
                        <p className='text-xl font-medium'>Start Date:</p>
                        <p>{reservation.startDate}</p>
                      </div>
                      <div>
                        <p className='text-xl font-medium'>End Date:</p>
                        <p>{reservation.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
