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
    const [location, setLocation] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const current = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
        current.set("pickUpDate", pickupDate);
        current.set("returnDate", returnDate);
        if(location ==="London"){
            current.set("location", "65fddf402caecab370f74937");
        }else if(location ==="Montreal"){
            current.set("location", "65fde5fd2caecab370f74961")
        }

        const search = current.toString();
        console.log(search);
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);

    };

    return (

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="location">
                    Pick-up location
                </Label>
                <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select a location</option>
                    <option value="Montreal">Montreal</option>
                    <option value="London">London</option>
                </select>
            </div>
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="start">
                    Start date
                </Label>
                <Input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    id="start" />
            </div>
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="end">
                    End date
                </Label>
                <Input id="end" type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate}
                />
            </div>
            <div className="flex items-end gap-2 md:col-start-4">
                <Button size="lg">Search</Button>
            </div>
        </form>
    )
}