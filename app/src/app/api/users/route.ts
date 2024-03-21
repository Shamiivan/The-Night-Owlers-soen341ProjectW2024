// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, createUser } from "@/utils/userRepository";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";

export async function GET() {
    const result = await getAllUsers();

    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return  NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}


// POST function to create a new user
export async function POST(request: Request) {
    // Parse the request body to get the new user data
    const {firstName, lastName, email, password, address, phone  }= await request.json();

    const result = await createUser(firstName, lastName, email, password, address, phone, "customer");
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User created successfully', value: result.value });
    } else {
        return NextResponse.json({ message: 'Failed to create user', error: result.error }, { status: 500 });
    }
}
