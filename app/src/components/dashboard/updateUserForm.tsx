'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@/styles/global.css";
import { Button } from '../ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface userProps {
    oldFirstName: string;
    oldLastName: string;
    oldEmail: string;
    oldPassword: string;
    oldAddress: string;
    oldPhone: string;
    oldRole: string;
    id: string;
  }

const UpdateUserForm = ({ oldFirstName,oldLastName, oldEmail, oldPassword, oldAddress, oldPhone, oldRole, id}: userProps) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState(oldFirstName);
  const [lastName, setLastName] = useState(oldLastName);
  const [email, setEmail] = useState(oldEmail);
  const [password, setPassword] = useState(oldPassword);
  const [address, setAddress] = useState(oldAddress);
  const [phone, setPhone] = useState(oldPhone);
  const [role, setRole] = useState(oldRole);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to update this user?');

    if (isConfirmed) {
      // Proceed with the form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, email, password, address, phone, role, id }),
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
      alert('Information sent successfully!');
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
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
        <input
          type="phone"
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
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role:
          <span className='ml-2 bg-slate-300 px-2 rounded-xl text-sm font-medium shadow-sm shadow-black'>
            Currently: {oldRole}
          </span>
        </label>
        <select
          id="role"
          value={role} // Use the value prop instead of selected on option
          onChange={(e) => setRole(e.target.value)}
          className="pl-2 m-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="" disabled>Select a role</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className='flex justify-evenly'>
        <Button
        type="submit"
        className=" bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update User
        </Button>
        <Link href="/admin/users">
          <Button className=' py-2 px-4 '>
              Back
          </Button>
        </Link>
      </div>
    </form>
 );
};

export default UpdateUserForm
