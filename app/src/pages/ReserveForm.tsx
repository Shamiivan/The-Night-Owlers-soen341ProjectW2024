"use client"

import "@/styles/global.css";
import React, { useState, ChangeEvent } from 'react';
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { useRouter } from 'next/router';
import ReserveDetail from '@/components/ui/ReserveDetail'
import { Button } from '@/components/ui/button';

const ReserveForm: React.FC = () => {
  const reserveData = {
    startTime: '12.00 pm',
    startDate: '12-02-2024',
    endTime: '12.00 pm',
    endDate: '12-03-2024',
    img: 'car.jpg',
    name: 'Car Name',
    price: 99,
    description: 'This is a great car with excellent features for your next trip.',
    automatic: true,
    nPeople: 4,
    nBags: 2,
  };

  const router = useRouter();
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSuccessPopup = () => {
    setShowSuccessPopup(true);
  };

  const hideSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleNavigateBack = () => {
    hideSuccessPopup();
    // Use your preferred navigation method to go back to the main page
    // Example using Next.js router
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
          img: reserveData.img,
          name: reserveData.name,
          price: reserveData.price,
          description: reserveData.description,
          automatic: reserveData.automatic,
          nPeople: reserveData.nPeople,
          nBags: reserveData.nBags,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }
  
      console.log('Reservation submitted successfully');
      // Add any additional logic or redirection after successful submission
      handleSuccessPopup();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setErrorMessage('Error submitting reservation. Please try again.');
    }
  };

  return (
    <main>
        <Navbar/>

        <div className=' mt-6 grid grid-cols-12 items-center'>
          <p className='text-4xl font-semibold col-start-2 col-span-4'>Car Rental Form</p>
          <div className='col-start-7 col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>Pick-up time/date</p>
            <div className='bg-slate-200 flex justify-around font-medium'>
            <input
              type='time'
              placeholder='Start Time'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className='p-2 bg-slate-200'
            />
            <input
              type='date'
              placeholder='Start Date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='p-2 bg-slate-200'
            />
          </div>
        </div>
        <div></div>
        <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
          <p className='pl-4 pt-1 text-lg font-medium'>Drop-off time/date</p>
          <div className='bg-slate-200 flex justify-around font-medium'>
            <input
              type='time'
              placeholder='End Time'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className='p-2 bg-slate-200'
            />
            <input
              type='date'
              placeholder='End Date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='p-2 bg-slate-200'
            />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='ml-10'>
          <form className='px-10  pb-10 border-2 border-black rounded-xl my-5'>
            <h1 className='font-semibold'>Reservation Detail</h1>

            <div className="grid-rows-5 gap-4">
              <div className="grid grid-cols-2 my-5">
                <div>
                  <p className=''>First Name</p>
                  <input
                    type="text"
                    placeholder="First name"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <p className=''>Last Name</p>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 mb-5">
                <div>
                  <p className=''>Email</p>
                  <input
                    type="email"
                    placeholder="Email"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <p className=''>Contact Number</p>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <p className=''>Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-50"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </form>
          <Button
            className="w-full mt-5"
            onClick={handleSubmit}
          >
            Make Reservation
          </Button>
          </div>
          <div className='mr-10'>
            <ReserveDetail
              img={reserveData.img}
              name={reserveData.name}
              price={reserveData.price}
              description={reserveData.description}
              automatic={reserveData.automatic}
              nPeople={reserveData.nPeople}
            />
          </div>
        </div>

        <Footer/>
        {showSuccessPopup && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-4 rounded-md'>
              <p className='text-xl font-semibold mb-4'>Reservation Successful</p>
              <p className='mb-4'>Your reservation has been successfully submitted.</p>
              <div className='flex justify-end'>
                <Button onClick={handleNavigateBack}>OK</Button>
              </div>
            </div>
          </div>
        )}
    </main>
  )
}

export default ReserveForm