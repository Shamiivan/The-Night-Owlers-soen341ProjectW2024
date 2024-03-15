import exp from "constants";
import mongoose, { Document, Schema } from "mongoose";
import { comment } from "postcss";

export interface IReservation extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    pickupDate: Date;
    returnDate: Date;
    comments: string;
    status: "available" | "reserved" | "rented" | "returned";
}
let Reservation: mongoose.Model<IReservation> | undefined = mongoose.models.Reservation as mongoose.Model<IReservation> | undefined;
if(!Reservation) {

const ReservationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    comments: { type: String, required: false },
    status: { type: String, required: true, enum: ["available", "reserved", "rented", "returned"] },
}, { timestamps: true }); // Enable automatic timestamping  of createdAt and updatedAt fields
    Reservation = mongoose.model<IReservation>("Reservation", ReservationSchema);
}
export default Reservation;s