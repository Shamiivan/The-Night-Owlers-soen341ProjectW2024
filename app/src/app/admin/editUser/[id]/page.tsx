'use client'
import { useState, useEffect } from 'react';
import "@/styles/global.css";
import { IUser } from "@/models/User";
import UpdateUserForm from "@/components/dashboard/updateUserForm";

export default function UserPage({params} : {params: {id: string}}) {

console.log(params.id);
const id = params.id;


 const [user, setUser] = useState<IUser | null>(null);

 useEffect(() => {
    const fetchUser = async () => {
      if (!id) return; // 

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data.value);
      } catch (error) {
        console.log("Error loading user: ", error);
      }
    };

    fetchUser();
 }, [id]); // Add id to the dependency array to refetch if id changes

 return (
    <div>
      User page
      {id}
      {/* Render user data if available */}
      {user ? (
          <UpdateUserForm 
          oldFirstName={user.firstName}
          oldLastName={user.lastName}
          oldEmail={user.email}
          _id={user._id.toString()}
           />
 
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
 );
}
