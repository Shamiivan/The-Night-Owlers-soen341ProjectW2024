import mongoose from "mongoose";
import executeAsync from "@/utils/Result";
import dotenv from "dotenv";
import Reservation, { IReservation } from "@/models/Reservation";
import printError from "@/utils/print";
import { connectToDatabase } from "@/utils/connectDb";
import exp from "constants";

/** 
 * Creates a new reservation in the database.
 * This function takes the user's
 *  phone number, car color, 
 * pickup date, pickup time, 
 * return date, return time, 
 * comments, 
 * user ID, 
 * and vehicle ID as parameters, 
 * creates a new reservation document, and saves it to the database.
 * @param phone - The user's phone number.
 * @param color - The color of the car to reserve.
 * @param pickupDate - The date the car will be picked up.
 * @param pickupTime - The time the car will be picked up.
 * @param returnDate - The date the car will be returned.
 * @param returnTime - The time the car will be returned.
 * @param comments - Additional comments or requests.
 * @param userId - The ID of the user making the reservation.
 * @param vehicleId - The ID of the vehicle being reserved.
 */

export async function createReservation(
    pickupDate: string,
    pickupTime: string,
    returnDate: string,
    returnTime: string,
    comments: string,
    userId: string,
    vehicleId: string
) {
    return executeAsync(async () => {
        console.log("Creating reservation");
        await connectToDatabase();
        const userIdObj = new mongoose.Types.ObjectId(userId);
        const vehicleIdString = vehicleId.vehicleId;
        const vehicleIdObj = new mongoose.Types.ObjectId(vehicleIdString);
        console.log(userIdObj);
        console.log(vehicleIdObj);
        
        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
        const returnDateTime = new Date(`${returnDate}T${returnTime}`);

        console.log(pickupDateTime);
        console.log(returnDateTime);
        // Create a new reservation document with the provided details
        const newReservation = new (Reservation as mongoose.Model<IReservation>)({
            userId: userIdObj,
            vehicleId: vehicleIdObj,
            pickupDate: pickupDateTime,
            pickupTime: pickupDateTime,
            returnDate: returnDateTime,
            returnTime: returnDateTime,
            comments,
            status: "reserved",

        });
        // Save the new reservation document to the database
        const result = await newReservation.save();
        printError(result);
        // Log the result of the reservation creation
        return result;
    });
}

/**
 * Retrieves all reservations from the database.
 * This function retrieves all reservation documents from the database and returns them as an array.
 */

export async function getAllReservations() {
    return executeAsync(async () => {
        await connectToDatabase();
        // Retrieve all reservation documents from the database
        const result = await Reservation?.find();
        // Log the result of the retrieval
        return result;
    });
}

/**
 * Retrieves a reservation by its ID.
 * This function takes a reservation ID as a parameter, retrieves the corresponding reservation document from the database, and returns it.
 * @param id - The ID of the reservation to retrieve.
 */

export async function getReservationById(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Retrieve the reservation document with the specified ID from the database
        const result = await Reservation?.findById(id);
        // Log the result of the retrieval
        return result;
    });

}

/**
 * Updates a reservation in the database.
 * This function takes a reservation ID and an object containing the new reservation details as parameters, updates the corresponding reservation document in the database, and returns the updated document.
 * @param id - The ID of the reservation to update.
 * @param updatedReservation - An object containing the updated reservation details.
 */

export async function updateReservation(id: string, updatedReservation: Partial<IReservation>) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Update the reservation document with the specified ID using the provided details
        const result = await Reservation?.findByIdAndUpdate(id, updatedReservation, { new: true });
        // Log the result of the update
        return result;
    });
}

/**
 * Deletes a reservation from the database.
 * This function takes a reservation ID as a parameter, deletes the corresponding reservation document from the database, and returns the deleted document.
 * @param id - The ID of the reservation to delete.
 */

export async function deleteReservation(id: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Delete the reservation document with the specified ID from the database
        const result = await Reservation?.findByIdAndDelete(id);
        // Log the result of the deletion
        return result;
    });

}

export async function getReservationsByUserId(userId: string) {
    return executeAsync(async () => {
        await connectToDatabase();
        // Retrieve reservations with the specified userId from the database
        const reservations = await Reservation?.find({ userId: userId });
        // Log the result of the retrieval
        return reservations;
    });
}