import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";

interface ReservationProps {
    userId: string;
    vehicleId: string;
    pickupDate: Date;
    returnDate: Date;
    status: string;
    _id: string;
}

export default function ReservationCard({ userId, vehicleId, pickupDate, returnDate, status, _id }: ReservationProps) {

    const [userData, setUserData] = useState<any>(null);
    const [vehicleData, setVehicleData] = useState<any>(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`/api/users/${userId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      const fetchVehicleData = async () => {
        try {
          const res = await fetch(`/api/vehicles/${vehicleId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch vehicle data");
          }
          const data = await res.json();
          setVehicleData(data);
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }
      };
  
      fetchUserData();
      fetchVehicleData();
    }, [userId, vehicleId]);

    const deleteReservation = async () => {

        const isConfirmed = window.confirm(`Are you sure you want to delete this reservation?`);
        try {
        const response = await fetch(`/api/reservations/${_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete reservation');
        } else {
            window.location.reload();
        }

        } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('Failed to delete reservation');
        }
    };

    return (
        <div className="flex items-center">
        <Avatar className="h-9 w-9">
            {/* You may customize the Avatar component to show a user's avatar */}
            <AvatarFallback>{/* Here you may show an avatar fallback */}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
            {/* Here you may display the vehicle information */}
            Vehicle ID: {vehicleId}
            </p>
            <p className="text-sm text-muted-foreground">
            {/* Here you may display other details like pickup and return dates */}
            Status: {status}
            </p>
        </div>
        <div className="ml-auto font-medium flex flex-row">
            <div className="mr-2">
            <Link href={`/admin/updateReservation/${_id}`}>
                <Button variant="link">Update</Button>
            </Link>
            </div>
            <div className="mr-2">
            <Button variant="destructive" onClick={deleteReservation}>Delete</Button>
            </div>
        </div>
        <Separator />
        </div>
    );
}
