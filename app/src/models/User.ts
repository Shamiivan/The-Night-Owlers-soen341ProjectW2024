import mongoose, { Document, Schema } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    address: string;
    phone: string;
    role: "customer" | "admin";
}

// Check if the model is already compiled
let User: mongoose.Model<IUser> | undefined = mongoose.models.User as mongoose.Model<IUser> | undefined;

if (!User) {
    // Define the User schema
    const UserSchema = new Schema<IUser>({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        role: { type: String, required: true, enum: ["customer", "admin"] },
    });

    // Create the User model
    User = mongoose.model<IUser>('User', UserSchema);
}
console.log("User model:", User.name);
export default User;
export type { IUser };
