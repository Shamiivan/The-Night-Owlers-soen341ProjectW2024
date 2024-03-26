'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@/styles/global.css";
import { Button } from '../ui/button';
import Link from 'next/link';

interface ReservationProps {
    oldUserId: string;
    oldVehicleId: string;
    oldPickupDate: Date;
    oldPickupTime: string;
    oldReturnDate: Date;
    oldReturnTime: string;
    oldPickupLocation: string;
    oldReturnLocation: string;
    oldtotalPrice: number;
    oldComment: string;
    oldStatus: string;
    oldName: string;
    oldDriverlicense: string;
    oldCreditcard: string;
    oldDamageReported: boolean;
    id: string;
  }

const UpdateReservationForm = ({ oldUserId, oldVehicleId, oldPickupDate, oldPickupTime, oldReturnDate, oldReturnTime, oldPickupLocation, oldReturnLocation, oldtotalPrice, oldComment, oldStatus, oldName, oldDriverlicense, oldCreditcard, oldDamageReported,id }: ReservationProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState(oldUserId);
  const [vehicleId, setVehicleId] = useState(oldVehicleId);
  const [pickupDate, setPickupDate] = useState(oldPickupDate.toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState(oldPickupTime);
  const [returnDate, setReturnDate] = useState(oldReturnDate.toISOString().split('T')[0]);
  const [returnTime, setReturnTime] = useState(oldReturnTime);
  const [pickupLocation, setPickupLocation] = useState(oldPickupLocation);
  const [returnLocation, setReturnLocation] = useState(oldReturnLocation);
  const [totalPrice, setTotalPrice] = useState(oldtotalPrice);
  const [comments, setComment] = useState(oldComment);
  const [status, setStatus] = useState(oldStatus);
  const [name, setName] = useState(oldName);
  const [driverlicense, setDriverlicense] = useState(oldDriverlicense);
  const [creditcard, setCreditcard] = useState(oldCreditcard);
  const [damageReported, setDamageReported] = useState(oldDamageReported);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Updating reservation:', id);
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to update this reservations?');

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}:00`);
    const returnDateTime = new Date(`${returnDate}T${returnTime}:00`);

    if (isConfirmed) {
      console.log('User confirmed update');


      // Proceed with the form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId,
          vehicleId,
          pickupDateTime,
          returnDateTime,
          pickupLocation,
          returnLocation,
          totalPrice,
          comments,
          status,
          name,
          driverlicense,
          creditcard,
          damageReported,
          id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from server:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Data received from server:', data);
        router.push("/admin/reservations");
        alert('Information sent successfully!');
      } else {
        console.error('Error updating reservations:', response.statusText);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700">Vehicle ID:</label>
        <input
          type="text"
          id="vehicleId"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pick-up Date:</label>
        <input
          type="date"
          id="pickupDate"
          value={pickupDate}
          onChange={(e) => setPickupDate((e.target.value))}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Pick-up Time:</label>
        <input
          type="time"
          id="pickupTime"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Return Date:</label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate((e.target.value))}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="returnTime" className="block text-sm font-medium text-gray-700">Return Time:</label>
        <input
          type="time"
          id="returnTime"
          value={returnTime}
          onChange={(e) => setReturnTime(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pick-up Location:</label>
        <input
          type="text"
          id="pickupLocation"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />  
      </div>
      <div className="mb-4">
        <label htmlFor="returnLocation" className="block text-sm font-medium text-gray-700">Return Location:</label>
        <input
          type="text"
          id="returnLocation"
          value={returnLocation}
          onChange={(e) => setReturnLocation(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price:</label>
        <input
          type="number"
          id="totalPrice"
          value={totalPrice}
          onChange={(e) => setTotalPrice(parseInt(e.target.value))}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comment:</label>
        <input
          type="text"
          id="comments"
          value={comments}
          onChange={(e) => setComment(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Status:
          <span className='ml-2 bg-slate-300 px-2 rounded-xl text-sm font-medium shadow-sm shadow-black'>
            Currently: {oldStatus}
          </span>
        </label>
        <select
          id="status"
          value={status} // Use the value prop instead of selected on option
          onChange={(e) => setStatus(e.target.value)}
          className="pl-2 m-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="" disabled>Select a status</option>
          <option value="reserved">Reserved</option>
          <option value="rented">Rented</option>
          <option value="returned">Returned</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor='driverlicense' className="block text-sm font-medium text-gray-700">Driver License:</label>
        <input
          type="text"
          id="driverlicense"
          value={driverlicense}
          onChange={(e) => setDriverlicense(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor='creditcard' className="block text-sm font-medium text-gray-700">Credit Card:</label>
        <input
          type="text"
          id="creditcard"
          value={creditcard}
          onChange={(e) => setCreditcard(e.target.value)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor='damageReported' className="block text-sm font-medium text-gray-700">Damage Report:</label>
        <input
          type="checkbox"
          id="damageReported"
          checked={damageReported}
          onChange={(e) => setDamageReported(e.target.checked)}
          className="pl-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className='flex justify-evenly'>
        <Button
        type="submit"
        className=" bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update reservations
        </Button>
        <Link href="/admin/reservations">
          <Button className=' py-2 px-4 '>
              Back
          </Button>
        </Link>
      </div>
    </form>
 );
};

export default UpdateReservationForm
