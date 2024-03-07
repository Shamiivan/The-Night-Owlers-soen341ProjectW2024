// Import necessary modules
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import User, { IUser } from '@/models/User';
import Reservation from '@/models/Reservation';


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
        if(!mongoose.connection.readyState){
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        }
    });

}

/**
 * Closes the database connection.
 * This function attempts to close the connection to the MongoDB database
 * and logs any errors that occur during the process.
 */
export async function closeDatabaseConnection() {
    try {
        // Close the database connection
        await mongoose.connection.close();
        // Log a message indicating the connection has been closed
        console.log("Closed the database connection");
    } catch (error) {
        // Log any errors that occur during the connection closure
        console.error(error);
    }
}

/**
 * Creates a new user in the database.
 * This function takes the user's first name, last name, password, email, and role
 * as parameters, creates a new user document, and saves it to the database.
 * @param firstName - The user's first name.
 * @param lastName - The user's last name.
 * @param password - The user's password.
 * @param email - The user's email address.
 * @param role - The user's role, either "customer" or "admin".
 * @returns A promise that resolves with the created user document.
 */
export async function createUser(firstName: string, lastName: string, password: string, email: string, role: "customer" | "admin") {
    return executeAsync(async () => {
        await connectToDatabase();
        // Create a new user document with the provided details
        const newUser = new (User as mongoose.Model<IUser>)({ firstName, lastName, password, email, role });
        // Save the new user document to the database
        const result = await newUser.save();
        // Log the result of the user creation
        return result;
    });
}

/**
 * Retrieves a single user document by its ID.
 * @param id - The ID of the user document to retrieve.
 * @returns A promise that resolves with the user document or null if not found.
 */
export async function getUserById(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for the user document with the specified ID
        const user = await User?.findById(id);
        // Log the result of the query
        return user;
    });
}

/**
 * Retrieves all user documents from the database.
 * @returns A promise that resolves with an array of user documents.
 */
export async function getAllUsers() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for all user documents
        const users = await User?.find({});
        return users;
    });
}

