'use client'
import "@/styles/global.css";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";

export function ReservationForm({
  vehicleId,
  imgUrl,
  brand,
  model,
  year,
  nPeople,
  color,
  fuelType,
  rentalPrice
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [driverlicense, setDriverlicense] = useState("");
  const [creditcard, setCreditcard] = useState("");
  const [comments, setComments] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const pickupDateObj = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    const pickupTimeObj = new Date(`${pickupDate}T${pickupTime}`);
    const returnTimeObj = new Date(`${returnDate}T${returnTime}`);

    if (pickupDateObj <= today) {
      alert('Pickup date should be in the future');
      return;
    }

    if (returnDateObj < pickupDateObj) {
      alert('Return date should not be before pickup date');
      return;
    }

    if (pickupDateObj.getTime() === returnDateObj.getTime() && returnTimeObj <= pickupTimeObj) {
      alert('Return time should be more than pickup time');
      return;
    }

    if (!user?.id) {
      alert('User ID not available');
      return;
    }

    const imgUrlEncoded = encodeURIComponent(imgUrl); // Encode imgUrl to avoid breaking the URL
    window.location.href = `/confirmation?userId=${user.id}&vehicleId=${vehicleId}&brand=${brand}&model=${model}&year=${year}&nPeople=${nPeople}&color=${color}&fuelType=${fuelType}&rentalPrice=${rentalPrice}&pickupDate=${pickupDate}&pickupTime=${pickupTime}&returnDate=${returnDate}&returnTime=${returnTime}&pickupLocation=A&returnLocation=A&comments=${comments}&driverlicense=${driverlicense}&creditcard=${creditcard}&imgUrl=${imgUrlEncoded}`;

  }


  return (
    <div className="max-w-md mx-auto px-2 lg:px-6 space-y-2 mb-2">
      <div className="space-y-1 text-center">
        {session ? (
          <h1 className="text-3xl font-bold">Car Rental Reservation for {user.firstName} {user.lastName}</h1>
        ) : (
          <h1 className="text-3xl font-bold">Please sign in to make a reservation</h1>
        )
        }
        <p className="text-gray-500 dark:text-gray-400">Enter your information to make a reservation</p>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="flex p-2 bg-slate-200 rounded-lg mb-4 shadow-md">
            <div className="mr-4">
              <Image src={imgUrl} alt="Car" width={300} height={200} />
            </div>
            <div>
              <p className="text-2xl font-bold">{brand} {model}</p>
              <p className="text-gray-500 dark:text-gray-400">{year}</p>
              <p className="text-gray-500 dark:text-gray-400">{fuelType}</p>
              <p className="text-gray-500 dark:text-gray-400">{color}</p>
              <p className="text-gray-500 dark:text-gray-400">{nPeople} people</p>
              <p className="text-gray-500 dark:text-gray-400">${rentalPrice} per day</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup date</Label>
              <Input id="pickup-date"
              value={pickupDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required type="date"
              min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
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
              required type="date"
              min={pickupDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-time">Return time</Label>
              <Input id="return-time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              required type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverlicense">Driver license</Label>
              <Input id="driverlicense"
              value={driverlicense}
              onChange={(e) => setDriverlicense(e.target.value)}
              required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditcard">Credit Card Number</Label>
              <Input id="creditcard"
              value={creditcard}
              onChange={(e) => setCreditcard(e.target.value)}
              required type="text" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Additional comments or requests</Label>
            <Textarea id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments or requests" />
          </div>
          <div className="flex justify-between">
            <Button type="submit">
                Make a Reservation
            </Button>
            <Link href="/vehicles">
              <Button variant="outline">back</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
