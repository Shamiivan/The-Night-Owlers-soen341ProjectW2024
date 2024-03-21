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
 * Creates a new vehicle in the database.
 * This function takes various parameters to create a new vehicle document
 * and saves it to the database.
 * @param id - The unique identifier for the vehicle.
 * @param brand - The brand of the vehicle.
 * @param imageUrl - The URL of the image associated with the vehicle.
 * @param category - The category to which the vehicle belongs.
 * @param vehicleModel - The model of the vehicle.
 * @param year - The manufacturing year of the vehicle.
 * @param automatic - A boolean indicating whether the vehicle is automatic.
 * @param nPeople - The number of people the vehicle can accommodate.
 * @param nBags - The number of bags the vehicle can carry.
 * @param color - The color of the vehicle.
 * @param fuelType - The fuel type used by the vehicle.
 * @param engineCapacity - The engine capacity of the vehicle.
 * @param rentalPrice - The rental price of the vehicle.
 * @param mileage - The mileage of the vehicle.
 * @param description - Additional description or details about the vehicle.
 * @param licensePlate - The license plate of the vehicle.
 * @param VIN - The vehicle identification number.
 * @returns A promise that resolves with the created vehicle document.
 */
export async function createVehicle(
    brand: string,
    imageUrl: string,
    category: string,
    vehicleModel: string,
    year: number,
    automatic: boolean,
    nPeople: number,
    nBags: number,
    color: string,
    fuelType: string,
    engineCapacity: number,
    rentalPrice: number,
    mileage: number,
    description: string,
    licensePlate: string,
    VIN: string
    ){

    return executeAsync(async () => {
        await connectToDatabase();
        // Create a new user document with the provided details
        const newVehicle = new (Vehicle as mongoose.Model<IVehicle>)({
            brand,
            imageUrl,
            category,
            vehicleModel,
            year,
            automatic,
            nPeople,
            nBags,
            color,
            fuelType,
            engineCapacity,
            rentalPrice,
            mileage,
            description,
            licensePlate,
            VIN
        });
        // Save the new user document to the database
        const result = await newVehicle.save();
        // Log the result of the user creation
        return result;
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

/**
 * Retrieves all user documents from the database.
 * @returns A promise that resolves with an array of user documents.
 */
export async function getAllVehicles() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for all user documents
        const vehicles = await Vehicle?.find({});
        return vehicles;
    });
}

/**
 * Retrieves a vehicle document by its ID from the database.
 * @param id The ID of the vehicle to retrieve.
 * @returns A promise that resolves with the vehicle document.
 */

export async function getVehicleById(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for the vehicle document
        const vehicle = await Vehicle?.findById(id);
        return vehicle;
    });
}

/**
 * Updates a vehicle document in the database.
 * @param id The ID of the vehicle to update.
 * @param updateFields An object containing the fields to update and their new values.
 * @returns A promise that resolves with the updated vehicle document.
 */
export async function updateVehicle(id: string, updateFields: Partial<IVehicle>) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the vehicle document by its ID and update the specified fields
        const result = await Vehicle?.findByIdAndUpdate(id, updateFields, { new: true });
        return result;
    });
}

/**
 * Deletes a vehicle document from the database.
 * @param id The ID of the vehicle to delete.
 * @returns A promise that resolves with the deleted vehicle document.
 */
export async function deleteVehicle(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the vehicle document by its ID and delete it
        const result = await Vehicle?.findByIdAndDelete(id);
        return result;
    });
}

