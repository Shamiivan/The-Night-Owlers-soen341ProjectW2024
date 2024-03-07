"use client"

import "@/styles/global.css";
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';

const exampleReservation = {
  id: 'placeholder',
  location: 'Example Location',
  startDate: '2024-03-05',
  endDate: '2024-03-08',
  modelName: 'Example Model',
  seatCount: 4,
  fuelType: 'Petrol',
  driverName: 'John Doe',
  status: 'Checked In',
  // Add more details as needed
};

const ViewReservation: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='m-8 p-4 bg-blue-200 shadow-md rounded-md'>
        <div className='flex mb-4 p-4'>
          <div>
            <div className='bg-slate-200 rounded-lg p-2 pl-5 m-2'>
              <p className='font-medium'>Location:</p>
              <p>{exampleReservation.location}</p>
            </div>
            <div className='grid grid-cols-2'>
              <div className='bg-slate-200 rounded-lg py-2 px-4 m-2'>
                <p className='font-medium'>Start Date:</p>
                <p>{exampleReservation.startDate}</p>
              </div>
              <div className='bg-slate-200 rounded-lg py-2 px-4 m-2'>
                <p className='font-medium'>End Date:</p>
                <p>{exampleReservation.endDate}</p>
              </div>
            </div>

          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/path/to/your/image.jpg" alt="Car Image" className="object-cover rounded-full" />
          </div>
          <div className=''>
            <p className='bg-slate-200 rounded-lg p-4 m-2  font-medium'>Status: {exampleReservation.status}</p>
          </div>
        </div>
        <div className='bg-slate-200 rounded-lg py-6 pl-10 m-2 '>
          <p className="flex text-xl font-semibold mb-2 pb-2 justify-center">Car Information</p>
          <div className='grid grid-cols-2 ml-10'>
            <p className="">Model Name: {exampleReservation.modelName}</p>
            <p className="">Seat Count: {exampleReservation.seatCount}</p>
            <p className="">Fuel Type: {exampleReservation.fuelType}</p>
            <p className="">Driver Name: {exampleReservation.driverName}</p>          
            {/* Add more details as needed */}
          </div>
        </div>
        <div className='flex justify-end m-2'>
        <Link href='/' className='mr-5'>
            <Button>Modify</Button>
          </Link>
          <Link href='/'>
          {/* Need linked page */}
            <Button className='bg-red-500 hover:bg-red-400'>Cancel</Button>
          </Link>
        </div>
        
       
      </div>
      <Footer />
    </div>
  );
};

export default ViewReservation;
