import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { getSession } from "next-auth/react"
import Link  from "next/link"
import React from "react"

interface carProps {
    brand: string,
    vehicleModel: string,
    category: string,
    price: number,
    image: string,
    id: string
}

    
export function VehicleCard({ brand, category, price, vehicleModel, image, id }: carProps) {
    const session = getSession();

    const handleReservation = async () => {
        if (!session) {
            // If there is no session, redirect the user to the sign-in page or show a modal/pop-up to log in
            window.location.href = '/signin';
            return; // Stop further execution
        }
        
        // If there's a session, proceed with the reservation logic
        console.log("Making reservation for", id);
        // Here, you would typically call an API route or perform some action to record the reservation
    };
    return (
        <Card className="flex space-y-2 flex-col p-4">
            <img
                alt="Car"
                className="aspect-video object-cover rounded-t-xl"
                height={310}
                src={image}
                width={500}
            />
            <CardContent className="flex-1 flex flex-col items-start p-2 md:p-2">
                <h3 className="font-bold text-xl">{vehicleModel}</h3>
                <p className="text-gray-500 dark:text-gray-400">{brand}</p>
                <h4 className="font-bold text-md md:text-xl">${price}/day</h4>
                <div className="mt-4 flex space-x-2 items-center flex-row">
                    <div className="mt-auto w-full">
                        <Link href={`/reservation/${id}`}>
                            <Button variant="secondary" className="text-primary-foreground mt-auto w-full">
                                Make a reservation
                            </Button>
                        </Link>
                    </div>
                    <Link href={`/vehicles/${id}`}>
                        <Button variant="ghost" className="mt-auto w-full">View More</Button>
                    </Link>
                </div>

            </CardContent>
        </Card>
    )
}