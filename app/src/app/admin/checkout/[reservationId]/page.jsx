import "@/styles/global.css";
import React from 'react';
import CheckoutForm from "@/components/dashboard/checkoutForm";
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

export default async function CheckOut({ params }){
    const reservation = await fetchReservation(params.reservationId);

    const user = await fetchUser(reservation.userId);
    const vehicle = await fetchVehicle(reservation.vehicleId);

    // Check if reservation is null or undefined
    if (!reservation) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div>
            {/* Render other properties as needed */}
            <CheckoutForm
                user={user}
                vehicle={vehicle}
                reservation={reservation}
            />
        </div>
    );
}
