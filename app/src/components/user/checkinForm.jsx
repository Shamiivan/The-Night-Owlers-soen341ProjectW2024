'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";


export default function CheckinForm({ user, vehicle, reservation }) {

    const [checkname, setCheckname] = useState('');
    const [checkdriverlicense, setCheckdriverlicense] = useState('');
    const [checkcreditcard, setCheckcreditcard] = useState('');
    const [newdamageReported, setNewdamageReported] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!checkname || !checkdriverlicense || !checkcreditCard) {
            alert('Please fill out all required fields.');
            return;
        }

        if (checkname !== reservation.name) {
            alert("Driver's name does not match the reservation data. Please verify.");
            return;
        }

        if (checkdriverlicense !== reservation.driverlicense ) {
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
                    driverlicense: checkdriverlicense,
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
                            <label htmlFor="checkname" className="mb-2 font-semibold">Name:</label>
                            <input
                                id="checkname"
                                type="text"
                                value={checkname}
                                onChange={(e) => setCheckname(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkdriverlicense" className="mb-2 font-semibold">Driver's License:</label>
                            <input
                                id="checkdriverlicense"
                                type="text"
                                value={checkdriverlicense}
                                onChange={(e) => setCheckdriverlicense(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="checkcreditCard" className="mb-2 font-semibold">Credit Card:</label>
                            <input
                                id="checkcreditCard"
                                type="text"
                                value={checkcreditcard}
                                onChange={(e) => setCheckcreditcard(e.target.value)}
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
                                onChange={(e) => setNewdamageReported(e.target.checked)}
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

