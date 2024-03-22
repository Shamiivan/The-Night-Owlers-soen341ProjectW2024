import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import Link  from "next/link";
import React from "react";
import "@/styles/global.css";
import { getVehicleById } from "@/utils/vehicleRepository";
import Image from 'next/image';
import DeleteReservation from "@/components/user/deleteReservation";

async function fetchVehicle(id) {
    const response = await getVehicleById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}


export default async function ReservationList({ userId, vehicleId, pickupDate, returnDate, comments, status, id}) {

    const session = getSession();
    let vehicleData = null;
    if (session) {
        try {
            vehicleData = await fetchVehicle(vehicleId);
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
            // Optionally, you can display an error message to the user
            vehicleData = null;
        }
    }

    if (!vehicleData) {
        return (
            <div className="flex items-center justify-center">
                <div className="">
                    Vehicle data not available
                </div>
            </div>
        );
    }

    const deleteReservation = async () => {

        const isConfirmed = window.confirm(`Are you sure you want to delete this reservation?`);
        try {
        const response = await fetch(`/api/reservations/${_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete reservation');
        } else {
            window.location.reload();
        }

        } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('Failed to delete reservation');
        }
    };

    const formattedPickupDate = pickupDate.toLocaleDateString('es-ES');
    const formattedReturnDate = returnDate.toLocaleDateString('es-ES');

    return (
        <div className="bg-blue-100 shadow-md rounded-lg p-6 m-8">
            <Image src={vehicleData.imageUrl} alt="Car Image" width={200} height={200} className="rounded-lg"/>
            <p>{vehicleData.brand} {vehicleData.vehicleModel}</p>
            <p className="text-gray-500 dark:text-gray-400">Pickup Date: {formattedPickupDate}</p>
            <p className="text-gray-500 dark:text-gray-400">Return Date: {formattedReturnDate}</p>
            <p className="text-gray-500 dark:text-gray-400">Status: {status}</p>
            <div className="mt-4 flex space-x-2 items-center flex-row">
                <Link href={`/viewReservationDetail/${id}`} className="mt-auto w-full">
                    <Button>
                        View more
                    </Button>
                </Link>
                <div>
                    <DeleteReservation  />
                </div>
            </div>
        </div>
    );
}

