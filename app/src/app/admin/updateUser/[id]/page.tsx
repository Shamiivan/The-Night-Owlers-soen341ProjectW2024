'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import "@/styles/global.css";
import { IUser } from '@/models/user';
import UpdateUserForm from "@/components/dashboard/updateUserForm";


export default function UserPage({params} : {params: {id: string}}) {

console.log(params.id);
const id = params.id;


 const [user, setUser] = useState<IUser | null>(null);

 useEffect(() => {
    const fetchUser = async () => {
      if (!id) return; // 

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        console.log(res);

        const data = await res.json();
        setUser(data.value);
      } catch (error) {
        console.log("Error loading user: ", error);
      }
    };

    fetchUser();
 }, [id]); 

 return (
    <div>
      <div>
        {/* Render user data if available */}
      {user ? (
          <UpdateUserForm 
          oldFirstName={user.firstName}
          oldLastName={user.lastName}
          oldEmail={user.email}
          oldPassword={user.password}
          oldAddress={user.address}
          oldPhone={user.phone}
          oldRole={user.role}
          id={user._id.toString()}
           />
 
      ) : (
        <p>Loading user data...</p>
      )}
      </div>
      
    </div>
 );
}
