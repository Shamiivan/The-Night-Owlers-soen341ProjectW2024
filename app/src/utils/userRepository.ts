import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import User, { IUser } from "@/models/user";
import printError from '@/utils/print';
import {connectToDatabase} from '@/utils/connectDb';
import exp from 'constants';


/**
 * Creates a new user in the database.
 * This function takes the user's first name, last name, password, email and role
 * as parameters, creates a new user document, and saves it to the database.
 * @param firstName - The user's first name.
 * @param lastName - The user's last name.
 * @param password - The user's password.
 * @param email - The user's email address.
 * @param address - The user's address.
 * @param phone - The user's phone number.
 * @param role - The user's role, either "customer" or "admin".
 * @returns A promise that resolves with the created user document.
 */
export async function createUser(firstName: string, lastName: string,  email: string, password: string, address: string, phone: string, role: "customer" | "admin") {
    return executeAsync(async () => {
        await connectToDatabase();
        // Create a new user document with the provided details
        const newUser = new (User as mongoose.Model<IUser>)({ firstName, lastName, password, email, address, phone, role });
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

/**
 * Retrieves a single user document by its email address.
 * @param email - The email address of the user document to retrieve.
 * @returns A promise that resolves with the user document or null if not found.
 */
export async function getUserByEmail(email: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Query the database for the user document with the specified email address
        const user = await User?.findOne({ email });
        // Log the result of the query
        return user;
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
export async function updateUser(id: string, updateFields: Partial<IUser>) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the user document by its ID and update the specified fields
        const updatedUser = await User?.findByIdAndUpdate(id, updateFields, { new: true });
        // Log the result of the update operation
        printError(updatedUser);
        return updatedUser;
    });
}

/**
 * Deletes a user document from the database.
 * This function takes the user's ID as a parameter, finds the user document by its ID,
 * and deletes it from the database.
 * @param id - The ID of the user document to delete.
 * @returns A promise that resolves with the result of the deletion operation.
 */
export async function deleteUser(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Find the user document by its ID and delete it
        const result = await User?.findByIdAndDelete(id);
        // Log the result of the deletion operation
        console.log(`Deleted user with ID: ${id}`);
        return result;
    });
}

export async function countUsers() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Count all user documents in the database
        const totalUsers = await User?.countDocuments({});
        // Log the total count of users
        console.log(`Total number of users: ${totalUsers}`);
        return totalUsers;
    });
}