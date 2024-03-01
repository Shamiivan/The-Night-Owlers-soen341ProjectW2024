import mongoose, {Document, Schema} from "mongoose";

interface IReservation extends Document {
 userId: mongoose.Types.ObjectId; 
 vehicleId: mongoose.Types.ObjectId;
 pickupDate: Date;
 returnDate: Date;
 status :"available" | "reserved" | "rented" | "returned";
}

const ReservationSchema = new Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId : { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    pickupDate : { type: Date, required: true },
    returnDate : { type: Date, required: true },
    status : { type: String, required: true, enum: ["available", "reserved", "rented", "returned"] },
});
