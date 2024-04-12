import "@/styles/global.css";
import React from 'react';
import CheckinForm from "@/components/user/checkinForm";
import CheckoutForm from "@/components/user/checkoutForm";
import { getReservationById } from "@/utils/reservationRepository";
import { getUserById } from "@/utils/userRepository";
import { getVehicleById } from "@/utils/vehicleRepository";

async function fetchReservation(id) {
    const response = await getReservationById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}

async function fetchUser(id) {
    const response = await getUserById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}

async function fetchVehicle(id) {
    const response = await getVehicleById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}

export default async function CheckInCheckout({ params }){
    const reservation = await fetchReservation(params.reservationId);

    const user = await fetchUser(reservation.userId);
    const vehicle = await fetchVehicle(reservation.vehicleId);

    // Check if reservation is null or undefined
    if (!reservation) {
        return <div>Loading...</div>; // Handle loading state
    }

    
    if (reservation.status === "reserved") {
        return (
            <div>
                {/* Render other properties as needed */}
                <CheckinForm
                    user={user}
                    vehicle={vehicle}
                    reservation={reservation}
                />
            </div>
        );
    } else if (reservation.status === "rented") {
        return (
            <div>
                <CheckoutForm
                    user={user}
                    vehicle={vehicle}
                    reservation={reservation}
                />
            </div>
        );
    }
}
