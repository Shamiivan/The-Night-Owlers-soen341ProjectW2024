import { getReservationById } from "@/utils/reservationRepository";
import { getUserById } from "@/utils/userRepository";
import { getVehicleById } from "@/utils/vehicleRepository";

export async function fetchDataById(id, type) {
    let response;
    switch (type) {
        case 'reservation':
            response = await getReservationById(id);
            break;
        case 'user':
            response = await getUserById(id);
            break;
        case 'vehicle':
            response = await getVehicleById(id);
            break;
        default:
            return null;
    }
    if (response.success) {
        return response.value;
    } else {
        return null;
    }
}