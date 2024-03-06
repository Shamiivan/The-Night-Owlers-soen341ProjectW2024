import exp from "constants";
import mongoose, {Document, Schema} from "mongoose";

interface IVehicle extends Document {
    brand: string;
    carModel: string;
    year: number;
    transmissionType: string;
    color: string;
    fuelType: string;
    engineCapacity: number;
    totalDoors: number;
    rentalPrice: number;
    mileage: number;
    status: "available" | "reserved" | "rented";
}

let Vehicle: mongoose.Model<IVehicle> | undefined = mongoose.models.Vehicle as mongoose.Model<IVehicle> | undefined;

if (!Vehicle) {
    const VehicleSchema = new Schema({
        brand: { type: String, required: true },
        carModel: { type: String, required: true },
        year: { type: Number, required: true },
        transmissionType: { type: String, required: true },
        color: { type: String, required: true },
        fuelType: { type: String, required: true },
        engineCapacity: { type: Number, required: true },
        totalDoors: { type: Number, required: true },
        rentalPrice: { type: Number, required: true },
        mileage: { type: Number, required: true },
        status: { type: String, required: true, enum: ["available", "reserved", "rented"] },
    });
    Vehicle = mongoose.model<IVehicle>("Vehicle", VehicleSchema);
}
export default Vehicle;
export type { IVehicle };