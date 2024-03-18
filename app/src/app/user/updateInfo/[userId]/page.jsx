// pages/user/updateInfo/[userId].jsx
'use client'
import React, { useState, useEffect } from 'react';
import { getUserById } from "@/utils/userRepository";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function UpdateUserInfo() {
  const router = useRouter();
  const userId = router.query.userId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user information
      router.push(`/user/${user.id}`); // Redirect to user view page after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='mt-10 max-w-6xl mx-auto px-4 lg:px-6 space-y-6'>
      <div className="gap-2">
        <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl ml-10">Edit User Information</h1>
      </div>
      <div className='px-10 pb-10 mt-5 rounded-xl'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>First Name</label>
            <input type='text' id='firstName' defaultValue={user.firstName} />
          </div>
          <div className='mb-4'>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Last Name</label>
            <input type='text' id='lastName' defaultValue={user.lastName} />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input type='email' id='email' defaultValue={user.email} />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input type='password' id='password' defaultValue={user.password} />
          </div>
          <Button type='submit'>Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
