import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAllReservations, createReservation } from "@/utils/reservationRepository";

export async function GET() {
    const result = await getAllReservations();

    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return  NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}

export async function POST(request: Request) {
    // Parse the request body to get the new reservation data
    const {pickupDate, pickupTime, returnDate, returnTime, comments, userId,  vehicleId }= await request.json();
    const result = await createReservation(pickupDate, pickupTime, returnDate, returnTime, comments, userId, vehicleId);
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'Reservation created successfully', value: result.value });
    } else {
        console.log(result.error);
        return NextResponse.json({ message: 'Failed to create reservation', error: result.error }, { status: 500 });
    }
}