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

    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${reservation.id}/checkout`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: reservation.userId,
                    name: fullname,  // Use fullname directly if you don't need to verify changes
                    phone,
                    checkoutDate,
                    dropOffTime,
                    mileage,
                    fuel,
                    returnLocation,
                    anyDamage,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Here you might want to redirect to a confirmation page
                router.push(`/admin/reservations/${reservation.id}`);
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
            <div className="mt-10 flex justify-between">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
                Check Out
              </Button>
              <Link href='/admin/reservations'>
                {/* The Button component here should either use an 'a' tag or you pass the Link functionality to it */}
                <a className="bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-2">Back</a>
              </Link>
            </div>
          </form>
        </div>
      );
}