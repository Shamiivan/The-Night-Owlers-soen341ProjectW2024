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

    const pickupDateTime = reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : null;
    if (pickupDateTime) {
        const timezoneOffset = pickupDateTime.getTimezoneOffset() / 60;
        pickupDateTime.setHours(pickupDateTime.getHours() + timezoneOffset);
    }

    const returnDateTime = reservation.returnDateTime ? new Date(reservation.returnDateTime) : null;
    if (returnDateTime) {
        const timezoneOffset = returnDateTime.getTimezoneOffset() / 60;
        returnDateTime.setHours(returnDateTime.getHours() + timezoneOffset);
    }
    // Format the date as 'yyyy-mm-dd' string
    const pickupDate = pickupDateTime ? pickupDateTime.toISOString().split('T')[0] : "";
    const pickupTime = reservation.pickupDateTime ? new Date(reservation.pickupDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : '';
    const returnDate = returnDateTime ? returnDateTime.toISOString().split('T')[0] : "";
    const returnTime = reservation.returnDateTime ? new Date(reservation.returnDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : '';

    const [newName, setName] = useState(reservation.name);
    const [newpickupDate, setPickupDate] = useState(pickupDate);
    const [newpickupTime, setPickupTime] = useState(pickupTime);
    const [newreturnDate, setReturnDate] = useState(returnDate);
    const [newreturnTime, setReturnTime] = useState(returnTime);
    const [newcomments, setComments] = useState(reservation.comments);
    const [totalPrice, setTotalPrice] = useState(reservation.totalPrice);
    const today = new Date().toISOString().split('T')[0];
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

    const calculateTotalPrice = () => {
        const pickupDateTime = new Date(`${newpickupDate}T${newpickupTime}:00`);
        const returnDateTime = new Date(`${newreturnDate}T${newreturnTime}:00`);
        const daysDifference = Math.round((returnDateTime - pickupDateTime) / (1000 * 60 * 60 * 24) + 1);
        const totalPrice = daysDifference * vehicle.rentalPrice;
        setTotalPrice(totalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [newpickupDate, newpickupTime, newreturnDate, newreturnTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pickupDateTime = new Date(`${newpickupDate}T${newpickupTime}:00`);
        const returnDateTime = new Date(`${newreturnDate}T${newreturnTime}:00`);

        const isConfirmed = window.confirm('Are you sure you want to update this reservations?');

        if (isConfirmed) {
            console.log('User confirmed update');

            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                pickupDateTime,
                returnDateTime,
                pickupLocation: reservation.pickupLocation,
                returnLocation: reservation.returnLocation,
                totalPrice,
                comments : newcomments,
                name: newName,
                driverlicense: reservation.driverlicense,
                id : reservation._id
                }),
                headers: {
                'Content-Type': 'application/json',
                },
            });

            console.log('Response from server:', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Data received from server:', data);
                window.location.reload();
                alert('Information sent successfully!');
            } else {
                console.error('Error updating reservations:', response.statusText);
            }
        }
    };


  return (
    <div className="p-6 max-w-[700px] mx-auto bg-gray-50 dark:bg-gray-900 space-y-8">
        {!editMode ? (
            <>
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
                            <p className="text-gray-800 dark:text-white"><span className="font-semibold">Renter Name:</span> {reservation.name}</p>
                            <p className="text-gray-800 dark:text-white"><span className="font-semibold">Email:</span> {user.email}</p>
                            <p className="text-gray-800 dark:text-white"><span className="font-semibold">Phone Number:</span> {user.phone}</p>
                        </div>
                        <p className="mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Comments:</span> { reservation.comments ? reservation.comments : "No comments"}</p>
                    </div>
                </div>
                <div className="space-x-4 flex justify-between">
                    <Button onClick={toggleEditMode}>Edit</Button>
                    <Button onClick={() => router.back()} variant={"secondary"}>Back</Button>
                </div>
            </>
        
        ) : (
            <>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Edit Reservation Detail</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div>
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
                                </div>
                                <p className="mb-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 border-gray-300"><span className="font-semibold">Comments:</span> { reservation.comments ? reservation.comments : "No comments"}</p>
                            </div>
                            <div className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2">
                                <p><span className="font-semibold">Old Total Price:</span> ${reservation.totalPrice}</p>
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="grid grid-rows-2 gap-4">
                                    <div>
                                        <label htmlFor="pickupDate" className="font-semibold">Pick Up Date:</label>
                                        <input
                                            id="pickupDate"
                                            type="date"
                                            name="pickupDate"
                                            value={newpickupDate}
                                            min={today}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            className="ml-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pickupTime" className="font-semibold">Pick Up Time:</label>
                                        <input
                                            id="pickupTime"
                                            type="time"
                                            name="pickupTime"
                                            value={newpickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                            className="ml-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-rows-2 gap-4">
                                    <div>
                                        <label htmlFor="returnDate" className="font-semibold">Return Date:</label>
                                        <input
                                            id="returnDate"
                                            type="date"
                                            name="returnDate"
                                            value={newreturnDate}
                                            min={newpickupDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                            className="ml-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                    <div >
                                        <label htmlFor="returnTime" className="font-semibold">Return Time:</label>
                                        <input
                                            id="returnTime"
                                            type="time"
                                            name="returnTime"
                                            value={newreturnTime}
                                            onChange={(e) => setReturnTime(e.target.value)}
                                            className="ml-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                </div>
                                
                            </div>

                            <div className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2 mb-2">
                                <div className="grid grid-cols-3 gap-4 mb-2">
                                    <label htmlFor="firstName" className="font-semibold">Renter Name:</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={newName}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="First Name"
                                        className=" dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                                {/*<div className="grid grid-cols-3 gap-4 mb-2">
                                    <label htmlFor="email" className="font-semibold">Email:</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={newemail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-2">
                                    <label htmlFor="phone" className="font-semibold">Phone:</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={newphone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone"
                                        className="dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                    />
                                </div>*/}
                                <div className="grid grid-cols-3 gap-4 mb-2">
                                    <label htmlFor="comments" className="font-semibold">Comments:</label>
                                    <textarea
                                        id="comments"
                                        type="text"
                                        name="comments"
                                        value={newcomments}
                                        onChange={(e) => setComments(e.target.value)}
                                        placeholder="Comments"
                                        className="dark:bg-gray-800 p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-b-2">
                                <p><span className="font-semibold">New Total Price:</span> ${totalPrice}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="space-x-4 flex justify-between">
                        <Button type="submit">Save</Button>
                        <Button onClick={toggleEditMode} variant={"secondary"}>Cancel</Button>
                    </div>
                </form>
            </>
                
        )}

    </div>
  );
}


