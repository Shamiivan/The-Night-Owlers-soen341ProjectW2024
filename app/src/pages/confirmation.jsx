import "@/styles/global.css";
import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { SessionProvider } from "next-auth/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ConfirmPage({ session }) {
  const router = useRouter();
  const user = session?.user;

  const { userId, vehicleId, pickupDate, pickupTime, returnDate, returnTime, pickupLocation, returnLocation, comments, driverlicense } = router.query;

  const handlesubmit = async (e) => {
    e.preventDefault();

    const emailContent = {
      to: 'recipient@example.com', // Change to the recipient's email address
      subject: 'Reservation Confirmation', // Email subject
      text: `Reservation details:\n
        Pickup Date: ${pickupDate}\n
        Pickup Time: ${pickupTime}\n
        Return Date: ${returnDate}\n
        Return Time: ${returnTime}\n
        Pickup Location: ${pickupLocation}\n
        Return Location: ${returnLocation}\n
        Comments: ${comments}\n
        Driver's License: ${driverlicense}`,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          vehicleId,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          pickupLocation,
          returnLocation,
          comments,
          driverlicense,
          status: 'reserved',
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    });

      if (response.ok) {
        const data = await response.json();
        router.push('/');
      } else{
        throw new Error('Failed to create reservation');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SessionProvider session={session}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Confirm Reservation</h1>
          <p className="text-gray-500 dark:text-gray-400">Please confirm your reservation information before submitting.</p>
        </div>

        <div className="space-y-4 bg-slate-200 p-6 rounded-xl ">
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2">
                <p className="flex justify-center text-lg font-medium">Pickup Date:</p>
                <p className="flex justify-center">{pickupDate}</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="flex justify-center text-lg font-medium">Pickup Time:</p>
                <p className="flex justify-center">{pickupTime}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2">
                <p className="flex justify-center text-lg font-medium">Return Date:</p>
                <p className="flex justify-center">{returnDate}</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="flex justify-center text-lg font-medium">Return Time:</p>
                <p className="flex justify-center">{returnTime}</p>
              </div>
            </div>
            
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl ">
              <p className="text-lg font-medium">Pickup Location:</p>
              <p>{pickupLocation}</p>
            </div>
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
              <p className="text-lg font-medium">Return Location:</p>
              <p>{returnLocation}</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <p>Driver's License:</p>
            <p>{driverlicense}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <form onSubmit={handlesubmit}>
            <Button type ="submit">
              Comfirm Reservation
            </Button>
          </form>
          <Link href="/">
            <Button variant="destructive">Cancel</Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </SessionProvider>
  );
}
