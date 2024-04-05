import React from 'react';
import './failure.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FailurePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-100 p-8 rounded-lg text-center shadow-lg shadow-grey-500">
        <svg className="w-16 h-16 sign mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" /> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <h1 className="text-2xl font-bold mb-4">Reservation Failed</h1>
        <p>Sorry, there was an error creating your reservation. Please try again later.</p>
        <Link href={`/vehicles`}>
            <Button variant="destructive" className='mt-8 inline-block'>
                Back
            </Button>
        </Link>
      </div>
    </div>
  );
}
