import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import Location, { ILocation } from "@/models/location";
import printError from '@/utils/print';
import {connectToDatabase} from '@/utils/connectDb';

/**
 * Creates a new location in the database.
 * This function takes the location's details as parameters, creates a new location document,
 * and saves it to the database.
 * @param name - The name of the location.
 * @param address - The address of the location.
 * @param city - The city of the location.
 * @param state - The state of the location.
 * @param typeOfLocation - The type of the location (city, airport, train station).
 * @param postalCode - The postal code of the location.
 * @param country - The country of the location.
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @param phone - The phone number of the location.
 * @param email - The email address of the location.
 * @param operatingHours - The operating hours of the location.
 * @param services - The services offered by the location.
 * @param description - A description of the location.
 * @returns A promise that resolves with the created location document.
 */
export async function createLocation(name: string, address: string, city: string, state: string, typeOfLocation: "city" | "airport" | "train station", postalCode: string, country: string, latitude: number, longitude: number, phone: string, email: string, operatingHours: { open: string, close: string }, services: string[], description: string) {
  return executeAsync(async () => {
      await connectToDatabase();
      // Create a new location document with the provided details
      const newLocation = new (Location as mongoose.Model<ILocation>)({ name, address, city, state, typeOfLocation, postalCode, country, latitude, longitude, phone, email, operatingHours, services, description });
      // Save the new location document to the database
      const result = await newLocation.save();
      // Log the result of the location creation
      return result;
  });
}


/**
 * Retrieves a single location document by its ID.
 * @param id - The ID of the location document to retrieve.
 * @returns A promise that resolves with the location document or null if not found.
 */
export async function getLocationById(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for the location document with the specified ID
        const location = await Location?.findById(id);
        // Log the result of the query
        return location;
    });
}

/**
 * Retrieves all location documents from the database.
 * @returns A promise that resolves with an array of location documents.
 */
export async function getAllLocations() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for all location documents
        const locations = await Location?.find({});
        return locations;
    });
}

/**
 * Updates a location document in the database.
 * This function takes the location's ID and an object containing the fields to be updated
 * as parameters, finds the location document by its ID, updates the specified fields,
 * and saves the updated document back to the database.
 * @param id - The ID of the location document to update.
 * @param updateFields - An object containing the fields to be updated.
 * @returns A promise that resolves with the updated location document or null if not found.
 */
export async function updateLocation(id: string, updateFields: Partial<ILocation>) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the location document by its ID and update the specified fields
        const updatedLocation = await Location?.findByIdAndUpdate(id, updateFields, { new: true });
        // Log the result of the update operation
        printError(updatedLocation);
        return updatedLocation;
    });
}

/**
 * Deletes a location document from the database.
 * This function takes the location's ID as a parameter, finds the location document by its ID,
 * and deletes it from the database.
 * @param id - The ID of the location document to delete.
 * @returns A promise that resolves with the result of the deletion operation.
 */
export async function deleteLocation(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the location document by its ID and delete it
        const result = await Location?.findByIdAndDelete(id);
        // Log the result of the deletion operation
        console.log(`Deleted location with ID: ${id}`);
        return result;
    });
}

export async function countLocations() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Count all location documents in the database
        const totalLocations = await Location?.countDocuments({});
        // Log the total count of locations
        console.log(`Total number of locations: ${totalLocations}`);
        return totalLocations;
    });
}
