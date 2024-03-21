'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";


export default function CheckinForm({ user, vehicle, reservation }) {

    const [checkname, setName] = useState('');
    const [newpickupTime, setPickupTime] = useState('');
    const [newpickupDate, setPickupDate] = useState('');
    const [checkdriverLicense, setDriverLicense] = useState('');
    const [checkcreditCard, setCreditCard] = useState('');
    const [newdamageReported, setDamageReported] = useState(false);
    const router = useRouter();
    const  fullname = `${user.firstName} ${user.lastName}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!checkname || !newpickupTime || !newpickupDate || !checkdriverLicense || !checkcreditCard) {
            alert('Please fill out all required fields.');
            return;
        }

        if (checkname !== fullname) {
            alert("Driver's name does not match the reservation data. Please verify.");
            return;
        }

        if (checkdriverLicense !== reservation.driverlicense ) {
            alert('Driver\'s license does not match the reservation data. Please verify.');
            return;
        }

        if (checkcreditCard !== reservation.creditcard) {
            alert('Credit card number does not match the reservation data. Please verify.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id }`, {
                method: 'PUT',
                body: JSON.stringify({
                    userId: reservation.userId,
                    vehicleId: reservation.vehicleId,
                    pickupDate: newpickupDate,
                    pickupTime: newpickupTime,
                    returnDate: reservation.returnDate,
                    returnTime: reservation.returnTime,
                    pickupLocation: reservation.pickupLocation,
                    returnLocation: reservation.returnLocation,
                    comments: reservation.comments,
                    status: reservation.status,
                    name: checkname,
                    driverlicense: checkdriverLicense,
                    creditcard: checkcreditCard,
                    damageReported: newdamageReported,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to check in');
            }
            router.push(`/rentalagreement/${reservation._id}`);
        } catch (error) {
            console.error('Error checking in:', error);
            alert('Failed to check in');
        }
    };

    return (
        <div>
            <div className="m-10 py-10 px-10 flex flex-col border-2 rounded-lg bg-slate-200 shadow-md">
                <div className="flex justify-between mb-6">
                    <p className="text-2xl font-semibold mb-4">Check-In Form</p>
                    <p className="text-md font-semibold mb-4 border-2 bg-white px-2 rounded-xl shadow-md">Reservation ID: {reservation._id}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="checkfirstname" className="mb-2 font-semibold">Name: {fullname}</label>
                            <input
                                id="checkname"
                                type="text"
                                value={checkname}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col ">
                                <label htmlFor="newpickupTime" className="mb-2 font-semibold">Pick Up Time:</label>
                                <input
                                    id="newpickupTime"
                                    type="time"
                                    value={newpickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                    required
                                />
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor="newpickupDate" className="mb-2 font-semibold">Pick Up Date:</label>
                                <input
                                    id="newpickupDate"
                                    type="date"
                                    value={newpickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-between mb-6 gap-8">
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkdriverLicense" className="mb-2 font-semibold">Driver's License: {reservation.driverlicense}</label>
                            <input
                                id="checkdriverLicense"
                                type="text"
                                value={checkdriverLicense}
                                onChange={(e) => setDriverLicense(e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkcreditCard" className="mb-2 font-semibold">Credit Card: {reservation.creditcard}</label>
                            <input
                                id="checkcreditCard"
                                type="text"
                                value={checkcreditCard}
                                onChange={(e) => setCreditCard(e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newdamageReported" className="font-semibold">
                        Damage Reported:
                        <input
                            id="newdamageReported"
                            type="checkbox"
                            checked={newdamageReported}
                            onChange={(e) => setDamageReported(e.target.checked)}
                            className="ml-2"
                        />
                        </label>
                    </div>
                    <div className="mt-10 flex justify-between">
                        <Button type="submit">Check In</Button>
                        <Link href='/admin/reservations'>
                          <Button className="bg-red-500 hover:bg-red-400">Back</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

