import mongoose, { Document, Schema } from "mongoose";
interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  pickupLocation: string;
  pickupDate: Date;
  returnDate: Date;
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
