"use client"
import React, { useState, ChangeEvent } from 'react';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');


  return (
    <form className='px-10 pb-10 border-2 border-black rounded-xl'>
      <h1 className='font-semibold'>How to pay</h1>
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
          onChange={(e) => setCardNumber(e.target.value)}
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
    </form>
  );
};

export default Payment;
