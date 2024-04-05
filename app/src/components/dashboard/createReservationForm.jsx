'use client';
import React, { useState } from 'react';
import "@/styles/global.css";
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CreateReservationForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, address, phone }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        // Wait for a short time before redirecting to give the user time to see the success message
        setTimeout(() => {
          setShowSuccessPopup(false); // Close the success popup
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-10 my-6 bg-slate-200 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <div className="relative">
              <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-2 pr-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
              >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
          </div>
      </div>
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create User
        </Button>
      </form>
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-green-600">User created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReservationForm;
