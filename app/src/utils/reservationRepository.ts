import mongoose from "mongoose";
import executeAsync from "@/utils/Result";
import dotenv from "dotenv";
import Reservation, { IReservation } from "@/models/reservation";
import printError from "@/utils/print";
import { connectToDatabase } from "@/utils/connectDb";
import User from "@/models/user";
import Vehicle from "@/models/vehicle";
import exp from "constants";

/**
 * Creates a new reservation in the database.
 * This function takes the user's
 *  phone number, car color, 
 * pickup date, pickup time, 
 * return date, return time, 
 * pickup location,
 * return location,
 * total price,
 * comments, 
 * name,
 * driver license number,
 * credit card number,
 * damage reported,
 * status,
 * user ID, 
 * and vehicle ID as parameters, 
 * creates a new reservation document, and saves it to the database.
 * @param phone - The user's phone number.
 * @param color - The color of the car to reserve.
 * @param pickupDate - The date the car will be picked up.
 * @param pickupTime - The time the car will be picked up.
 * @param returnDate - The date the car will be returned.
 * @param returnTime - The time the car will be returned.
 * @param pickupLocation - The pickup location.
 * @param returnLocation - The return location.
 * @param totalPrice - The total price of the reservation.
 * @param comments - Additional comments or requests.
 * @param name - The name of the user.
 * @param driverlicense - The driver's license number.
 * @param creditcard - The credit card number.
 * @param damageReported - A boolean indicating whether the damage was reported.
 * @param status - The status of the reservation.
 * @param userId - The ID of the user making the reservation.
 * @param vehicleId - The ID of the vehicle being reserved.
 */

/* Add a reservation in the database.
 * This function takes the in an inital information about th ereservation and saves it to the database.
 * @param reservationInfo - An object containing the updated reservation details.
 */

export async function addReservation(reservationInfo: Partial<IReservation>) {
  return executeAsync(async () => {
    await connectToDatabase();
    // add the reservation to the database
    const result = await Reservation?.create(reservationInfo);
    // Log the result of the update
    return result;
  });
}
export async function createReservation(
    userId: string,
    vehicleId: string,
    pickupDate: string,
    pickupTime: string,
    returnDate: string,
    returnTime: string,
    pickupLocation: string,
    returnLocation: string,
    totalPrice: number,
    comments: string,
    name: string,
    driverlicense: string,
    creditcard: string,
    damageReported: boolean,
    status: "reserved",
    pdfData: string
) {
  return executeAsync(async () => {
    console.log("Creating reservation");
    await connectToDatabase();
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const vehicleIdObj = new mongoose.Types.ObjectId(vehicleId);
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
        pickupDateTime: pickupDateTime,
        returnDateTime: returnDateTime,
        pickupLocation,
        returnLocation,
        totalPrice,
        comments,
        name,
        driverlicense,
        creditcard,
        damageReported,
        status,
        pdfData

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
    await User?.init();
    await Vehicle?.init();
    // Retrieve all reservation documents from the database
    const result = await Reservation?.find()
    .populate('userId')
    .populate('vehicleId')
    .exec();
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

export async function updateReservation(
  id: string,
  updatedReservation: Partial<IReservation>,
) {
  return executeAsync(async () => {
    await connectToDatabase();
    // Update the reservation document with the specified ID using the provided details
    const result = await Reservation?.findByIdAndUpdate(
      id,
      updatedReservation,
      { new: true },
    );
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


/**
 * Retrieves all reservations for a given user ID.
 * @param userId The ID of the user whose reservations to retrieve.
 * @returns An array of Reservation objects, representing the user's reservations.
 */
export async function getReservationsByUserId(userId: string) {
  return executeAsync(async () => {
    await connectToDatabase();
    const idObj = new mongoose.Types.ObjectId(userId);
    await User?.init();
    await Vehicle?.init();


    // Retrieve reservations with the specified userId from the database
    const reservations = await Reservation?.find({ userId: idObj })
    .populate('userId')
    .populate('vehicleId')
    .exec();
    // Log the result of the retrieval
    return reservations;
  });
}


