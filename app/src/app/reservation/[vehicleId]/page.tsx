import { ReservationForm } from "@/components/reservation-form"
import { getSession } from "next-auth/react"
import { authOptions } from "@/utils/auth";
import { getProviders } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next';
import { getVehicleById } from "@/utils/vehicleRepository";



export default async function Reservation({params} : {params: {vehicleId: string}}){

    const vehicleId = params.vehicleId;
    async function getVehicle(){
        const res = await getVehicleById(params.vehicleId);
        if(res.success){
            return res.value;
        } else {
            res.error;
        }  
    }
    const vehicle = getVehicle();    
    return (
        <div>
            <ReservationForm />
        </div>
    )
}