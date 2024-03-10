"use client"

import "@/styles/global.css";
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const exampleReservation = {
  id: 'placeholder',
  location: 'Example Location',
  startDate: '2024-03-05',
  endDate: '2024-03-08',
  modelName: 'Example Model',
  seatCount: 4,
  fuelType: 'Petrol',
  driverName: 'John Doe',
  status: 'Checked In',
  img: 'car.jpg',
  name: 'Car Name',
  price: 99,
  description: 'This is a great car with excellent features for your next trip.',
  automatic: true,
  nPeople: 4,
  nBags: 2,
};

const ViewReservation: React.FC = () => {
  const router = useRouter();
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleCancelConfirmation = () => {
    // Perform cancellation logic (e.g., delete reservation in the database)
    console.log('Reservation cancelled. Perform deletion logic here.');

    // Access the reservation data for additional details
    const {
      img,
      name,
      price,
      description,
      automatic,
      nPeople,
      nBags,
    } = exampleReservation;

    // Include the reservation details in your cancellation logic
    console.log('Additional Reservation Details:', {
      img,
      name,
      price,
      description,
      automatic,
      nPeople,
      nBags,
    });

    // Close the cancel popup
    setShowCancelPopup(false);

    // Redirect to the ReservationList page
    router.push('/ReservationList');
  };

  const handleCancelCancel = () => {
    // Close the cancel popup without taking any action
    setShowCancelPopup(false);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='m-8 p-4 bg-blue-200 shadow-md rounded-md'>
        <div className='flex mb-4 p-4'>
          <div>
            <div className='bg-slate-200 rounded-lg p-2 pl-5 m-2'>
              <p className='font-medium'>Location:</p>
              <p>{exampleReservation.location}</p>
            </div>
            <div className='grid grid-cols-2'>
              <div className='bg-slate-200 rounded-lg py-2 px-4 m-2'>
                <p className='font-medium'>Start Date:</p>
                <p>{exampleReservation.startDate}</p>
              </div>
              <div className='bg-slate-200 rounded-lg py-2 px-4 m-2'>
                <p className='font-medium'>End Date:</p>
                <p>{exampleReservation.endDate}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
              <img src={exampleReservation.img} alt="Car Image" className="object-cover rounded-full" />
          </div>
          <div className=''>
            <p className='bg-slate-200 rounded-lg p-4 m-2 font-medium'>Status: {exampleReservation.status}</p>
          </div>
        </div>
        <div className='bg-slate-200 rounded-lg py-6 pl-10 m-2'>
          <p className="flex text-xl font-semibold mb-2 pb-2 justify-center">Car Information</p>
          <div className='grid grid-cols-2 ml-10'>
            <p className="">Model Name: {exampleReservation.modelName}</p>
            <p className="">Seat Count: {exampleReservation.seatCount}</p>
            <p className="">Fuel Type: {exampleReservation.fuelType}</p>
            <p className="">Driver Name: {exampleReservation.driverName}</p>
          </div>
        </div>
        <div className='flex justify-end m-2'>
          <Link href='/vehicles' className='mr-5'>
            <Button>Modify</Button>
          </Link>
          <Button className='bg-red-500 hover:bg-red-400' onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
        {/* Cancel Confirmation Popup */}
        {showCancelPopup && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-4 rounded-md'>
              <p className='text-xl font-semibold mb-4'>Confirm Cancellation</p>
              <p className='mb-4'>Are you sure you want to cancel this reservation?</p>
              <div className='flex justify-end'>
                <Button onClick={handleCancelConfirmation}>Yes</Button>
                <Button onClick={handleCancelCancel} className='ml-2 bg-red-500 hover:bg-red-400'>
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewReservation;