'use client'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default  function CheckIn({params}){
    console.log(params.reservationId);
    const id  = params.reservationId;

    const [name, setName] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [damageReported, setDamageReported] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !pickupTime || !pickupDate || !driverLicense || !creditCard) {
            alert('Please fill out all required fields.');
            return;
        }

        const formData = {
            name,
            pickupTime,
            pickupDate,
            driverLicense,
            creditCard,
            damageReported
        };
        // Pass the form data as query parameters
        router.push(`/rentalagreement/${id}`);
    };

    return (
        <div>
            <div className="m-10 py-10 px-10 flex flex-col border-2 rounded-lg bg-slate-200 shadow-md">
                <div className="flex justify-between mb-6">
                    <p className="text-2xl font-semibold mb-4">Check-In Form</p>
                    <p className="text-md font-semibold mb-4 border-2 bg-white px-2 rounded-xl shadow-md">Reservation ID: {id}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col ">
                                <label className="mb-2 font-semibold">Pick Up Time:</label>
                                <input
                                    type="time"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                    required
                                />
                            </div>
                            <div className="flex flex-col ">
                                <label className="mb-2 font-semibold">Pick Up Date:</label>
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-between mb-6 gap-8">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-semibold">Driver's License:</label>
                            <input
                                type="text"
                                value={driverLicense}
                                onChange={(e) => setDriverLicense(e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-2 font-semibold">Credit Card:</label>
                            <input
                                type="text"
                                value={creditCard}
                                onChange={(e) => setCreditCard(e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">
                        Damage Reported:
                        <input
                            type="checkbox"
                            checked={damageReported}
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
