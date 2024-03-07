
import { MongoClient, ObjectId, WithId } from "mongodb";
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import User, { IUser } from '@/models/User';
// MongoDB URL
const url = 'mongodb+srv://nightOwlers:soen341@car-rental.kwm8q1v.mongodb.net/'

const dbName = 'test';

const client = new MongoClient(url);

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


export async function create_Item(item: { name: string }) {
    const db = await connectDB();
    const collection = db.collection('items');
    const result = await collection.insertOne(item);
    console.log(`ID you want to add: ${result.insertedId}`);
}



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


//11
   
    

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



