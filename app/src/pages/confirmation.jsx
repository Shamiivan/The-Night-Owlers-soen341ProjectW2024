import "@/styles/global.css";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { SessionProvider } from "next-auth/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { handleNumbersOnly} from '../utils/creditCardUtils';
import PropTypes from 'prop-types';

ConfirmPage.propTypes = {
  session: PropTypes.object.isRequired
};

export default function ConfirmPage({ session }) {
  
  const router = useRouter();
  const [cardname, setCardname] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [security, setSecurity] = useState('');
  const { name, email, userId, vehicleId, imgUrl, brand, model, year, nPeople, color, fuelType, rentalPrice, pickupDate, pickupTime, returnDate, returnTime, pickupLocation, returnLocation, comments, driverlicense } = router.query;

  const pickupTimestamp = Date.parse(`${pickupDate}T00:00`);
  const returnTimestamp = Date.parse(`${returnDate}T00:00`);
  const rentalDays = Math.ceil((returnTimestamp - pickupTimestamp) / (1000 * 60 * 60 * 24) + 1 );

  const totalPrice = rentalDays * rentalPrice;


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


  // Input fields validation handler
  const handleValidation = () => {
    let formIsValid = true;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    if (!name) {
      alert('Cardholder name is required');
      return;
    }

    if (!cardnumber) {
      alert('Card number is required');
      return;
    } else if (!isValidCardNumber(cardnumber)) {
      alert('Invalid card number');
      return;
    }

    if (!expiry) {
      alert('Expiry is required');
      return;
    } else {
      const [month, year] = expiry.split('/');
      const expiryYear = parseInt('20' + year);
      const expiryMonth = parseInt(month);
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        alert('Card has expired');
        return;
      }
    }

    if (!security) {
      alert('CVV is required');
      return;
    }

    return formIsValid;
  };
  
  // Function to validate card number
  const isValidCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const sendEmail = async () => {
    const data = {
      to: email,
      subject: 'Reservation Confirmation',
      body: `<div style="font-family: Arial, sans-serif; color: #333;">
            <p style="font-size: 16px;">Hello from The Night Owlers, ${name}.</p>
            <p style="font-size: 16px;">Here are the details of your reservation:</p>
            <ul style="font-size: 16px; list-style-type: none; padding: 0;">
              <li><strong>Vehicle:</strong> ${brand} ${model}</li>
              <li><strong>Pickup Date:</strong> ${pickupDate}</li>
              <li><strong>Pickup Time:</strong> ${pickupTime}</li>
              <li><strong>Return Date:</strong> ${returnDate}</li>
              <li><strong>Return Time:</strong> ${returnTime}</li>
              <li><strong>Pickup Location:</strong> ${pickupLocation}</li>
              <li><strong>Return Location:</strong> ${returnLocation}</li>
              <li><strong>Comments:</strong> ${comments}</li>
              <li><strong>Total Price:</strong> $${totalPrice}</li>
            </ul>
            <p style="font-size: 16px;">Thank you for using our service.</p>
            <p style="font-size: 16px;">The Night Owlers</p>
        </div>`,
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

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
        await sendEmail();
        router.push(`/success/${userId}`);
      } else{
        router.push('/failure');
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
              <p className="text-lg font-medium">Comments:</p>
              <p>{comments ?? "None"}</p>
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
                      onChange={(e) => setCardname(e.target.value)}
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
                      onChange={(e) => setCardnumber(e.target.value)}
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

