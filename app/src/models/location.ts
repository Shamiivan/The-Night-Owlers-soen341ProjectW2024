import mongoose, { Document, Schema } from 'mongoose';

// Define the IVehicle interface
interface ILocation extends Document {
    id: string;
    name: string;
}

// Check if the model is already compiled
let Location: mongoose.Model<ILocation> | undefined = mongoose.models.Location as mongoose.Model<ILocation> | undefined;

if (!Location) {
    // Define the Location schema
    const LocationSchema = new Schema<ILocation>({
        name: { type: String, required: true },

    });

    // Create the Location model
    Location = mongoose.model<ILocation>('Location', LocationSchema);
}

export default Location
export type { ILocation};
