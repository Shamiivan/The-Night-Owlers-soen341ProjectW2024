import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserById } from "@/utils/userRepository";

export default async function SuccessPage({ params }) {

    async function getUser() {
        try {
          const res = await getUserById(params.userId);
          if (res.success) {
            return res.value;
          } else {
            throw new Error(res.error);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          return null;
        }
      }
    
      const user = await getUser();
    
      if (!user) {
        return (
          <div>
            <p className='flex items-center justify-center font-semibold text-2xl'>
              Loading...
            </p>
          </div>
        );
      }


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-100 p-8 rounded-lg text-center shadow-lg shadow-grey-500">
        <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" /> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path> 
        </svg>
        <h1 className="text-2xl font-bold mb-4">Reservation Successful</h1>
        <p>Your reservation has been successfully created!</p>
        <p className="mt-4 text-sm">A confirmation email will be sent to you shortly.</p>
        <Link href={`/viewreserve/${user._id.toString()}`} className='mt-8 inline-block'>
          <Button>
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
