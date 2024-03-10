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
/**
 * Retrieves all user documents from the database.
 * @returns A promise that resolves with an array of user documents.
 */
export async function getAllVehicle() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for all user documents
        const vehicles = await Vehicle?.find({});
        console.log(vehicles);
        
        return vehicles;
    });
}

export async function getAllVehiclePara() {
    return executeAsync(async () => {
        try {
            await connectToDatabase();
          
        
            const count = await Vehicle?.countDocuments({});
            //console.log('length is'+aa);
            
            const vehiclee = await Vehicle?.find({}, { brand: 1, rentalPrice:1 });
            const pricesArray =vehiclee?.map(vehicle => vehicle.rentalPrice);
           
       
            if (vehiclee) {
                return pricesArray
              

            } else {
                console.log("No vehicle found."); 
            }
        } catch (error) {
          
            //console.error("An error occurred:", error.message);
        }
    });
}


export async function getNumVehicle() {
    return executeAsync(async () => {
        await connectToDatabase();
        const count = await Vehicle?.countDocuments({});
        console.log(`Total number of vehicles: ${count}`);;
        
        return count;
    });
}


export async function fetchVehicleData() {
    try {
        const vehicleArray = await Vehicle?.find({}, { brand: 1, rentalPrice: 1 });
        const brandArray = vehicleArray?.map(doc => doc.brand);
        const rentalPriceArray = vehicleArray?.map(doc => doc.rentalPrice);
        console.log("function"+brandArray);
        return { brandArray, rentalPriceArray }; 
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        return { brandArray: [], rentalPriceArray: [] }; 
    }
}

 
/**
 * Creates a new user in the database.
 * This function takes the user's first name, last name, password, email, and role
 * as parameters, creates a new user document, and saves it to the database.
 * @param brand - The user's first name.
 * @param rentalPrice - The user's last name.
 * @param description- The user's password.

 */
export async function createVehicle(brand: string, rentalPrice :number ,  description: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Create a new user document with the provided details
        const newUser = new (Vehicle as mongoose.Model<IVehicle>)({ brand,rentalPrice,description });
        // Save the new user document to the database
        const result = await newUser.save();
        // Log the result of the user creation
        return result;
    });
}


/**
 * Deletes a user document from the database.
 * This function takes the user's ID as a parameter, finds the user document by its ID,
 * and deletes it from the database.
 * @param id - The ID of the user document to delete.
 * @returns A promise that resolves with the result of the deletion operation.
 */
export async function deleteVehicle(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the user document by its ID and delete it
        const result = await Vehicle?.findByIdAndDelete(id);
        // Log the result of the deletion operation
        console.log(`Deleted user with ID: ${id}`);
        return result;
    });
}
/**
 * Updates a user document in the database.
 * This function takes the user's ID and an object containing the fields to be updated
 * as parameters, finds the user document by its ID, updates the specified fields,
 * and saves the updated document back to the database.
 * @param id - The ID of the user document to update.
 * @param updateFields - An object containing the fields to be updated.
 * @returns A promise that resolves with the updated user document or null if not found.
 */
export async function updateVehicle(id: string, updateFields: Partial<IVehicle>) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the user document by its ID and update the specified fields
        const updatedUser = await Vehicle?.findByIdAndUpdate(id, updateFields, { new: true });
        // Log the result of the update operation
        printError(updatedUser);
        return updatedUser;
    });
}
/**
 * Retrieves a single user document by its ID.
 * @param id - The ID of the user document to retrieve.
 * @returns A promise that resolves with the user document or null if not found.
 */
export async function getVehicleById(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for the user document with the specified ID
        const user = await Vehicle?.findById(id);
        // Log the result of the query
        return user;
    });
}
