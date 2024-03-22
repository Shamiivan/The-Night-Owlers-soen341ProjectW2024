import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../../../../middleware";
import { IReservation } from "@/models/Reservation";
import { getReservationById, updateReservation, getAllReservations, deleteReservation, createReservation } from "@/utils/reservationRepository";

export async function GET(req: NextApiRequest, { params }: any, res: NextApiResponse) {
  const { reservationId } = params;
  const result = await getReservationById(reservationId as string);
  console.log(result);
  if (result.success) {
    return NextResponse.json({ success: true, value: result.value });
  } else if (result.error) {
    return NextResponse.json({ success: false, error: result.error.message });
  } else {
    return NextResponse.json({ success: false, error: "Method not allowed" });
  }
}

interface UpdatedReservationData {
  [key: string]: any;
}


export async function PUT(request: Request) {
  console.log(request);
  const updatedReservationData: UpdatedReservationData = await request.json();
  const pickupDate = updatedReservationData.pickupDate.split('T')[0];
  const pickupTime = updatedReservationData.pickupTime;
  const returnDate = updatedReservationData.returnDate.split('T')[0];
  const returnTime = updatedReservationData.returnTime;
  console.log("UPDATED ", updatedReservationData);
  const updateFields: Partial<IReservation> = {
    vehicleId: updatedReservationData.vehicleId,
    userId: updatedReservationData.userId,
    pickupDateTime: new Date(`${pickupDate}T${pickupTime}`),
    returnDateTime: new Date(`${returnDate}T${returnTime}`),
    pickupLocation: updatedReservationData.pickupLocation,
    returnLocation: updatedReservationData.returnLocation,
    totalPrice: updatedReservationData.totalPrice,
    comments: updatedReservationData.comments,
    status: updatedReservationData.status,
    name: updatedReservationData.name,
    driverlicense: updatedReservationData.driverlicense,
    creditcard: updatedReservationData.creditcard,
    damageReported: updatedReservationData.damageReported,
    rentalName: updatedReservationData.rentalName,
    rentalDate: updatedReservationData.rentalDate,
    renterName: updatedReservationData.renterName,
    renterDate: updatedReservationData.renterDate,
    rentalCompanySignature: updatedReservationData.rentalCompanySignature,
    renterSignature: updatedReservationData.renterSignature

  };
  const id = updatedReservationData.id;
  const result = await updateReservation(id, updateFields);
  if (result.success) {
    return NextResponse.json({ message: "Reservation updated successfully" });
  } else {
    return NextResponse.json({ message: "Failed to update reservation", error: result.error }, { status: 500 });
  }
}

// DELETE function to delete a reservation by their ID
export async function DELETE(request: Request) {
  const body = await request.json();
  console.log(body._id);

  const result = await deleteReservation(body._id);
  
  // Return a response indicating success or failure
  if (result.success) {
      return NextResponse.json({ message: 'Reservation deleted successfully' });
  } else {
      return NextResponse.json({ message: 'Failed to delete reservation', error: result.error }, { status: 500 });
  }
}