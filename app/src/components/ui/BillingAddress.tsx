"use client"
import React, { useState, ChangeEvent } from 'react';

interface BillingAddressProps {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onContactNumberChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

const BillingAddress: React.FC<BillingAddressProps> = ({
  firstName,
  lastName,
  email,
  contactNumber,
  address,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onContactNumberChange,
  onAddressChange,
  }) => {

  return (
    <form className='px-10  pb-10 border-2 border-black rounded-xl my-5'>
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
              onChange={(e) => onFirstNameChange(e.target.value)}
            />
          </div>
          <div>
            <p className=''>Last Name</p>
            <input
              type="text"
              placeholder="Last name"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
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
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </div>
          <div>
            <p className=''>Contact Number</p>
            <input
              type="tel"
              placeholder="Contact Number"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={contactNumber}
              onChange={(e) => onContactNumberChange(e.target.value)}
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
            onChange={(e) => onAddressChange(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default BillingAddress;
