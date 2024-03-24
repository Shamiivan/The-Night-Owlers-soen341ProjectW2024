'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function ReservationDetailCard ({ reservation, vehicle, user }) {
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const pickupDate = reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleDateString('en-US') : "";
    const pickupTime = reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : '';
    const returnDate = reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleDateString('en-US') : "";
    const returnTime = reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : '';
    
    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

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

  return (
    <div className="p-6 max-w-[700px] mx-auto bg-gray-50 dark:bg-gray-900 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Reservation Detail</h1>
        <div className="space-y-6 grid grid-cols-2 gap-4">
            <div>
                 <div className="">
                    <div className="flex justify-center item-center align-middle mb-6 mt-5">
                        <Image src={vehicle.imageUrl} alt="car img" width={300} height={300} className="mx-auto" />
                    </div>
                    <div className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2">
                        <p className="text-gray-800 dark:text-white"><span className="font-semibold">Brand:</span> {vehicle.brand}</p>
                        <p className="text-gray-800 dark:text-white"><span className="font-semibold">Model:</span> {vehicle.vehicleModel}</p>
                        <p className="text-gray-800 dark:text-white"><span className="font-semibold">Color:</span> {vehicle.color}</p>
                        <p className="text-gray-800 dark:text-white"><span className="font-semibold">Plate Number:</span> {vehicle.licensePlate}</p>
                        <p className="text-gray-800 dark:text-white"><span className="font-semibold">Price Per Day:</span> ${vehicle.rentalPrice}</p>
                    </div>
                </div>
                <div>
                    <p className="text-lg my-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Total Price:</span> ${reservation.totalPrice}</p>
                </div>

            </div>
            <div>
                <div className="flex justify-end mb-8">
                    <p className={`font-semibold px-4 py-2 rounded-lg shadow-sm shadow-black ${getStatusColor(reservation.status)}`}>
                    <span className="font-semibold">Status:</span> {reservation.status}
                    </p>
                </div>
                <p className="mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Reservation ID:</span>{reservation._id}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Pick Up Date:</span> {pickupDate}</p>
                        <p className="mt-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Pick Up Time:</span> {pickupTime}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Return Date:</span> {returnDate}</p>
                        <p className="mt-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Return Time:</span> {returnTime}</p>
                    </div>
                </div>
                <div className="space-y-2 my-4 border-b-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg" >
                    <p className="text-gray-800 dark:text-white"><span className="font-semibold">Renter Name:</span> {user.firstName} {user.lastName}</p>
                    <p className="text-gray-800 dark:text-white"><span className="font-semibold">Renter Email:</span> {user.email}</p>
                    <p className="text-gray-800 dark:text-white"><span className="font-semibold">Phone Number:</span> {user.phone}</p>
                    <p className="text-gray-800 dark:text-white"><span className="font-semibold">Driver License:</span> {reservation.driverlicense}</p>
                </div>
                <p className="mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Comments:</span> { reservation.comments ? reservation.comments : "No comments"}</p>
            </div>
        </div>
       {editMode ? (
            <div className="space-x-4 flex justify-between">
                <Button>Save</Button>
                <Button onClick={toggleEditMode} variant={"secondary"}>Cancel</Button>
            </div>
        ) : (
            <div className="space-x-4 flex justify-between">
                <Button onClick={toggleEditMode}>Edit</Button>
                <Button onClick={() => router.back()} variant={"secondary"}>Back</Button>
            </div>
        )}

    </div>
  );
}


