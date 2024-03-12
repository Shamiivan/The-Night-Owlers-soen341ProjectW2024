"use client"

import "@/styles/global.css";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import ReserveDetail from '@/components/ui/ReserveDetail';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const ModifyReservationPage: React.FC = () => {
  const router = useRouter();
  const allQueryParams = router.query;

  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const { vehicleId, isModify, RvehicleId } = router.query || {};
  const formattedVehicleId = typeof vehicleId === 'string' ? vehicleId : undefined;
  const RformattedVehicleId = typeof RvehicleId === 'string' ? RvehicleId : undefined;
  

  const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;

  const [validationErrors, setValidationErrors] = useState({
    startTime: '',
    startDate: '',
    endTime: '',
    endDate: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  const handleValidation = () => {
    let isValid = true;
    const currentDate = new Date();
    const pickUpDate = new Date(`${startDate}T${startTime}`);
    const dropOffDate = new Date(`${endDate}T${endTime}`);
    const contactNumberDigits = contactNumber.replace(/\D/g, '');

    const errors: any = {};

    const contactNumberRegex = /^\d+$/;
    if (!contactNumber.trim() || !contactNumberRegex.test(contactNumber.trim())) {
      errors.contactNumber = 'Please enter a valid contact number';
      isValid = false;
    }

    // Validate pick-up date
    if (!startDate.trim() ) {
      errors.startDate = 'Pick-up date are required';
      isValid = false;
    } else if (pickUpDate < currentDate|| startDate.trim() === currentDate.toISOString().split('T')[0]) {
      errors.startDate = 'Pick-up date should be after today';
      isValid = false;
    }

    // Validate pick-up time
    if (!startTime.trim() ) {
      errors.startTime = 'Pick-up time are required';
      isValid = false;
    }

    // Validate drop-off date
    if (!endDate.trim()) {
      errors.endDate = 'Drop-off date are required';
      isValid = false;
    } else if (dropOffDate < pickUpDate) {
      errors.endDate = 'Drop-off date cannot be before pick-up date';
      isValid = false;
    }

    // Validate drop-off time
    if (!endTime.trim()) {
      errors.endTime = 'Drop-off time are required';
      isValid = false;
    } else  if (startDate.trim() === endDate.trim() && startTime >= endTime) {
      errors.endTime = 'End time should be after start time on the same day';
      isValid = false;
    }

    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Invalid Email format';
      isValid = false;
    }

     // Validate contact number
    if (!contactNumber.trim() ) {
      errors.contactNumber = 'Contact Number is required';
      isValid = false;
    } else if (contactNumberDigits.length !== 10) {
      errors.contactNumber = 'Invalid Contact Number';
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    router.push({
      pathname: '/ReserveConfirm',
      query: {
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
      },
    });
  };


  return (
    <main>
      <Navbar />
      <div className=' mt-6 grid grid-cols-12 items-center mx-10'>
          <p className='text-4xl font-semibold col-span-4'>Modify Reservation</p>
          <div className='col-start-5 col-span-2 border-2 border-black rounded-lg ml-3'>
            <label htmlFor="startTime"className='pl-4 pt-1 text-lg font-medium'>Pick-up time</label>
            <input
              id="startTime"
              type='time'
              placeholder='Start Time'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`p-2 w-full bg-slate-200 ${validationErrors.startTime && 'border-red-500'}`}
            />
            {validationErrors.startTime && (
              <p className='text-red-500 font-semibold  ml-2'>{validationErrors.startTime}</p>
            )}
          </div>
          <div className='col-start-7 col-span-2 border-2 border-black rounded-lg ml-3'>
            <label htmlFor="startDate" className='pl-4 pt-1 text-lg font-medium'>Pick-up date</label>
            <input
              id="startDate"
              type='date'
              placeholder='Start Date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`p-2 w-full bg-slate-200 ${validationErrors.startDate && 'border-red-500'}`}
            />
            {validationErrors.startDate && (
              <p className='text-red-500 font-semibold ml-2'>{validationErrors.startDate}</p>
            )}
          </div>

          <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
            <label htmlFor="endTime" className='pl-4 pt-1 text-lg font-medium'>Drop-off time</label>
            <input
              id="endTime"
              type='time'
              placeholder='End Time'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={`p-2 w-full bg-slate-200 ${validationErrors.endDate && 'border-red-500'}`}
            />
            {validationErrors.endTime && (
              <p className='text-red-500 font-semibold ml-2'>{validationErrors.endTime}</p>
            )}
          </div>
          <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
            <label htmlFor="endDate" className='pl-4 pt-1 text-lg font-medium'>Drop-off date</label>
            <input
              id="endDate"
              type='date'
              placeholder='End Date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`p-2 w-full bg-slate-200 ${validationErrors.endDate && 'border-red-500'}`}
            />
            {validationErrors.endDate && (
              <p className='text-red-500 font-semibold ml-2'>{validationErrors.endDate}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='ml-10'>
            <ReserveDetail
              isModify={false}
              vehicleId = '65eab22de9452a4c005179c8'
            />
          </div>
          <div className='mr-10'>
            <ReserveDetail
              isModify={true}
              vehicleId = {formattedVehicleId!}
            />
        </div>
      </div>
      <div className="mx-10">
        <form className='px-10  pb-10 border-2 border-black rounded-xl my-5'>
            <h1 className='font-semibold'>Reservation Detail</h1>

            <div className="grid-rows-5 gap-4">
              <div className="grid grid-cols-2 my-5">
                <div>
                  <label htmlFor="firstName" className='block'>First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className={`w-11/12 border-2 border-black rounded-full p-1 pl-3 bg-gray-300 ${validationErrors.firstName && 'border-red-500'}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {validationErrors.firstName && (
                    <p className='text-red-500 font-semibold'>{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className='block'>Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className={`w-11/12 border-2 border-black rounded-full p-1 pl-3 bg-gray-300 ${validationErrors.lastName && 'border-red-500'}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {validationErrors.lastName && (
                    <p className='text-red-500 font-semibold'>{validationErrors.lastName}</p>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-2 mb-5'>
                <div>
                  <label htmlFor="email" className='block'>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`w-11/12 border-2 border-black rounded-full p-1 pl-3 bg-gray-300 ${validationErrors.email && 'border-red-500'}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validationErrors.email && (
                    <p className='text-red-500 font-semibold'>{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contactNumber" className='block'>Contact Number</label>
                  <input
                    id="contactNumber"
                    type="tel"
                    placeholder="Contact Number"
                    className={`w-11/12 border-2 border-black rounded-full p-1 pl-3 bg-gray-300 ${validationErrors.contactNumber && 'border-red-500'}`}
                    value={contactNumber}
                    onChange={(e) => { setContactNumber(e.target.value) }}
                    maxLength={10}
                  />
                  {validationErrors.contactNumber && (
                    <p className='text-red-500 font-semibold'>{validationErrors.contactNumber}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="address" className='block'>Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className={`w-1/2   border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-50 ${validationErrors.address && 'border-red-500'}`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {validationErrors.address && (
                  <p className='text-red-500 font-semibold'>{validationErrors.address}</p>
                )}
              </div>
            </div>
          </form>
          <Button
            className="w-full mt-5"
            onClick={handleSubmit}
          >
            Modify
          </Button>
        </div>
        <Footer />

    </main>
  );
}

export default ModifyReservationPage;
