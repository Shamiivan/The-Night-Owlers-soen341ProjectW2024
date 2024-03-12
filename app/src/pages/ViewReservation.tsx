"use client"

import React from 'react';

import "@/styles/global.css";
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import { IVehicle } from '@/models/Vehicle';

const exampleReservation = {
  id: 'placeholder',
  location: 'Example Location',
  startDate: '2024-03-05',
  endDate: '2024-03-08',
  Name: 'John Doe',
  status: 'Checked In',
};

const ViewReservation: React.FC = () => {
  const router = useRouter();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<IVehicle | null>(null);

  const vehicleId = router.query.vehicleId
  const fetchVehicleDetails = async () => {
    try {
      if (!vehicleId) {
        console.error('Vehicle ID is undefined.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/${vehicleId}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vehicle details');
      }

      const data = await response.json();

      if (data.success) {
        setVehicleDetails(data.value);
      } else {
        console.error('Failed to fetch vehicle details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    }
  };

  useEffect(() => {
    // Call fetchVehicleDetails when the component mounts or when isModify or vehicleId changes
    if (vehicleId) {
      fetchVehicleDetails();
    }
  }, [vehicleId]);

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleModifyClick = () => {
    setShowModifyPopup(true);
  };

  const handleCancelConfirmation = () => {
    // Perform cancellation logic (e.g., delete reservation in the database)
    console.log('Reservation cancelled. Perform deletion logic here.');

    // Perform deletion logic here

    // Close the cancel popup
    setShowCancelPopup(false);

    // Redirect to the ReservationList page
    router.push({
      pathname: '/ReservationList',
    });
  };

  

  const handleModifyConfirmation = () => {
    // Perform modification logic here (e.g., update reservation details)
    console.log('Reservation modified. Perform modification logic here.');

    // Close the modify popup
    setShowModifyPopup(false);

    const queryObject: UrlObject['query'] = {
    modify: true,
    vehicleId: vehicleId
   };
    // Redirect to the Vehicles page with reservation details
    router.push({
      pathname: '/vehicles',
      query: queryObject
    });
  };

  const handleStop = () => {
    // Close the cancel popup without taking any action
    setShowCancelPopup(false);
    setShowModifyPopup(false);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <p className='text-4xl font-semibold m-10'>Reservation Detail</p>
      <div className='m-8 p-4 bg-blue-200 shadow-md rounded-md'>
        <div className='flex mb-4 p-4'>
          <div>
            {/*<div className='bg-slate-200 rounded-lg p-2 pl-5 m-2'>
              <p className='font-medium'>Location:</p>
              <p>{exampleReservation.location}</p>
            </div>*/}
            <div className='grid grid-cols-2'>
              <div className='bg-slate-200 rounded-lg border-2 border-slate-400 shadow-md py-2 px-4 m-2'>
                <p className='font-medium'>Start Date:</p>
                <p>{exampleReservation.startDate}</p>
              </div>
              <div className='bg-slate-200 rounded-lg border-2 border-slate-400 shadow-md py-2 px-4 m-2'>
                <p className='font-medium '>End Date:</p>
                <p>{exampleReservation.endDate}</p>
              </div>
            </div>
          </div>
          {vehicleDetails && (
            <div className="flex-1 flex justify-center items-center">
              <img src={vehicleDetails.imageUrl} alt="Car Image" className="object-cover rounded-full" />
            </div>
          )}

          {/*<div className=''>
            <p className='bg-slate-200 rounded-lg p-4 m-2 font-medium'>Status: {exampleReservation.status}</p>
          </div>*/}
        </div>
        <div className='bg-slate-100 rounded-lg border-2 border-slate-400 shadow-md py-6 pl-10 m-2'>
          <p className="flex text-3xl font-bold mb-2 pb-2 justify-center">Car Information</p>
          {vehicleDetails && (
          <div className='ml-10'>
            <p className='text-xl font-bold'>Name: {vehicleDetails.brand} {vehicleDetails.vehicleModel}</p>
            <div className='grid grid-cols-2 mt-3'>
              <p className=''>
              <b>Type:</b> {vehicleDetails.automatic ? 'Automatic' : 'Manual'}
              </p>
              <p className=''><b>No. of seats:</b> {vehicleDetails.nPeople}</p>
              <p className=''><b>Fuel Type:</b> {vehicleDetails.fuelType}</p>
              <p className=''>
              <b>Engine Capacity:</b> {vehicleDetails.engineCapacity} cc
              </p>
              <p className=''><b>Year:</b> {vehicleDetails.year}</p>
            </div>
            <p className='mt-4 p-2 text-lg font-bold bg-slate-200 w-fit rounded-lg border-2 border-slate-300 shadow-md'>Rental Price: ${vehicleDetails.rentalPrice}/day</p>
          </div>
          )}
        </div>
        <div className='flex justify-end m-2'>
          <Button className='mr-2' onClick={handleModifyClick} >Modify</Button>
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
                <Button onClick={handleStop} className='ml-2 bg-red-500 hover:bg-red-400'>
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Modification Popup */}
        {showModifyPopup && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-4 rounded-md'>
              <p className='text-xl font-semibold mb-4'>Confirm Modification</p>
              <p className='mb-4'>Are you sure you want to modify this reservation?</p>
              <div className='flex justify-end'>
                <Button onClick={handleModifyConfirmation}>Yes</Button>
                <Button onClick={handleStop} className='ml-2 bg-red-500 hover:bg-red-400'>
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