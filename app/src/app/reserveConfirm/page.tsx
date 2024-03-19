// ConfirmationPage.tsx
import "@/styles/global.css";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { IVehicle } from '@/models/Vehicle';

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const { startTime,
    startDate,
    endTime,
    endDate,
    firstName,
    lastName,
    email,
    contactNumber,
    address,
    formattedVehicleId,
  } = router.query;

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSuccessPopup = () => {
    console.log('handleSuccessPopup called');
    setShowSuccessPopup(true);
  };

  const handleNavigateBack = () => {
    setShowSuccessPopup(false);

    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          startTime,
          startDate,
          endTime,
          endDate,
          firstName,
          lastName,
          email,
          contactNumber,
          address,
          formattedVehicleId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      handleSuccessPopup();

    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  const [vehicleDetails, setVehicleDetails] = useState<IVehicle | null>(null);

  const fetchVehicleDetails = async () => {
    try {
      if (!formattedVehicleId) {
        console.error('Vehicle ID is undefined.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles/${formattedVehicleId}`, {
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
    if (formattedVehicleId) {
      fetchVehicleDetails();
    }
  }, [formattedVehicleId]);

  return (
    <main>
      <Navbar />
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-4xl font-bold mb-4">Reservation Confirmation</h1>
        {/* Display reservation details */}
      <div className="grid grid-cols-3">

     
        <div className='p-10 mt-5 border-2 border-black rounded-xl'>
          <p><b>Start Time:</b> {startTime}</p>
          <p><b>Start Date:</b> {startDate}</p>
          <p><b>End Time:</b> {endTime}</p>
          <p><b>End Date:</b> {endDate}</p>
          {/* Display user details */}
          <p><b>First Name:</b> {firstName}</p>
          <p><b>Last Name:</b> {lastName}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>Contact Number:</b> {contactNumber}</p>
          <p><b>Address:</b> {address}</p>
        </div>
      
      <div className='px-10 pb-10 mt-5 mx-10 border-2 border-black rounded-xl col-span-2'>
        <h1 className='font-semibold'> Reserve Car Detail</h1>
        {vehicleDetails && (
          <>
            <img src={vehicleDetails.imageUrl} className='w-fit my-3 rounded-sm' alt='Car' />
            <div className='border-1 rounded-sm bg-slate-200 p-3'>
              <p className='text-xl font-semibold'>{vehicleDetails.brand} {vehicleDetails.vehicleModel}</p>
              <p className=' mt-3'>
              <b>Type:</b> {vehicleDetails.automatic ? 'Automatic' : 'Manual'}
              </p>
              <p className=''><b>No. of seats:</b> {vehicleDetails.nPeople}</p>
              <p className=''><b>Fuel Type:</b> {vehicleDetails.fuelType}</p>
              <p className=''>
              <b>Engine Capacity:</b> {vehicleDetails.engineCapacity} cc
              </p>
              <p className=''><b>Year:</b> {vehicleDetails.year}</p>
              <p className='mt-4 text-lg font-semibold'>Rental Price: ${vehicleDetails.rentalPrice}/day</p>
            </div>
          </>
        )} 
        </div>
        </div>
      </div>
      <Button
        className="w-1/2 mt-5 flex items-center justify-center text-center"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
      <Footer />
      {showSuccessPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-4 rounded-md'>
            <p className='text-xl font-semibold mb-4'>Reservation Successful</p>
            <p className='mb-4'>Your reservation has been successfully submitted.</p>
            <div className='flex justify-end'>
              <Button onClick={handleNavigateBack}>Ok</Button>
            </div>
          </div>
        </div>
        )}
    </main>
  );
};

export default ConfirmationPage;
