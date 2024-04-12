'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, {useState} from 'react';
import { useRouter } from "next/navigation";

export default function CheckoutForm({ user, vehicle, reservation }) {
    const [checkname, setName] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuel, setFuel] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [anyDamage, setAnyDamage] = useState(false);
    const router = useRouter();

    const isAdminPath = window.location.pathname.includes('/admin');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  userId: user.id,
                  vehicleId: vehicle.id,
                  pickupDateTime: reservation.pickupDateTime,
                  returnDateTime: reservation.returnDateTime,
                  pickupLocation: reservation.pickupLocation,
                  returnLocation: reservation.returnLocation,
                  comments: reservation.comments,
                  status: 'returned',
                  driverlicense: reservation.driverlicense,
                  creditcard: reservation.creditcard,
                  damageReported: reservation.damageReported,
                  id: reservation._id,     
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const isAdminPath = router.pathname.includes('/admin');
                if (isAdminPath) {
                  router.push(`/admin/reservations`);
                } else {
                  router.push(`/viewreserve/${reservation.userId}`);
                }
                alert('Checked out successfully');
            } else {
                const errorData = await response.json();
                alert('Failed to check out: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error checking out:', error);
            alert('Failed to check out. Please try again later.');
        }
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
                        {isAdminPath ? (
                          <Link href={`/admin/reservations`}>
                              <Button className="bg-red-500 hover:bg-red-400">Back</Button>
                          </Link>
                        ) : (
                          <Link href={`/viewreserve/${reservation.userId}`}>
                              <Button className="bg-red-500 hover:bg-red-400">Back</Button>
                          </Link>
                        )}
                    </div>
            </div>
          </form>
        </div>
    );
}

