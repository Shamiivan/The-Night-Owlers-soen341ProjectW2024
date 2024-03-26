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

    const getStatusColor = (status) => {
        switch (status) {
          case 'reserved':
            return 'bg-blue-300 text-black'; 
          case 'rented':
            return 'bg-green-500 text-white'; 
          default:
            return 'bg-slate-300 text-white'; 
        }
      };

    const formattedPickupDate = pickupDate.toLocaleDateString();
    const formattedReturnDate = returnDate.toLocaleDateString();

    return (
        <div className="bg-blue-100 shadow-md rounded-md p-6 m-8">
            <div className="grid grid-cols-2">
                <div className="flex items-center justify-center">
                    <Image src={vehicleData.imageUrl} alt="Car Image" width={200} height={200} className="rounded-lg"/>
                </div>
                <div className="flex flex-row justify-between">
                     <div>
                        <p>{vehicleData.brand} {vehicleData.vehicleModel}</p>
                        <p className="text-gray-500 dark:text-gray-400">Pickup Date: {formattedPickupDate}</p>
                        <p className="text-gray-500 dark:text-gray-400">Return Date: {formattedReturnDate}</p>
                    </div>
                    <div >
                        <p className={`font-semibold px-4 py-2 rounded-lg shadow-sm shadow-black ${getStatusColor(status)}`}>
                            Status: {status}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex space-x-2 justify-between">
                <div>
                    <Link href={`/viewReservationDetail/${id}`} className="mt-auto ">
                        <Button variant="outline">
                            View more
                        </Button>
                    </Link>
                    <Link href={status === 'rented' ? `/admin/checkout/${id}` : `/checkin/${id}`} className="mt-auto ml-4">
                        <Button variant={status === 'rented' ? 'secondary' : ''}>
                            {status === 'rented' ? 'Check Out' : 'Check In'}
                        </Button>
                    </Link>
                </div>
                <div>
                    <DeleteReservation
                     id = {id}/>
                </div>
            </div>
        </div>
    );
}

