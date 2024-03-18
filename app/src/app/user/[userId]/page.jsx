import React from 'react';
import { getSession } from "next-auth/react";
import { getUserById } from "@/utils/userRepository";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ViewUser({ params }) {

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
    <div className='mt-10 max-w-6xl mx-auto px-4 lg:px-6 space-y-6'>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl">User Information</h1>
      </div>
      <div className='px-10 pb-10 mt-5 border-2 border-slate-300 rounded-xl grid grid-cols-2'>
        <div className='flex justify-center items-center'>
          <img src={user.imageUrl} className='w-auto h-auto max-h-96 rounded-sm' alt='User' />
        </div>
        <div className='border-2 border-slate-300 rounded-sm bg-slate-200 shadow-md px-6 m-10'>
          <p className=' mt-3 mb-2 text-2xl font-bold flex justify-center'>{user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone number:</b> {user.phoneNumber}</p>
          <div className="mt-4 flex space-x-2 items-center flex-row">
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="mt-auto w-full">
          <Link href={`/user/update/${params.userId}`}>
            <Button variant="secondary" className="text-primary-foreground mt-auto ">
              Edit
            </Button>
          </Link>
        </div>
        <Link href={`/`}>
          <Button variant="ghost" className="mt-auto w-full">Back</Button>
        </Link>
      </div>
    </div>
  );
}
