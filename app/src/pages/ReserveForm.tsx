"use client"

import "@/styles/global.css";
import React, { useState, ChangeEvent } from 'react';
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { useRouter } from 'next/router';
import ReserveDetail from '@/components/ui/ReserveDetail'
import { Button } from '@/components/ui/button';

const ReserveForm: React.FC = () => {
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    img,
    name,
    price,
    description,
    automatic,
    nPeople,
    nBags,
  } = router.query || {};

  const imgValue = img ? (Array.isArray(img) ? img[0] : img) : '';
  const nameValue = name ? (Array.isArray(name) ? name[0] : name) : '';
  const priceValue = price ? (Array.isArray(price) ? parseFloat(price[0]) : parseFloat(price)) : 0;
  const descriptionValue = description ? (Array.isArray(description) ? description[0] : description) : '';
  const automaticValue = automatic ? (Array.isArray(automatic) ? automatic[0] === 'true' : automatic === 'true') : false;
  const nPeopleValue = nPeople ? (Array.isArray(nPeople) ? parseInt(nPeople[0], 10) : parseInt(nPeople, 10)) : 0;
  const nBagsValue = nBags ? (Array.isArray(nBags) ? parseInt(nBags[0], 10) : parseInt(nBags, 10)) : 0;

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
          img,
          name,
          price,
          description,
          automatic,
          nPeople,
          nBags,
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

  return (
    <main>
        <Navbar/>

        <div className=' mt-6 grid grid-cols-12 items-center'>
          <p className='text-4xl font-semibold col-start-2 col-span-4'>Car Reservation</p>
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
                  <label htmlFor="firstName" className='block'>First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lirstName" className='block'>Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 mb-5">
                <div>
                  <label htmlFor="email" className='block'>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contactNumber" className='block'>Contact Number</label>
                  <input
                    id="contactNumber"
                    type="tel"
                    placeholder="Contact Number"
                    className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className='block'>Address</label>
                <input
                  id="address"
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
            Make a Reservation
          </Button>
          </div>
          <div className='mr-10'>
            <ReserveDetail
              img={imgValue}
              name={nameValue}
              price={priceValue}
              description={descriptionValue}
              automatic={automaticValue}
              nPeople={nPeopleValue}
              nBags={nBagsValue}
              isModify={false}
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
              <Button onClick={handleNavigateBack}>Ok</Button>
            </div>
          </div>
        </div>
        )}
    </main>
  )
}

export default ReserveForm