import { ReservationForm } from "@/components/reservation-form"
import { getVehicleById } from "@/utils/vehicleRepository";
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