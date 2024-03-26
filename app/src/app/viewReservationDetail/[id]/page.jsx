import "@/styles/global.css";
import React from 'react'
import ReservationDetailCard from '@/components/reservationDetailCard'
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

export default async function ViewReservationDetail ({params}) {
    const reservation = await fetchReservation(params.id);
    
    const user = await fetchUser(reservation.userId);
    const vehicle = await fetchVehicle(reservation.vehicleId);

    if (!reservation) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ReservationDetailCard 
                reservation={reservation}
                vehicle={vehicle}
                user={user} />
        </div>
    )
}

