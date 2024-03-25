import "@/styles/global.css";
import React from 'react';
import RentalAgreementForm from "@/components/rentalagreement"
import { getReservationById } from "@/utils/reservationRepository";
import { getUserById } from "@/utils/userRepository";
import { getVehicleById } from "@/utils/vehicleRepository";

async function fetchReservation(id) {
    const response = await getReservationById(id);
    if (response.success) {
        console.log('Fetched reservation:', response.value);
        return response.value;
    } else {
        console.log('Failed to fetch reservation:', response.error);
        return null;
    }
}

async function fetchUser(id) {
    const response = await getUserById(id);
    if (response.success) {
        console.log('Fetched user:', response.value);
        return response.value;
    } else {
        console.log('Failed to fetch user:', response.error);
        return null;
    }
}

async function fetchVehicle(id) {
    const response = await getVehicleById(id);
    if (response.success) {
        console.log('Fetched vehicle:', response.value);
        return response.value;
    } else {
        console.log('Failed to fetch vehicle:', response.error);
        return null;
    }
}

export default async function RentalAgreement({ params }) {
    const reservation = await fetchReservation(params.reservationId);
    
    const user = await fetchUser(reservation.userId);
    const vehicle = await fetchVehicle(reservation.vehicleId);

    // Check if reservation is null or undefined
    if (!reservation) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div>
            <RentalAgreementForm
                user={user}
                vehicle={vehicle}
                reservation={reservation}
            />
        </div>
    );
}
