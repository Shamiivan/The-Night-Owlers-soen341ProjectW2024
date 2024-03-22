import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  getAllReservations,
  createReservation,
  addReservation,
} from "@/utils/reservationRepository";
import type { IReservation } from "@/models/Reservation";
import mongoose from "mongoose";

export async function GET() {
  const result = await getAllReservations();

  if (result.success) {
    return NextResponse.json({ success: true, value: result.value });
  } else if (result.error) {
    return NextResponse.json({ success: false, error: result.error.message });
  } else {
    // Handle unsupported methods or other conditions
    return NextResponse.json({ success: false, error: "Method not allowed" });
  }
}

export async function POST(request: Request) {
  // Parse the request body to get the new reservation data
  let {
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    pickupLocation,
    returnLocation,
    comments,
    name,
    driverlicense,
    creditcard,
    damageReported,
    userId,
    vehicleId,
  } = await request.json();

  // Validate required fields
  if (!userId || !vehicleId || !pickupDate || !returnDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
  const returnDateTime = new Date(`${returnDate}T${returnTime}`);
  pickupLocation = pickupLocation ? pickupLocation : "London";
  returnLocation = "London";
  let status = "reserved";

  const fields: Partial<IReservation> = {
    userId: new mongoose.Types.ObjectId(userId),
    vehicleId: new mongoose.Types.ObjectId(vehicleId),
    pickupDate: pickupDateTime,
    returnDate: returnDateTime,
    pickupLocation: pickupLocation,
    comments,
    status,
  };

  const result = await addReservation(fields);
  console.log(result);
  // Return a response indicating success or failure
  if (result.success) {
    return NextResponse.json({
      message: "Reservation created successfully",
      value: result.value,
    });
  } else {
    console.log(result.error);
    return NextResponse.json(
      { message: "Failed to create reservation", error: result.error },
      { status: 500 },
    );
  }
}
