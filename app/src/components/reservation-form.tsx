'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState, useEffect, use } from "react"

interface ReservationFormProps {
  vehicleId : string;
}

export function ReservationForm(
  vehicleId: string 
) {

  const { data: session } = useSession();
  const user = session?.user;
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations`, {
      method: 'POST',
      body: JSON.stringify({ pickupDate, pickupTime, returnDate, returnTime, comments, userId: user?.id, vehicleId : vehicleId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2 text-center">

        {session ? ( 
          <h1 className="text-3xl font-bold">Car Rental Reservation for {user.firstName} {user.lastName}</h1>
        ) : (
          <h1 className="text-3xl font-bold">Please sign in to make a reservation</h1>
        )  
        }
        <p className="text-gray-500 dark:text-gray-400">Enter your information to make a reservation</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup date</Label>
              <Input id="pickup-date" 
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time">Pickup time</Label>
              <Input id="pickup-time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-date">Return date</Label>
              <Input id="return-date" 
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-time">Return time</Label>
              <Input id="return-time" 
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              required type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Additional comments or requests</Label>
            <Textarea id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)} 
            placeholder="Enter your comments or requests" />
          </div>
          <Button type="submit">Confirm Reservation</Button>
        </form>
      </div>
    </div>
  )
}
