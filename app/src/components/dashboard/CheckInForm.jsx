
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React, { useState } from 'react';


export function CheckInForm() {
    const [name, setName] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [damageReported, setDamageReported] = useState(false);

    return (
        <div>
            <div className="m-10 py-10 px-10 flex flex-col border-2 rounded-lg bg-slate-200 shadow-md">
            <p className="text-2xl font-semibold mb-4">Check-In Form</p>
                <div className="grid grid-cols-5 ">
                    <div className=" col-span-2 flex flex-col"> 
                        <label className="mb-2 font-semibold">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                        />
                    </div>
                    <div className="col-start-4 flex flex-col mr-2">
                        <label className="mb-2 font-semibold">Pick Up Time:</label>
                        <input
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                        />
                    </div>
                    <div className="flex flex-col ml-2">
                        <label className="mb-2 font-semibold">Pick Up Date:</label>
                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-5 justify-between mb-6">
                    <div className="col-span-2 flex flex-col w-full">
                        <label className="mb-2 font-semibold">Driver's License:</label>
                        <input
                            type="text"
                            value={driverLicense}
                            onChange={(e) => setDriverLicense(e.target.value)}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
                        />
                    </div>
                    <div className="col-span-2 col-start-4 flex flex-col w-full">
                        <label className="mb-2 font-semibold">Credit Card:</label>
                        <input
                            type="text"
                            value={creditCard}
                            onChange={(e) => setCreditCard(e.target.value)}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md shadow-md"
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
            </div>
            <div className="m-10 pb-5 flex flex-col items-center">
                <Link href={`/rentalagreement`}>
                    <Button>Check In</Button>
                </Link>
            </div>
        </div>
    );
}
