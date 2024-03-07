"use client"

import "@/styles/global.css";
import React, { useState, ChangeEvent } from 'react';
import Navbar from '../../components/ui/Navbar'
import Footer from '../../components/ui/Footer'
import BillingAddress from '@/components/ui/BillingAddress'
import Payment from '@/components/ui/Payment'
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes for DriverDetail
  const handleFirstNameChange = (value: string) => setFirstName(value);
  const handleLastNameChange = (value: string) => setLastName(value);
  const handleEmailChange = (value: string) => setEmail(value);
  const handleContactNumberChange = (value: string) => setContactNumber(value);
  const handleAddressChange = (value: string) => setAddress(value);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime: reserveData.startTime,
          startDate: reserveData.startDate,
          endTime: reserveData.endTime,
          endDate: reserveData.endDate,
          img: reserveData.img,
          name: reserveData.name,
          price: reserveData.price,
          description: reserveData.description,
          automatic: reserveData.automatic,
          nPeople: reserveData.nPeople,
          nBags: reserveData.nBags,
          firstName,
          lastName,
          email,
          contactNumber,
          address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      console.log('Reservation submitted successfully');
      // Add any additional logic or redirection after successful submission
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
            <p className='pl-4 pt-1 text-lg font-medium'>Start</p>
            <div className='bg-slate-200 flex justify-around font-medium'>
              <p className='p-2'>{reserveData.startTime}</p>
              <p className='p-2'>{reserveData.startDate}</p>
            </div>
          </div>
          <div></div>
          <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>End</p>
            <div className='bg-slate-200 flex justify-around font-medium'>
              <p className='p-2'>{reserveData.endTime}</p>
              <p className='p-2'>{reserveData.endDate}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='ml-10'>
          <BillingAddress
            firstName={firstName}
            lastName={lastName}
            email={email}
            contactNumber={contactNumber}
            address={address}
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange}
            onEmailChange={handleEmailChange}
            onContactNumberChange={handleContactNumberChange}
            onAddressChange={handleAddressChange}
          />
         <Payment/>
          <Button
            className="w-full mt-5"
            onClick={handleSubmit}
          >
            Process Payment
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
    </main>
  )
}

export default ReserveForm