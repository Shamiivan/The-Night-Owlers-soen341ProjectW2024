'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ user, vehicle, reservation }) {
    const [checkname, setName] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [dropOffTime, setDropOffTime] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuel, setFuel] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [anyDamage, setAnyDamage] = useState(false);
    const router = useRouter();
    const fullname = `${user.firstName} ${user.lastName}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservation.id}/checkout`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             userId: reservation.userId,
        //             name: fullname,  // Use fullname directly if you don't need to verify changes
        //             phone,
        //             checkoutDate,
        //             dropOffTime,
        //             mileage,
        //             fuel,
        //             returnLocation,
        //             anyDamage,
        //         }),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });

    //         if (response.ok) {
    //             // Here you might want to redirect to a confirmation page
    //             router.push(`/admin/reservations/${reservation.id}`);
    //             alert('Checked out successfully');
    //         } else {
    //             const errorData = await response.json();
    //             alert('Failed to check out: ' + errorData.message);
    //         }
    //     } catch (error) {
    //         console.error('Error checking out:', error);
    //         alert('Failed to check out. Please try again later.');
    //     }
    };

    return (
        <div className="m-10 py-10 px-10 flex flex-col border-2 rounded-lg bg-slate-200 shadow-md">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-semibold mb-4">Check-Out Form</h2>
            <p className="text-md font-semibold mb-4 border-2 bg-white px-2 rounded-xl shadow-md">
              Reservation ID: {reservation._id}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg font-semibold">
                  Driver's Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={checkname}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-lg font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div> 
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="checkoutDate" className="text-lg font-semibold">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkoutDate"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dropOffTime" className="text-lg font-semibold">
                  Drop-Off Time
                </label>
                <input
                  type="time"
                  id="dropOffTime"
                  value={dropOffTime}
                  onChange={(e) => setDropOffTime(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="mileage" className="text-lg font-semibold">
                  Mileage
                </label>
                <input
                  type="text"
                  id="mileage"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fuel" className="text-lg font-semibold">
                  Fuel Level
                </label>
                <input
                  type="text"
                  id="fuel"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label htmlFor="returnLocation" className="text-lg font-semibold">
                  Return Location
                </label>
                <input
                  type="text"
                  id="returnLocation"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                        <label htmlFor="newdamageReported" className="font-semibold">
                        Damage Reported:
                        <input
                            id="newdamageReported"
                            type="checkbox"
                            checked={anyDamage}
                            onChange={(e) => setAnyDamage(e.target.checked)}
                            className="ml-2"
                        />
                        </label>
                    </div>
                    <div className="mt-10 flex justify-between">
                        <Button type="submit">Check Out</Button>
                        <Link href='/admin/reservations'>
                          <Button className="bg-red-500 hover:bg-red-400">Back</Button>
                        </Link>
                    </div>
            </div>
          </form>
        </div>
    );
}

