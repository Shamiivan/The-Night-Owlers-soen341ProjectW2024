import React from 'react';
import ReservationCard from '@/components/reservations/ReserveCard';
import { getReservationsByUserId } from '@/utils/reservationRepository';

async function fetchUserReservations(userId) {
  const response = await getReservationsByUserId(userId);
  if (response.success) {
    return response.value;
  } else {
    return [];
  }
}

export default async function ViewReserve({ params }) {

  const reservations = await fetchUserReservations(params);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Reservations</h1>
      <div className="container mx-auto mt-8">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation._id} // Assuming reservation has _id property
            userId={reservation.userId}
            vehicleId={reservation.vehicleId}
            pickupDate={reservation.pickupDate}
            returnDate={reservation.returnDate}
            comments={reservation.comments}
            status={reservation.status}
          />
        ))}
      </div>
    </div>
  );
};
