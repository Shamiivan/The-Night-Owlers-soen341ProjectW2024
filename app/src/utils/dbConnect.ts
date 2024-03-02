import mongoose from 'mongoose';
import  executeAsync  from '@/utils/Result';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI as string;
console.log(uri);



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
 serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
 }
});


/**
 * Connects to the MongoDB database using the Mongoose library.
 * @returns A Promise that resolves to the Mongoose connection object.
 */

export async function connectToDatabase() {
    return executeAsync(async () => {
        await client.connect();
        return client;
    });
}

export async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log("Closed the database connection");
    } catch (error) {
        console.error(error);
    }
}
