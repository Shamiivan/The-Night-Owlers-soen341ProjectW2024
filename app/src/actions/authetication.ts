'use server'
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectDb";
import { redirect } from "next/dist/server/api-utils";
import { Redirect } from "next";
export async function autheticateUser(
    prevState: {
        message: string;
    },
    formData: FormData,
) {

    const email = formData.get('email');
    const password = formData.get('password');

    await connectToDatabase();
    const user = await User?.findOne({ email : email });
    console.log(user);
    let message:string = "";
    if (user) {
        if(user.password === password) {

           message = "User authenticated successfully";
        } else {
            message = "Invalid password";
        }
    }else {
        message = "User not found";
    }

    return {message : message};
}



/**
 * Authenticates a user by checking their email and password against the database.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves with the user document if authentication is successful, or null if authentication fails.
 */
export async function authenticate(email: string, password: string) {
    await connectToDatabase();
   
    // Find the user document by email
    const user = await User?.findOne({ email });
   
    if (!user) {
       // User not found
       return null;
    }
   
    // Compare the provided password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = user.password === password;
   
    if (!isMatch) {
       // Password does not match
       return null;
    }
   
    // Password matches, return the user document
    return user;
   }
   