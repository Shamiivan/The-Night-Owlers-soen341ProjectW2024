import React from 'react';
import ReservationList from '@/components/reservations/reservationList';
import { getReservationsByUserId } from '@/utils/reservationRepository';



async function fetchUserReservations(userId) {
  const response = await getReservationsByUserId(userId);
  console.log('Fetch reservations response:', response);
  if (response.success) {
    console.log('Successfully fetched reservations');
    return response.value;
  } else {
    console.log('Failed to fetch reservations, returning empty array');
    return [];
  }
}


export default async function ViewReserve({ params }) {

  const reservations = await fetchUserReservations(params.userId);
  
  if (!reservations[0]) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">No Reservations Found</h1>
        <p>It looks like you haven't reserved any cars yet.</p>
      </div>
    );
  }

  const user = reservations[0].userId;

  

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">Hey {user.firstName}</h1>
        <p>Here are the cars you've reserved. You can click on a reservation to view more details.</p>
      </div>      
      <div className="container mx-auto mt-8">
        {reservations.map((reservation) => (
          <ReservationList
            key={reservation._id}
            userId={reservation.userId._id}
            vehicleId={reservation.vehicleId._id}
            pickupDate={reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date()}
            pickupTime={reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            returnDate={reservation.returnDateTime ? new Date(reservation.returnDateTime) : new Date()}
            returnTime={reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            comments={reservation.comments}
            status={reservation.status}
            id={reservation._id}
          />
        ))}
      </div>
    </div>
  );
};
