import mongoose, { Document, Schema } from 'mongoose';

// Define the IVehicle interface
interface IVehicle extends Document {
    brand: string;
    vehicleModel: string;
    year: number;
    transmissionType: {
        automatic: boolean;
        nPeople: number;
        nBags: number;
    };
    color: string;
    fuelType: string;
    engineCapacity: number;
    totalDoors: number;
    rentalPrice: number;
    mileage: number;
}

// Check if the model is already compiled
let Vehicle: mongoose.Model<IVehicle> | undefined = mongoose.models.Vehicle as mongoose.Model<IVehicle> | undefined;

if (!Vehicle) {
    // Define the Vehicle schema
    const VehicleSchema = new Schema<IVehicle>({
        brand: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        year: { type: Number, required: true },
        transmissionType: {
            automatic: { type: Boolean, required: true },
            nPeople: { type: Number, required: true },
            nBags: { type: Number, required: true },
        },
        color: { type: String, required: true },
        fuelType: { type: String, required: true },
        engineCapacity: { type: Number, required: true },
        totalDoors: { type: Number, required: true },
        rentalPrice: { type: Number, required: true },
        mileage: { type: Number, required: true },
    });

    // Create the Vehicle model
    Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
}

console.log("Vehicle model:", Vehicle.name);
export default Vehicle;
export type { IVehicle };
