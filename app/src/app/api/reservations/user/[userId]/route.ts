import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { IReservation } from "@/models/reservation";
import {getReservationsByUserId} from "@/utils/reservationRepository";

export async function GET(req: NextApiRequest, { params }: any, res: NextApiResponse) {
  const { userId } = params;
  console.log("Thus is th the reservationId:")
  console.log();
  const result = await getReservationsByUserId(userId as string);
  if (result.success) {
    return NextResponse.json({ success: true, value: result.value });
  } else if (result.error) {
    return NextResponse.json({ success: false, error: result.error.message });
  } else {
    return NextResponse.json({ success: false, error: "Method not allowed" });
  }
}

