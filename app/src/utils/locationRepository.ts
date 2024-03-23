import mongoose from "mongoose";
import executeAsync from "@/utils/Result";
import dotenv from "dotenv";
import Location, { ILocation } from "@/models/location";
import { connectToDatabase } from "@/utils/connectDb";
import exp from "constants";



/* Add a Location in the database.
 * This function takes the in an inital information about th eLocation and saves it to the database.
 * @param LocationInfo - An object containing the updated Location details.
 */

export async function addLocation(name:string) {
  return executeAsync(async () => {
    await connectToDatabase();
    // add the Location to the database
    const location = new (Location as mongoose.Model<ILocation>)({
        name 
    });
    const result = await location.save();
    // Log the result of the update
    return result;
  });
}

/** Search databese to see if location exists in the database
 * @param name - The name of the location to search for.
 * @returns A promise that resolves with the location document.
 */
export async function getLocationByName(name: string) {
  return executeAsync(async () => {
    await connectToDatabase();
    // Query the database for the location document
    const location = await Location?.findOne({ name: name });
    return location;
  });
}
