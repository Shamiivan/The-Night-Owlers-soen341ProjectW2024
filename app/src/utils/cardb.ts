
import { MongoClient, ObjectId, WithId } from "mongodb";
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import User, { IUser } from '@/models/User';
import vehicle, {ICar} from '@/models/car';
// MongoDB URL
/**
 * Connects to the MongoDB database using Mongoose.
 * This function wraps the connection logic in an asynchronous operation
 * and handles any errors that might occur during the connection process.
 * @returns A promise that resolves when the connection is successful.
 */
dotenv.config();
const url = 'mongodb+srv://nightOwlers:soen341@car-rental.kwm8q1v.mongodb.net/'
const uri = process.env.MONGODB_URI as string;
const dbName = 'test';

const client = new MongoClient(url);

export async function connectToDatabase() {
    return executeAsync(async () => {
        console.log('connectted successfullly');
        // Connect to MongoDB with specified options
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
    });
    
}

export async function connectDB() {
    try {
        await client.connect();
        console.log("connectted to the dataabse successfully");
        return client.db(dbName);
    } catch (error) {
        console.error("failed to coneected the database ", error);
        process.exit(1);
    }
}
/**
 * Creates a new user in the database.
 * This function takes the user's first name, last name, password, email, and role
 * as parameters, creates a new user document, and saves it to the database.
 * @param name
 * @param price
 * @param escription
 * @param automatic
 * @param npeople
 *  * @param nbags
 *  * @param buttontext
 *  * @param  gasoline

 * @returns A promise that resolves with the created user document.
 */

export async function create_Item(item: { name: string }) {
    const db = await connectDB();
    const collection = db.collection('items');
    const result = await collection.insertOne(item);
    console.log(`ID you want to add: ${result.insertedId}`);
}


/**
 * Retrieves a single user document by its ID.
 * @param id - The ID of the user document to retrieve.
 * @returns A promise that resolves with the user document or null if not found.
 */
export async function readItem(id: string) {
   const db = await connectDB();
    const collection = db.collection('car');
    const itemm = await collection.findOne({ _id: new ObjectId(id) });

    try {
      //  const db = await connectDB();
       // const collection = db.collection('car');
       // const item = await collection.findOne({ _id: new ObjectId(id) });
        if (itemm !== null) {
            console.log(itemm.name);
            const namee=itemm.name;
          }
    
          
          return itemm;
    } catch (error) {
        console.error("Error:", error);
        
    }
};


export async function readAllcars() {
    const db = await connectDB();
    const collection = db.collection('car');
    const cursor = collection.find({}); 

    try {
        console.log(cursor);
        await cursor.forEach(item => console.log(item)); 
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * Retrieves all user documents from the database.
 * @returns A promise that resolves with an array of user documents.
 */
export async function getallcars() {
    return executeAsync(async () => {
        await connectToDatabase();
        
        console.log('very very good');
        // Query the database for all user documents
        const vehicles = await vehicle?.find({});
        // Log the result of the query
        console.log(vehicles);
        return vehicles;
    });
}


//11
   
export async function fetchAllUsers() {
    try {
        await connectToDatabase();
      const users = await vehicle?.find({});
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  }
      

/*
export async function getcarById(id: string) {
    return executeAsync(async () => {
        const db = await connectDB();
        const collection = db.collection('car');
        // Query the database for the user document with the specified ID
        const user = await User?.findById(id);
        console.log(user);
          console.log("get car work");
        // Log the result of the query
        return user;
    });
}
*/


export async function updateItem(id: string, name: string) {
    const db = await connectDB();
    const collection = db.collection('items');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    console.log(`Data you want to renew: ${result.modifiedCount}`);
}


export async function deleteItem(id: string) {
    const db = await connectDB();
    const collection = db.collection('items');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(`data u want to delete: ${result.deletedCount}`);
}



