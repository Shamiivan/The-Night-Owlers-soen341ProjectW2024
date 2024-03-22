'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CardContent, Card } from "@/components/ui/card"
import { getSession } from "next-auth/react"
import { ReservationButton } from "./ReservationButton"
import Link from "next/link"

export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const current = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
        current.set("pickUpDate", pickupDate);
        current.set("returnDate", returnDate);
        // cast to string
        const search = current.toString();
        console.log(search);
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);

    };
    const checkPickUpDate = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset the time part to ensure we're comparing only the date part

        if (selectedDate < currentDate) {
            alert('The selected date cannot be in the past. Please select a future date.');
            return; // Exit the function if the date is in the past
        }

        const date = event.target.value;
        console.log(date);
        setPickupDate(date); // Assuming this is for the pickup date, adjust accordingly
    };

    const checkReturnDate = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset the time part to ensure we're comparing only the date part
        const pick = new Date(pickupDate);
        if (pickupDate === "") {
            alert("Please select the pick up date first!");
            return;
        }
        if (selectedDate < currentDate || selectedDate < pick) {
            alert('The selected date must be greater than or equal to the pick up date');
            return;
        }
        setReturnDate(event.target.value);


    }

    return (

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="location">
                    Pick-up location
                </Label>
                <Input id="location" placeholder="Enter a location" />
            </div>
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="start">
                    Start date
                </Label>
                <Input
                    type="date"
                    value={pickupDate}
                    onChange={checkPickUpDate}
                    id="start" />
            </div>
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="end">
                    End date
                </Label>
                <Input id="end" type="date"
                    value={returnDate}
                    onChange={checkReturnDate}
                />
            </div>
            <div className="flex items-end gap-2 md:col-start-4">
                <Button size="lg">Search</Button>
            </div>
        </form>
    )
}