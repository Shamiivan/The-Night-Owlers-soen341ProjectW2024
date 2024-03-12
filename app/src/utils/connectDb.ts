// Import necessary modules
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
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