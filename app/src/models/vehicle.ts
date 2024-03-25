import mongoose, { Document, Schema } from "mongoose";

// Define the IVehicle interface
interface IVehicle extends Document {
    location : mongoose.Types.ObjectId;
    brand: string;
    imageUrl: string;
    category: string;
    vehicleModel: string;
    year: number;
    automatic: boolean;
    nPeople: number;
    nBags: number;
    color: string;
    fuelType: string;
    engineCapacity: number;
    rentalPrice: number;
    mileage: number;
    description:string;
    licensePlate: string;
    VIN: string;
}

// Check if the model is already compiled
let Vehicle: mongoose.Model<IVehicle> | undefined = mongoose.models.Vehicle as mongoose.Model<IVehicle> | undefined;

if (!Vehicle) {
    // Define the Vehicle schema
    const VehicleSchema = new Schema<IVehicle>({
        location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
        brand: { type: String, required: true },
        imageUrl: { type: String, required: false },
        category: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        year: { type: Number, required: true },
        automatic: { type: Boolean, required: true },
        nPeople: { type: Number, required: true },
        nBags: { type: Number, required: true },
        color: { type: String, required: true },
        fuelType: { type: String, required: true },
        engineCapacity: { type: Number, required: true },
        rentalPrice: { type: Number, required: true },
        mileage: { type: Number, required: true },
        description: { type: String, required: true },
        licensePlate: { type: String, required: true },
        VIN: { type: String, required: true },
    });

    // Create the Vehicle model
    Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
}

export default Vehicle;
export type { IVehicle };
