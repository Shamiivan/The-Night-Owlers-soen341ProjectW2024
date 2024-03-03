"use client"
import React, { useState, ChangeEvent } from 'react';

const BillingAddress = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContactNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContactNumber(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div className='px-10  pb-10 border-2 border-black rounded-xl my-5'>
      <h1 className='font-semibold'>Billing Address</h1>

      <div className="grid-rows-5 gap-4">
        <div className="grid grid-cols-2 my-5">
          <div>
            <p className=''>First Name</p>
            <input
              type="text"
              placeholder="First name"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <p className=''>Last Name</p>
            <input
              type="text"
              placeholder="Last name"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={lastName}
              onChange={handleLastNameChange}
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
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <p className=''>Contact Number</p>
            <input
              type="tel"
              placeholder="Contact Number"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={contactNumber}
              onChange={handleContactNumberChange}
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
            onChange={handleAddressChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingAddress;
