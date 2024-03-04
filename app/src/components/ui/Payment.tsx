"use client"
import React, { useState, ChangeEvent } from 'react';
import { Button } from './button';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cleanedInput = event.target.value.replace(/\D/g, '');
    const formattedInput = cleanedInput.replace(/(\d{4})(?=\d)/g, '$1 ');

    setCardNumber(formattedInput);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber,
          cardholderName,
          expirationDate,
          cvc,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      // Handle a successful response from the backend
      console.log('Payment processed successfully');
    } catch (error) {
      setErrorMessage('Error processing payment. Please try again.'); // Display a user-friendly error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className='px-10 pb-10 border-2 border-black rounded-xl'>
      <h1 className='font-semibold'>How to pay</h1>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className="my-5">
        <p className=''>Cardholder Name</p>
        <input
          type="text"
          placeholder="Full name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-full"
        />
      </div>
      <div>
        <p className=''>Card Number</p>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="0000 0000 0000 0000"
          className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-full"
        />
      </div>

      <div className="grid grid-cols-2 my-5">
        <div>
          <p className=''>Expiration Date</p>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
          />
        </div>
        <div>
          <p className=''>CVC</p>
          <input
            type="number"
            placeholder="000"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
            min={100}
            max={999}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Process Payment
      </Button>
    </form>
  );
};

export default Payment;
