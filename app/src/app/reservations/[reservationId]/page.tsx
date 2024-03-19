import "@/styles/global.css";
import Link from "next/link";
import { getUserById } from "@/utils/userRepository";
import { IUser } from "@/models/user";
import { IReservation } from "@/models/Reservation";
import { getReservationById } from "@/utils/reservationRepository";

export default async function ReservationConfirmationPage({ params }) {
    const userId = params.userId;
    const reservationId = params.reservationId;
    let user = null as unknown as IUser;
    let reservation = null as unknown as IReservation;

    const fetchUser = async () => {
        const response = await getUserById(userId);
        if (response.success && response.value !== undefined && response.value !== null) {
            user = response.value;
        } else {
            console.log("Error loading user");
        }
    }
    const fetchReservation = async () => {
        const response = await getReservationById(reservationId);
        if (response.success && response.value !== undefined && response.value !== null) {
            reservation = response.value;
        } else {
            console.log("Error loading reservation");
        }
    }
    await fetchUser();
    await fetchReservation();

    // Conditional rendering
    return (
        <div>
            {user && reservation ? (
                <div>
                    <h1>Reservation Confirmation</h1>
                    {/* Display user and reservation data here */}
                </div>
            ) : (
                <div>
                    <p>Loading user and reservation data...</p>
                </div>
            )}
        </div>
    );
}
