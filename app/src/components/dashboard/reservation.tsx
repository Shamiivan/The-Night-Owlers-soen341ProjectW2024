import React, { useEffect, useState } from "react";
import ReservationCard from "./reservationCard";
import { IReservation } from "@/models/reservation";

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
            userId={reservation.userId._id}
            vehicleId={reservation.vehicleId._id}
            pickupDate={reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date()}
            pickupTime={reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            returnDate={reservation.returnDateTime ? new Date(reservation.returnDateTime) : new Date()}
            returnTime={reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            name = {reservation.name}
            status={reservation.status}
        />
      ))}

    </div>
  );
}
