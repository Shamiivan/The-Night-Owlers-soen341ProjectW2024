import React from 'react';
import ReservationCard from '@/components/reservations/ReserveCard';
import { getReservationsByUserId, getAllReservations } from '@/utils/reservationRepository';



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
  const user = reservations[0].userId;

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">Hey {user.firstName}</h1>
        <p>Here are the cars you've reserved. You can click on a reservation to view more details.</p>
      </div>      
      <div className="container mx-auto mt-8">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation._id}
            userId={reservation.userId}
            vehicleId={reservation.vehicleId}
            pickupDate={reservation.pickupDate}
            returnDate={reservation.returnDate}
            comments={reservation.comments}
            status={reservation.status}
            id={reservation._id}
          />
        ))}
      </div>
    </div>
  );
};
