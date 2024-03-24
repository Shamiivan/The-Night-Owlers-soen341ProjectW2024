import "@/styles/global.css";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { SessionProvider } from "next-auth/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Resend } from 'resend';
import { handleNumbersOnly, getCardType } from '../utils/creditCardUtils';

export default function ConfirmPage({ session }) {
  
  const router = useRouter();
  const [cardname, setName] = useState('');
  const [cardnumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [security, setSecurity] = useState('');
  const [errors, setErrors] = useState({});

  const { name, email, userId, vehicleId, imgUrl, brand, model, year, nPeople, color, fuelType, rentalPrice, pickupDate, pickupTime, returnDate, returnTime, pickupLocation, returnLocation, comments, driverlicense, creditcard } = router.query;

  const pickupTimestamp = Date.parse(`${pickupDate}T00:00`);
  const returnTimestamp = Date.parse(`${returnDate}T00:00`);
  const rentalDays = Math.ceil((returnTimestamp - pickupTimestamp) / (1000 * 60 * 60 * 24) + 1 );
//  const pickupTimestamp = Date.parse(`${pickupDate}T${pickupTime}`);
//  const returnTimestamp = Date.parse(`${returnDate}T${returnTime}`);
//  const rentalDays = Math.round(((returnTimestamp - pickupTimestamp) / (1000 * 60 * 60 * 24)) + 0.5);

  const totalPrice = rentalDays * rentalPrice;

  const resend = new Resend('re_jGSGuC7f_J9rrQz7mo3wP7AS4MqUuWtkV');

  const handleCardExpiry = ( e ) => {
    let expiryDate = e.target.value;

    if (e.keyCode !== 8) {
      if (expiryDate > 1 && expiryDate.length === 1) {
        expiryDate = '0' + expiryDate + '/';
      } else if (expiryDate.length === 2) {
        expiryDate = expiryDate + '/';
      }

      setExpiry(expiryDate);
    } else {
      setExpiry('');
    }
  }

  const validateDriverLicense = (value) => {
    const regex = /^[A-Z][0-9]{12}$/;
    const isValid = regex.test(value);
    setDriverlicense(isValid ? value : '');
    setDriverLicenseError(!isValid);
  }

  // Input fields validation handler
  const handleValidation = () => {
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors['name'] = 'Cardholder name is required';
    } else {
      errors['name'] = '';
    }

    if (!cardnumber) {
      formIsValid = false;
      errors['cardnumber'] = 'Card number is required';
    } else {
      errors['cardnumber'] = '';
    }

    if (!expiry) {
      formIsValid = false;
      errors['expiry'] = 'Expiry is required';
    } else {
      errors['expiry'] = '';
    }

    if (!security) {
      formIsValid = false;
      errors['security'] = 'CVV is required';
    } else {
      errors['security'] = '';
    }

    return formIsValid;
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm(`Are you sure you want to submit the reservation?`);
    if (!confirmation) return;

    if (!handleValidation()) {
      console.log('Form validation failed');
      return;
    }

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
          name,
          driverlicense,
          status: 'reserved',
          totalPrice,
          creditcard: cardnumber,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

       

      } else{
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      console.error(error);
      window.alert('Failed to create reservation');
    }

    router.push('/');
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
              <p className="text-lg font-medium">Comments:</p>
              <p>{comments? comments : "None"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 bg-white p-6 rounded-xl">
            <p className="text-lg font-medium">Total Price:</p>
            <p>$ {totalPrice.toFixed(2)}</p>
            </div> 
          </div>
          
        </div>
        <div className="w-full bg-slate-200 flex justify-center rounded-xl pb-10">
            <div>
            <h3 className=" flex justify-center text-2xl font-semibold">Pay with Credit Card</h3>
              <div>
              <ul className="flex justify-center my-6">
                <li className="mx-5">
                  <Image
                    src="/amex.png"
                    alt="Amex"
                    width={50}
                    height={50}
                  />
                </li>
                <li className="mx-5">
                  <Image
                    src="/jcb.png"
                    alt="JCB"
                    width={50}
                    height={50}
                  />
                </li>
                <li className="mx-5">
                  <Image
                    src="/mastercard.png"
                    alt="MasterCard"
                    width={50}
                    height={50}
                  />
                </li>
                <li className="mx-5">
                  <Image
                    src="/visa.png"
                    alt="VISA"
                    width={50}
                    height={50}
                  />
                </li>
              </ul>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardholderName" className="block">Cardholder name</label>
                    <input
                      id="cardholderName"
                      placeholder="Name of cardholder"
                      type="text"
                      value={cardname}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                      className=' bg-slate-100 p-1 rounded-md'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block">Card Number</label>
                    <input
                      id="cardNumber"
                      placeholder="Number of card"
                      type="Card Number"
                      maxLength="16"
                      value={cardnumber}
                      onKeyDown={handleNumbersOnly}
                      onChange={(e) => setCardNumber(e.target.value)}
                      error={errors.number}
                      className='bg-slate-100 p-1 rounded-md'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardExpiry" className="block">Expiry Date</label>
                      <input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={expiry}
                        onKeyDown={handleNumbersOnly}
                        onKeyUp={handleCardExpiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        error={errors.expiry}
                        className='bg-slate-100 p-1 rounded-md w-24'
                        required
                      />
                  </div>
                  <div className="col-6">
                    <label htmlFor="cardCvv" className="block">CVV</label>
                    <input
                      id="cardCvv"
                      placeholder="123"
                      maxLength="4"
                      value={security}
                      onKeyDown={handleNumbersOnly}
                      onChange={(e) => setSecurity(e.target.value)}
                      className='bg-slate-100 p-1 rounded-md w-24'
                      required
                    />
                  </div>
                </div>
              </div>
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
      
      <Footer />
    </SessionProvider>
  );
}

