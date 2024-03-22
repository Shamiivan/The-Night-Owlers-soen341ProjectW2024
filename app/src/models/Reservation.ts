import mongoose, { Document, Schema } from "mongoose";

interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  pickupDate: Date;
  returnDate: Date;
  comments: string;
  pickupLocation: string;

  status: "available" | "reserved" | "rented" | "returned" | null;
  driverlicense: string | null;
  creditcard: string | null;
  damageReported: boolean | null;
  rentalName: string | null;
  rentalDate: Date | null;
  renterName: string | null;
  renterDate: Date | null;
  rentalCompanySignature: string | null;
  renterSignature: string | null;
}

let Reservation: mongoose.Model<IReservation> | undefined = mongoose.models
  .Reservation as mongoose.Model<IReservation> | undefined;

if (!Reservation) {
  const ReservationSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      vehicleId: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
      },
      pickupDate: { type: Date, required: true },
      returnDate: { type: Date, required: true },
      pickupLocation: { type: String, required: true },
      comments: { type: String },
      status: {
        type: String,
        required: true,
        enum: ["available", "reserved", "rented", "returned"],
      },
      name: { type: String },
      driverlicense: { type: String },
      creditcard: { type: String },
      damageReported: { type: Boolean },
      rentalName: { type: String },
      rentalDate: { type: Date },
      renterName: { type: String },
      renterDate: { type: Date },
      rentalCompanySignature: { type: String },
      renterSignature: { type: String },
    },
    { timestamps: true },
  ); // Enable automatic timestamping  of createdAt and updatedAt fields
  Reservation = mongoose.model<IReservation>("Reservation", ReservationSchema);
}

export default Reservation;
export type { IReservation };
