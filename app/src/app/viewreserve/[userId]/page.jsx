import React from 'react';
import ReservationCard from '@/components/reservations/ReserveCard';
import { getReservationsByUserId, getAllReservations } from '@/utils/reservationRepository';
import { getUserById } from '@/utils/userRepository';

async function fetchUserReservations(userId) {
  console.log('Fetching reservations for user:', userId);
  const response = await getAllReservations();
  console.log('Fetch reservations response:', response);
  if (response.success) {
    console.log('Successfully fetched reservations');
    return response.value;
  } else {
    console.log('Failed to fetch reservations, returning empty array');
    return [];
  }
}


async function fetchUser(userId) {
  const response = await getUserById(userId);
  if (response.success) {
    return response.value;
  } else {
    return null;
  }
}


export default async function ViewReserve({ params }) {

  const reservations = await fetchUserReservations(params.userId);
  const user = await fetchUser(params.userId);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">View Reservations</h1>
        <p>(click on the reservation to view details)</p>
      </div>
      <p className="text-xl font-bold tracking-tighter ml-10">{user.firstName} {user.lastName}</p>
      
      <div className="container mx-auto mt-8">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation._id}
            userId={reservation.userId}
            vehicleId={reservation.vehicleId}
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
