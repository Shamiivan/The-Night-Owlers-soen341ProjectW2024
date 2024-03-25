import mongoose, { Document, Schema } from "mongoose";

interface IReservation extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    pickupDateTime: Date;
    returnDateTime: Date;
    pickupLocation: string;
    returnLocation: string;
    totalPrice: number;
    comments: string;
    status: "available" | "reserved" | "rented" | "returned";
    name: string;
    driverlicense: string;
    creditcard: string;
    damageReported: boolean;
}
let Reservation: mongoose.Model<IReservation> | undefined = mongoose.models.Reservation as mongoose.Model<IReservation> | undefined;

if(!Reservation) {

const ReservationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickupDateTime: { type: Date, required: true },
    returnDateTime: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    returnLocation: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    comments: { type: String, required: false },
    status: { type: String, required: true, enum: ["available", "reserved", "rented", "returned"] },
    name: { type: String, required: false },
    driverlicense: { type: String, required: true },
    creditcard: { type: String, required: false },
    damageReported: { type: Boolean, required: false },

}, { timestamps: true }); // Enable automatic timestamping  of createdAt and updatedAt fields
    Reservation = mongoose.model<IReservation>("Reservation", ReservationSchema);
}

export default Reservation;
export type { IReservation };
