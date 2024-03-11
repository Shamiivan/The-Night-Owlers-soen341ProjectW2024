'use client';
import { Button} from "@/components/ui/button"
import { useSession } from "next-auth/react"

export function ReservationButton(){
    const { data: session, status, update } = useSession()
    

    function handleReserve(){
        console.log('Reserve button clicked')
        console.log('Session:', session, status, update);
    }

    return (
    <Button onClick={handleReserve} variant="secondary" className="text-primary-foreground mt-auto w-full">Make a reservation</Button>
    )
}