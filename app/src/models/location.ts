import mongoose, { Document, Schema } from "mongoose";

interface ILocation extends Document {
    name: string;
    address: string;
    city: string;
    country: string;
    typeOfLocation : "city" | "airport" | "train station";
    postalCode: string;
    latitude: number | null;
    longitude: number |null;
    phone: string;
    email: string;
    operatingHours: {
        open: string;
        close: string;
    };
}

let Location: mongoose.Model<ILocation> | undefined = mongoose.models.Location as mongoose.Model<ILocation> | undefined;

if (!Location) {
    const LocationSchema = new Schema<ILocation>({
        name: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country :{ type: String, required: true },
        typeOfLocation: { type: String, required: true, enum: ["city", "airport", "train station"] },
        postalCode: { type: String, required: true },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        operatingHours: {
            open: { type: String, required: false, default: "09:00 PM"},
            close: { type: String, required: false, default: "05:00 PM"},
        },
    }, { timestamps: true });

    Location = mongoose.model<ILocation>('Location', LocationSchema);
}

export default Location;
export type { ILocation };
