import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../../../../middleware";
import { IReservation } from "@/models/Reservation";
import {
  getReservationById,
  updateReservation,
  getAllReservations,
  deleteReservation,
  createReservation,
} from "@/utils/reservationRepository";

export async function GET(
  req: NextApiRequest,
  { params }: any,
  res: NextApiResponse,
) {
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
