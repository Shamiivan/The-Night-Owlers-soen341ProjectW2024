import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../../../middleware";
import { IReservation } from "@/models/reservation";
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
  console.log("UPDATED ", updatedReservationData);
  const updateFields: Partial<IReservation> = {
    vehicle: updatedReservationData.vehicle,
    user: updatedReservationData.user,
    startDate: updatedReservationData.startDate,
    endDate: updatedReservationData.endDate,
    status: updatedReservationData.status,
  };
  const id = updatedReservationData.id;
  const result = await updateReservation(id, updateFields);
  if (result.success) {
    return NextResponse.json({ message: "Reservation updated successfully" });
  } else {
    return NextResponse.json({ message: "Failed to update reservation", error: result.error }, { status: 500 });
  }
}