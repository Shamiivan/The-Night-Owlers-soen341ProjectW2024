import mongoose, { Document, Schema } from "mongoose";

interface ILocation extends Document {
    name: string;
    address: string;
    city: string;
    state: string;
    typeOfLocation : "city" | "airport" | "train station";
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    operatingHours: {
        open: string;
        close: string;
    };
    services: string[];
    description: string;
}

let Location: mongoose.Model<ILocation> | undefined = mongoose.models.Location as mongoose.Model<ILocation> | undefined;

if (!Location) {
    const LocationSchema = new Schema<ILocation>({
        name: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        typeOfLocation: { type: String, required: true, enum: ["city", "airport", "train station"] },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        operatingHours: {
            open: { type: String, required: true },
            close: { type: String, required: true },
        },
        services: [{ type: String }],
        description: { type: String, required: false },
    }, { timestamps: true }); // Enable automatic timestamping of createdAt and updatedAt fields

    Location = mongoose.model<ILocation>('Location', LocationSchema);
}

export default Location;
export type { ILocation };
