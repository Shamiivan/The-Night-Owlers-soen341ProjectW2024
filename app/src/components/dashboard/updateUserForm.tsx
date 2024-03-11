'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@/styles/global.css";


interface userProps {
    oldFirstName: string;
    oldLastName: string;
    oldEmail: string;
    oldPassword: string;
    id: string;
  }

const UpdateUserForm = ({ oldFirstName,oldLastName, oldEmail, oldPassword, id}: userProps) => {
  const router = useRouter();

 const [firstName, setFirstName] = useState(oldFirstName);
 const [lastName, setLastName] = useState(oldLastName);
 const [email, setEmail] = useState(oldEmail);
 const [password, setPassword] = useState(oldPassword);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, email, password, id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      router.push("/admin/users");
    } else {
      console.error('Error updating user:', response.statusText);
    }
 };

 return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update User
      </button>
    </form>
 );
};

export default UpdateUserForm
