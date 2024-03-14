import React, { useState } from 'react';
import "@/styles/global.css";
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const CreateUserForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
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
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-10 mt-10 bg-slate-200 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
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

export default CreateUserForm;
