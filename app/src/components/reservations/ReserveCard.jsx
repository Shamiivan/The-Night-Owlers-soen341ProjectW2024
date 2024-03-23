import { Button } from "@/components/ui/button";
import Link  from "next/link";
import React from "react";
import "@/styles/global.css";
import { getVehicleById } from "@/utils/vehicleRepository";
import Image from 'next/image';
import DeleteReservation from "@/components/user/deleteReservation";
import { getSession } from "next-auth/react"

async function fetchVehicle(id) {
    const response = await getVehicleById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}


export default async function ReservationList({ userId, vehicleId, pickupDate, pickupTime, returnDate, returnTime, comments, status, id}) {

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

                </div>
            </div>
        );
    }

    const formattedPickupDate = pickupDate.toLocaleDateString();
    const formattedReturnDate = returnDate.toLocaleDateString();

    return (
        <div className="bg-blue-100 shadow-md rounded-md p-6 m-8">
            <div className="grid grid-cols-2">
                <div className="flex items-center justify-center">
                    <Image src={vehicleData.imageUrl} alt="Car Image" width={200} height={200} className="rounded-lg"/>
                </div>
                <div>
                    <p>{vehicleData.brand} {vehicleData.vehicleModel}</p>
                    <p className="text-gray-500 dark:text-gray-400">Pickup Date: {formattedPickupDate}</p>
                    <p className="text-gray-500 dark:text-gray-400">Return Date: {formattedReturnDate}</p>
                    <p className="text-gray-500 dark:text-gray-400">Status: {status}</p>
                </div>
            </div>
            <div className="mt-4 flex space-x-2 items-center flex-row">
                <Link href={`/viewReservationDetail/${id}`} className="mt-auto w-full">
                    <Button>
                        View more
                    </Button>
                </Link>
                <div>
                    <DeleteReservation 
                     id = {id}/>
                </div>
            </div>
        </div>
    );
}

