'use client'
import { use, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getVehicleCategories } from "@/utils/vehicleRepository";
import { ILocation } from "@/models/location";


interface SearchBarProps {
    categories?: any[];
    locations?: ILocation[];
}

export function SearchBar(
    { categories = [], locations = [] }: SearchBarProps
) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");





    const submitForm = () => {
        const current = new URLSearchParams(Array.from(searchParams?.entries() ?? []));
        // pickupDate
        if (pickupDate !== '') {
            current.set("pickUpDate", pickupDate);
        } else {
            current.delete("pickUpDate");
        }

        // returnDate
        if (returnDate !== '') {
            current.set("returnDate", returnDate);
        } else {
            current.delete("returnDate");
        }

        // location
        if (selectedLocation !== '') {
            current.set("location", selectedLocation);
        } else {
            current.delete("location");
        }

        //categories
        if (selectedCategory !== '') {
            current.set("category", selectedCategory);
        }
        else {
            current.delete("category");
        }


        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm();

    };

    useEffect(() => {
        submitForm();
    }, [pickupDate, returnDate, selectedLocation, selectedCategory]);

    return (

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            {/** LOCATION*/}
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="location">
                    Current Location :
                </Label>

                <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-2">
                <Label className="text-sm" htmlFor="location">
                    Select Category
                </Label>

                <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category}
                        </option>
                    ))}
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
            {/* <div className="flex items-end gap-2 md:col-start-4">
                <Button size="lg">Search</Button>
            </div> */}
        </form>
    )
}