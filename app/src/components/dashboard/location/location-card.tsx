import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

interface locationProps {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    typeOfLocation : "city" | "airport" | "train station";
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    operatingHours: {
        open: string;
        close: string;
    };


}
export default function LocationCard({ _id, name, address, city, state, typeOfLocation, postalCode, country, latitude, longitude, phone, email, operatingHours }: locationProps) {

    const deleteLocation = async () => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);
        try {
            const response = await fetch(`/api/locations/${_id}`, {
                method: 'DELETE',
                body: JSON.stringify({ _id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete location');
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    

 return (
    <TableRow>
    <TableCell className="font-medium">{name}</TableCell>
    <TableCell>{address}</TableCell>
    <TableCell>{city}</TableCell>
    <TableCell>{state}</TableCell>
    <TableCell>{typeOfLocation}</TableCell>
    <TableCell>{postalCode}</TableCell>
    <TableCell>{country}</TableCell>
    <TableCell>{latitude}</TableCell>
    <TableCell>{longitude}</TableCell>
    <TableCell>{phone}</TableCell>
    <TableCell>{email}</TableCell>
    <TableCell>{operatingHours.open} - {operatingHours.close}</TableCell>

    <TableCell className="flex space-y-2">
      <Button size="sm" variant="outline">
        Edit
      </Button>
      <Button size="sm" variant="outline">
        Delete
      </Button>
      <Button size="sm" variant="outline">
        New Location
      </Button>
    </TableCell>
  </TableRow>
 );
}
