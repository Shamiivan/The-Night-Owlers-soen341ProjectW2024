'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


export default function CheckinForm({ user, vehicle, reservation }) {

    const [checkname, setName] = useState('');
    const [checkdriverLicense, setDriverLicense] = useState('');
    const [checkcreditCard, setCreditCard] = useState('');
    const [newdamageReported, setDamageReported] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!checkname || !checkdriverLicense || !checkcreditCard) {
            alert('Please fill out all required fields.');
            return;
        }

        if (checkname !== reservation.name) {
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
            console.log('Sending PUT request to', `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id}`);


            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userId: reservation.userId,
                    vehicleId: reservation.vehicleId,
                    totalPrice: reservation.totalPrice,
                    comments: reservation.comments,
                    status: reservation.status,
                    name: checkname,
                    driverlicense: checkdriverLicense,
                    creditcard: checkcreditCard,
                    damageReported: newdamageReported,
                    id: reservation._id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('PUT request failed:', await response.text());
                throw new Error('Failed to check in');
            }

            console.log('Check-in successful, redirecting to rental agreement');
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
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-1/2">
                        <div className="flex flex-col">
                            <label htmlFor="checkfirstname" className="mb-2 font-semibold">Name:</label>
                            <input
                                id="checkname"
                                type="text"
                                value={checkname}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkdriverLicense" className="mb-2 font-semibold">Driver's License:</label>
                            <input
                                id="checkdriverLicense"
                                type="text"
                                value={checkdriverLicense}
                                onChange={(e) => setDriverLicense(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkcreditCard" className="mb-2 font-semibold">Credit Card:</label>
                            <input
                                id="checkcreditCard"
                                type="text"
                                value={checkcreditCard}
                                onChange={(e) => setCreditCard(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex mb-4">
                            <label htmlFor="newdamageReported" className="font-semibold">Damage Reported:</label>
                            <input
                                id="newdamageReported"
                                type="checkbox"
                                checked={newdamageReported}
                                onChange={(e) => setDamageReported(e.target.checked)}
                                className="ml-2"
                            />
                            <p>{newdamageReported ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="mt-10 flex justify-between">
                            <Button type="submit">Check In</Button>
                            <Link href={`/viewreserve/${reservation.userId}`}>
                                <Button className="bg-red-500 hover:bg-red-400">Back</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

