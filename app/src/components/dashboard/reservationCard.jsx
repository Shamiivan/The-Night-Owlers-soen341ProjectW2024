import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React, { useEffect, useState } from "react";

export default function ReservationCard({ userId, vehicleId, pickupDate, pickupTime, returnDate, returnTime, name, status, _id }) {

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

    const getStatusColor = (status) => {
        switch (status) {
          case 'reserved':
            return 'bg-blue-300 text-black';
          case 'rented':
            return 'bg-green-500 text-white';
          default:
            return 'bg-slate-300 text-white';
        }
      };

    return (
        <div className="flex items-center ">
            <Avatar className="h-9 w-9">
                {/* You may customize the Avatar component to show a user's avatar */}
                <AvatarFallback>{/* Here you may show an avatar fallback */}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                    <span className="font-semibold">Reservation ID:</span> {_id}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">User:</span> {name}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Vehicle ID:</span> {vehicleId}
                </p>
                <div>
                    <p className={`px-2 py-1 text-sm text-muted-foreground w-fit rounded-xl ${getStatusColor(status)}`}>
                    <span className="font-semibold">Status:</span> {status}
                    </p>
                </div>
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