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
          onChange={(e) => {
            let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            input = input.slice(0, 16); // Limit to 16 digits
            if (input.length > 4) {
              input = input.match(/.{1,4}/g)!.join(' '); // Add a space after every 4 digits
            }
            setCardNumber(input);
          }}
          placeholder="0000 0000 0000 0000"
          className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-full"
        />
      </div>

      <div className="grid grid-cols-2 my-5">
        <div>
        <p className=''>Expiration Date (MM/YYYY)</p>
        <input
          type="text"
          placeholder="MM/YYYY"
          value={expirationDate}
          onChange={(e) => {
            let input = e.target.value.replace(/\D/g, '');
            input = input.slice(0, 6);
            if (input.length > 2) {
              input = input.slice(0, 2) + '/' + input.slice(2);
            }
            setExpirationDate(input);
          }}
      
          className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
          pattern="\d{2}/\d{4}"
        />
        </div>
        <div>
          <p className=''>CVC</p>
          <input
            type="text"
            placeholder="000"
            value={cvc}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              setCvc(numericValue);
            }}
            className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
            maxLength={3}
          />
        </div>
      </div>
    </form>
  );
};

export default Payment;
