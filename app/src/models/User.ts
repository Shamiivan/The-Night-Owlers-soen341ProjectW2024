import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    role: "customer" | "admin";
}

const UserSchema = new Schema({ 
    username : { type: String, required: true },
    password : { type: String, required: true },
    email : { type: String, required: true },
    role : { type: String, required: true, enum: ["customer", "admin"] },
});
export default mongoose.model<IUser>("User ", UserSchema);