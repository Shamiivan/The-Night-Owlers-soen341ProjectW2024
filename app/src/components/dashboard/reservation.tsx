import React, { useEffect, useState } from "react";
import ReservationCard from "./reservationCard";
import { IReservation } from "@/models/Reservation";

export default function ReservationsList() {
  const [reservations, setReservation] = useState<IReservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await res.json();
        const reservations = Array.isArray(data.value) ? data.value : [];
        setReservation(reservations);
      } catch (error) {

        console.log("Error loading reservations: ", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-8 bg-ghost mb-2 space-y-8 max-h-[650px] overflow-y-auto">
      {reservations.map((reservation) => (
        <ReservationCard
            key={reservation._id}
            _id={reservation._id}
            userId={reservation.userId}
            vehicleId={reservation.vehicleId}
            pickupDate={reservation.pickupDate}
            returnDate={reservation.returnDate}
            status={reservation.status}
        />
      ))}

    </div>
  );
}
