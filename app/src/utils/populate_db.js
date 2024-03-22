import mongoose from "mongoose";
import executeAsync from "@/utils/Result";
import Reservation from "@/models/Reservation";
import printError from "@/utils/print";
import { connectToDatabase } from "@/utils/connectDb";

console.log("Hello World!");
export async function getReservationsByUserId(userId) {
  return executeAsync(async () => {
    await connectToDatabase();
    const idObj = new mongoose.Types.ObjectId(userId);
    // Retrieve reservations with the specified userId from the database
    const reservations = await Reservation?.find({ idObj })
      .populate("userId", "firstName lastName phone address")
      .exec();

    // Log the result of the retrieval
    return reservations;
  });
}

printError("GEtting reservatoin");
console.log(await getReservationsByUserId("65e2ed0b307dc19abacdc796"));
