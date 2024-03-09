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