'use client'
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react"

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";


interface reservationProps {
  vehicleId: string;
  category: string;
  vehicleModel: string;
}


// Define the component with TypeScript
export function  ReservationForm ({vehicleId, category, vehicleModel} : reservationProps){
  const { data: session, status, update } = useSession()
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [result, setResult] = useState('');
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [model, setModel] = useState('');

  const handleReservation = async () => {
    // if (!session) {
    //     // If there is no session, redirect the user to the sign-in page or show a modal/pop-up to log in
    //     window.location.href = '/signin';
    //     return; // Stop further execution
    // }
    if(!session){
      setIsAuthenticated(false);
      
    } else{
      setIsAuthenticated(true);
      setEmail(session?.user?.email as string);
      console.log(email);
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservation/${vehicleId}`, {
        method: 'POST',
        body: JSON.stringify({ email, password, vehicleId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        router.push("/admin/users");
      } else {
        console.error('Error updating user:', response.statusText);
      }
    }


    // If there's a session, proceed with the reservation logic
    // console.log("Making reservation for", id);
    // Here, you would typically call an API route or perform some action to record the reservation
};

// if user is not signed in, redirect to sign in page and have him redirected back 
const handleLogin = async () => {}

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reserve Your Vehicle</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to reserve your vehicle
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">email</Label>
            <Input id="name"  type="email" placeholder="Enter email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <Input id="password" placeholder="Enter your email" required type="password" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Enter your phone" required type="tel" />
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-date">Pickup date</Label>
                <Input id="pickup-date" required type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="return-date">Return date</Label>
                <Input id="return-date" required type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select id="model">
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mustang">Ford Mustang</SelectItem>
              <SelectItem value="camaro">Chevrolet Camaro</SelectItem>
              <SelectItem value="challenger">Dodge Challenger</SelectItem>
              <SelectItem value="corvette">Chevrolet Corvette</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};
