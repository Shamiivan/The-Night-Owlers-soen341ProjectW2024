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

  return (
    <div className="p-6 max-w-[700px] mx-auto bg-gray-50 dark:bg-gray-900 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Reservation Detail</h1>
        <div className="space-y-6 grid grid-cols-2 gap-4">
            <div className="space-y-2 border-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg" >
                <p className="text-gray-800 dark:text-white">Reservation ID:{reservation.id}</p>
                <p className="text-gray-800 dark:text-white">Renter Name: {user.firstName} {user.lastName}</p>
                <p className="text-gray-800 dark:text-white">Renter Email: {user.email}</p>
                <p className="text-gray-800 dark:text-white">Reservation Status: {reservation.status}</p>
            </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg border-b-2">Pick Up Date: {pickupDate}</p>
                <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg border-b-2">Pick Up Time: {pickupTime}</p>
            </div>
            <div>
                <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg border-b-2">Return Date: {returnDate}</p>
                <p className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg border-b-2">Return Time: {returnTime}</p>
            </div>
        </div>
        </div>
            <div className="grid  grid-cols-2 gap-4">
                <div className="flex justify-center item-center align-middle">
                    <Image src={vehicle.imageUrl} alt="car img" width={300} height={300} className="mx-auto" />
                </div>
                <div className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-white">Brand: {vehicle.brand}</p>
                    <p className="text-gray-800 dark:text-white">Model: {vehicle.vehicleModel}</p>
                    <p className="text-gray-800 dark:text-white">Color: {vehicle.color}</p>
                    <p className="text-gray-800 dark:text-white">Plate Number: {vehicle.licensePlate}</p>
                    <p className="text-gray-800 dark:text-white">Price Per Day: ${vehicle.rentalPrice}</p>
                </div>
            </div>
        <div>
            <p className="text-gray-800 dark:text-white">Total Price: ${reservation.totalPrice}</p>
            <p className="text-gray-800 dark:text-white">Comments: { reservation.comments ? reservation.comments : "No comments"}</p>
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


