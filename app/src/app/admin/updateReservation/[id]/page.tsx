'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import "@/styles/global.css";
import { IReservation } from '@/models/reservation';
import UpdateReservationForm from '@/components/dashboard/updateReservationForm';


export default function ReservationrPage({params}) {

console.log(params.id);
const id = params.id;


 const [reservation, setReservation] = useState<IReservation | null>(null);

 useEffect(() => {
    const fetchReservation = async () => {
      if (!id) return; //

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch reservation");
        }
        console.log(res);

        const data = await res.json();
        setReservation(data.value);
      } catch (error) {
        console.log("Error loading reservation: ", error);
      }
    };

    fetchReservation();
 }, [id]);
 

 return (
    <div>
      <div>
        <p></p>
        {/* Render reservation data if available */}
      {reservation ? (
          <UpdateReservationForm
            oldUserId={reservation.userId?.toString() ?? ''}
            oldVehicleId={reservation.vehicleId?.toString() ?? ''}
            oldPickupDate={reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date()}
            oldPickupTime={reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            oldReturnDate={reservation.returnDateTime ? new Date(reservation.returnDateTime) : new Date()}
            oldReturnTime={reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ''}
            oldPickupLocation={reservation.pickupLocation}
            oldReturnLocation={reservation.returnLocation}
            oldtotalPrice={reservation.totalPrice ?? ''}
            oldComment={reservation.comments ?? ''}
            oldStatus={reservation.status ?? ''}
            oldName={reservation.name ?? ''}
            oldDriverlicense={reservation.driverlicense ?? ''}
            oldCreditcard={reservation.creditcard ?? ''}
            oldDamageReported={reservation.damageReported ?? false}

            id={reservation._id.toString()}
           />

      ) : (
        <p>Loading reservation data...</p>
      )}
      </div>

    </div>
 );
}
