import "@/styles/global.css";
import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { SessionProvider } from "next-auth/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function ConfirmPage({ session }) {
  const router = useRouter();
  const user = session?.user;

  const { userId, vehicleId, imgUrl, brand, model, year, nPeople, color, fuelType, rentalPrice, pickupDate, pickupTime, returnDate, returnTime, pickupLocation, returnLocation, comments, driverlicense, creditcard } = router.query;

  const pickupTimestamp = Date.parse(`${pickupDate}T00:00`);
  const returnTimestamp = Date.parse(`${returnDate}T00:00`);
  const rentalDays = Math.ceil((returnTimestamp - pickupTimestamp) / (1000 * 60 * 60 * 24) + 1 );
//  const pickupTimestamp = Date.parse(`${pickupDate}T${pickupTime}`);
//  const returnTimestamp = Date.parse(`${returnDate}T${returnTime}`);
//  const rentalDays = Math.round(((returnTimestamp - pickupTimestamp) / (1000 * 60 * 60 * 24)) + 0.5);

  const totalPrice = rentalDays * rentalPrice;


  const handlesubmit = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm(`Are you sure you want to submit the reservation?`);
    if (!confirmation) return;

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
        Driver's License: ${driverlicense}\n
        Total Price: $${totalPrice.toFixed(2)}`,

    };

    try {
      console.log('Confirm page: submitting reservation', {userId, vehicleId, pickupDate, pickupTime, returnDate, returnTime, pickupLocation, returnLocation, comments, driverlicense, totalPrice});

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
          totalPrice,
          creditcard
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
        window.alert('Reservation created successfully!');
        router.push('/');
      } else{
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error(error);
      window.alert('Failed to create reservation');
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
          <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-xl ">
            <div className="flex justify-center ">
              <Image src={imgUrl} alt="car" width={300} height={100} />
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold">{brand} {model}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Year:</p>
                  <p className="text-gray-500 dark:text-gray-400">{year}</p>
                </div>
                <div>
                  <p className="font-medium">Fuel Type:</p>
                  <p className="text-gray-500 dark:text-gray-400">{fuelType}</p>
                </div>
                <div>
                  <p className="font-medium">Color:</p>
                  <p className="text-gray-500 dark:text-gray-400">{color}</p>
                </div>
                <div>
                  <p className="font-medium">Number of People:</p>
                  <p className="text-gray-500 dark:text-gray-400">{nPeople} people</p>
                </div>
                <div>
                  <p className="font-medium">Rental Price Per Day:</p>
                  <p className="text-gray-500 dark:text-gray-400">${rentalPrice}</p>
                </div>
              </div>
            </div>
          </div>
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
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
              <p className="text-lg font-medium">Driver's License:</p>
              <p>{driverlicense}</p>
            </div>
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
              <p className="text-lg font-medium">Credit Card Number:</p>
              <p>{creditcard}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
            <p className="text-lg font-medium">Total Price:</p>
            <p>$ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
              <p className="text-lg font-medium">Comments:</p>
              <p>{comments}</p>
            </div>
          </div>
        <div className="flex justify-between">
          <form onSubmit={handlesubmit}>
            <Button type ="submit">
              Comfirm Reservation
            </Button>
          </form>
          <Link href={`/reservation/${vehicleId}`}>
            <Button variant="destructive">Cancel</Button>
          </Link>
        </div>
      </div>
      </div>
      
      <Footer />
    </SessionProvider>
  );
}

