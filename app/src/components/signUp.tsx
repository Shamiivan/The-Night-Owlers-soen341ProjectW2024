"use client"
import React, { useState } from 'react';
import "@/styles/global.css";
import Navbar from "./ui/Navbar";

const CreateUserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/customer', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="flex flex-col">

      <div className="flex">
        <div className="w-1/2 bg-gradient-to-br from-gray-200 to-blue-200 shadow-md rounded px-8 py-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 p-2 w-full rounded border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 p-2 w-full rounded border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full rounded border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full rounded border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white rounded-md font-semibold"
          >
            Create User
          </button>
        </div>

        <div className="w-1/2 bg-gray-100 shadow-md rounded px-8 py-6">
          <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">We got flexible rental options</li>
            <li className="mb-2">We got competitive prices on vehicules </li>
            <li className="mb-2">Have access to a 24/7 customer support</li>
            <li className="mb-2">Have access to a wide selection of vehicles</li>
            <li className="mb-2">Convenient online booking</li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default CreateUserForm;
