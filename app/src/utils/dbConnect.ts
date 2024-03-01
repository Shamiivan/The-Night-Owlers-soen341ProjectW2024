import mongoose from 'mongoose';


import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://nightOwlers:<password>@car-rental.kwm8q1v.mongodb.net/?retryWrites=true&w=majority&appName=car-rental";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
 serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
 }
});

export async function connectToDatabase() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected to the database");
        return client;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log("Closed the database connection");
    } catch (error) {
        console.error(error);
    }
}
