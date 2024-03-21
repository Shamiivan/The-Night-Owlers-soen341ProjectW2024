import React from 'react';
import { getSession } from "next-auth/react";
import { getUserById } from "@/utils/userRepository";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import UpdateUserForm from '@/components/user/updateInfo/[userId]/page.jsx';

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
      <UpdateUserForm
        oldFirstName={user.firstName}
        oldLastName={user.lastName}
        oldEmail={user.email}
        oldPassword={user.password}
        oldRole={user.role}
        id={user._id.toString()}
      />
    </div>
  );
}
