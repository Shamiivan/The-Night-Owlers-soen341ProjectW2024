import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { getSession } from "next-auth/react";
import Link  from "next/link";
    
export function ReservationList({ userId, vehicleId, pickupDate, returnDate, comments, status }) {
    const session = getSession();


    
    return (
        <div>
            <h3 className="font-bold text-xl">Vehicle ID: {vehicleId}</h3>
                <p className="text-gray-500 dark:text-gray-400">Pickup Date: {pickupDate}</p>
                <p className="text-gray-500 dark:text-gray-400">Return Date: {returnDate}</p>
                <p className="text-gray-500 dark:text-gray-400">Comments: {comments}</p>
                <p className="text-gray-500 dark:text-gray-400">Status: {status}</p>
                <div className="mt-4 flex space-x-2 items-center flex-row">
                    <div className="mt-auto w-full">
                        <Button onClick={handleReservation} variant="secondary" className="text-primary-foreground mt-auto w-full">
                            Make a reservation
                        </Button>
                    </div>
                    <Link href={`/reservation/${vehicleId}`}>
                        <Button variant="ghost" className="mt-auto w-full">View More</Button>
                    </Link>
                </div>
        </div>
    );
}
