import React from 'react';
import { getSession } from "next-auth/react";
import { getUserById } from "@/utils/userRepository";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'

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

  const hidePassword = (password) => {
    return '*'.repeat(password.length);
  }

  return (
    <div className='mt-10 max-w-6xl mx-auto px-4 lg:px-6 space-y-6'>
      <div className="gap-2">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl ml-10">User Information</h1>
      </div>
      <div className='px-10 pb-10 mt-5 rounded-xl'>
        <div className='flex justify-center'>
          {user.image ? (
            <Image src={user.image} alt="User" width={300} height={300} />
          ) : (
            <Image src="/user-icon.png" alt="User Placeholder" width={300} height={300} />
          )}
        </div>
       
        <div className='border-2 border-slate-300 rounded-sm bg-slate-200 shadow-md px-6 mt-10'>
          <p className=' mt-3 mb-2 text-2xl font-bold flex justify-center'>{user.firstName} {user.lastName}</p>
          <div className='grid grid-cols-2 gap-6 my-6'>
            <p><b className='text-lg'>Email:</b> {user.email}</p>
            <p><b className='text-lg'>Password:</b> {hidePassword(user.password)}</p>
            <p><b className='text-lg'>Phone number:</b> {user.phoneNumber}</p>
            <p><b className='text-lg'>Address:</b> {user.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-10 flex justify-between">
        <div className="mt-auto w-full">
          <Link href={`/user/updateInfo/${params.userId}`}>
            <Button variant="secondary" className="text-primary-foreground mt-auto ">
              Edit
            </Button>
          </Link>
        </div>
        <Link href="/">
          <Button variant="ghost" className="mt-auto w-full">Back</Button>
        </Link>
      </div>
    </div>
  );
}
