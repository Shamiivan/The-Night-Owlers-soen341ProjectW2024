// Import necessary modules
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import Vehicle, { IVehicle } from '@/models/Vehicle';
import printError from '@/utils/print';


// Load environment variables from .env file
dotenv.config();
// Retrieve the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI as string;


/**
 * Connects to the MongoDB database using Mongoose.
 * This function wraps the connection logic in an asynchronous operation
 * and handles any errors that might occur during the connection process.
 * @returns A promise that resolves when the connection is successful.
 */
export async function connectToDatabase() {
    return executeAsync(async () => {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
            });
        }
    });

}

/**
 * Adds a new vehicle to the database.
 * @param vehicle The vehicle object to be added.
 * @returns A promise that resolves with the created vehicle document.
 */
export async function addVehicle(vehicle: IVehicle){
    return executeAsync(async () => {
        // Ensure the database connection is established
        await connectToDatabase();
        // Create a new vehicle document using the Vehicle model
        const newVehicle = new (Vehicle as mongoose.Model<IVehicle>) (vehicle);
        const result = await newVehicle.save();
        return result;
    });
}

