import "@/styles/global.css";
import React from 'react';
import CheckinForm from "@/components/dashboard/checkinForm";
import CheckoutForm from "@/components/user/checkoutForm";
import { fetchDataById } from "@/utils/checkinout";


export default async function CheckInCheckout({ params }){
    const reservation = await fetchDataById(params.reservationId, 'reservation');

    const user = await fetchDataById(reservation.userId, 'user');
    const vehicle = await fetchDataById(reservation.vehicleId, 'vehicle');

    // Check if reservation is null or undefined
    if (!reservation) {
        return <div>Loading...</div>;
    }

    if (reservation.status === "rented") {
        return (
            <div>
                <CheckinForm
                    user={user}
                    vehicle={vehicle}
                    reservation={reservation}
                />
            </div>

        )
    } else if (reservation.status === "returned") {
        return (
            <div>
                <CheckoutForm
                    user={user}
                    vehicle={vehicle}
                    reservation={reservation}
                />
            </div>
        )
    }
}
