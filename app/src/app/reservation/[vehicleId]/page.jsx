import { ReservationForm } from "@/components/reservation-form"
import { getSession } from "next-auth/react"
import { authOptions } from "@/utils/auth";
import { getProviders } from "next-auth/react"
import { getVehicleById } from "@/utils/vehicleRepository";
import CreditcardForm from "@/components/creditCardConfirmation";
async function fetchVehicle(id) {
    const response = await getVehicleById(id);
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}

export default async function Reservation({params}){

    const vehicle = await fetchVehicle(params.vehicleId);
    
    return (
        <div>
            <ReservationForm
                vehicleId={vehicle._id.toString()}
                imgUrl={vehicle.imageUrl}
                brand={vehicle.brand}
                model={vehicle.vehicleModel}
                year={vehicle.year}
                nPeople={vehicle.nPeople}
                color={vehicle.color}
                fuelType={vehicle.fuelType}
                rentalPrice={vehicle.rentalPrice}
             />
        </div>
    )
}