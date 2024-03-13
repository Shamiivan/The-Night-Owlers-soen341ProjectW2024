'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState } from "react"


export function ReservationForm(
    
) {
  const { data: session } = useSession()
  console.log(session?.user);
  const user = session?.user;
  
  const [name, setName] = useState(user?.firstName + " " + user?.lastName);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Car Rental Reservation</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to make a reservation</p>
      </div>
      <div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input 
              id="name" 
              value={name}
              // onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" required type="email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input 
              id="phone" 
              placeholder="Enter your phone number" 
              required type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Color</Label>
              <Select>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Blue</SelectItem>
                  <SelectItem value="2">Red</SelectItem>
                  <SelectItem value="3">Black</SelectItem>
                  <SelectItem value="4">White</SelectItem>  
                  <SelectItem value="5">Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup date</Label>
              <Input id="pickup-date" required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time">Pickup time</Label>
              <Input id="pickup-time" required type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-date">Return date</Label>
              <Input id="return-date" required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-time">Return time</Label>
              <Input id="return-time" required type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Additional comments or requests</Label>
            <Textarea id="comments" placeholder="Enter your comments or requests" />
          </div>
          <Button type="submit">Confirm Reservation</Button>
        </form>
      </div>
    </div>
  )
}
