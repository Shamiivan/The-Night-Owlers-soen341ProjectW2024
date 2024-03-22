import mongoose, { Document, Schema } from "mongoose";

interface IReservation extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    pickupDate: Date;
    returnDate: Date;
    pickupTime: string;
    returnTime: string;
    pickupLocation: string;
    returnLocation: string;
    comments: string;
    status: "available" | "reserved" | "rented" | "returned";
    name: string;
    driverlicense: string;
    creditcard: string;
    damageReported: boolean;
    rentalName: string;
    rentalDate: Date;
    renterName: string;
    renterDate: Date;
    rentalCompanySignature: String;
    renterSignature: String;
}
let Reservation: mongoose.Model<IReservation> | undefined = mongoose.models.Reservation as mongoose.Model<IReservation> | undefined;

if(!Reservation) {

const ReservationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    returnDate: { type: Date, required: true },
    returnTime: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    returnLocation: { type: String, required: true },
    comments: { type: String, required: false },
    status: { type: String, required: true, enum: ["available", "reserved", "rented", "returned"] },
    name: { type: String, required: false },
    driverlicense: { type: String, required: true },
    creditcard: { type: String, required: false },
    damageReported: { type: Boolean, required: false },
    rentalName: { type: String, required: false },
    rentalDate: { type: Date, required: false },
    renterName: { type: String, required: false },
    renterDate: { type: Date, required: false },
    rentalCompanySignature: { type: String, required: false },
    renterSignature: { type: String, required: false },

}, { timestamps: true }); // Enable automatic timestamping  of createdAt and updatedAt fields
    Reservation = mongoose.model<IReservation>("Reservation", ReservationSchema);
}

console.log("Reservation model:", Reservation.name);
export default Reservation;
export type { IReservation };