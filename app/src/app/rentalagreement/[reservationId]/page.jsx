import "@/styles/global.css";
import React from 'react';
import RentalAgreementForm from "@/components/rentalagreementForm";
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
            {/* Render other properties as needed */}
            <RentalAgreementForm
                firstname={user.firstName}
                lastname={user.lastName}
                address={user.address}
                phone={user.phone}
                email={user.email}
                license={reservation.license}
                brand={vehicle.brand}
                model={vehicle.vehicleModel}
                year={vehicle.year}
                licensePlate={vehicle.licensePlate}
                VIN={vehicle.VIN}
                color={vehicle.color}
                pickupDate={reservation.pickupDate}
                returnDate={reservation.returnDate}
                pickupLocation={reservation.pickupLocation}
                returnLocation={reservation.returnLocation}
                mileage={vehicle.mileage}
                price={vehicle.rentalPrice}
                addition={reservation.addition}
                id={reservation._id.toString()}
            />
        </div>
    );
}
