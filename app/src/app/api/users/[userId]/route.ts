// src/app/api/users/[userId]/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { middleware } from '../../../../../middleware';
import { IUser } from '@/models/User';
import { getUserById, updateUser, getAllUsers } from "@/utils/db"; // Adjust the import path as necessary

export async function GET(req: NextApiRequest, { params }: any, res: NextApiResponse) {
    const { userId } = params;
    const result = await getUserById(userId as string);
    console.log(result);
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        return NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}

// Define the type for the request object
interface RequestWithParams extends Request {
    params: {
        id: string;
    };
}

// Define the type for the updated user data
interface UpdatedUserData {
    [key: string]: any;
}

// Define the type for the response structure
interface UpdateResponse {
    success: boolean;
    error?: string;
}

export async function PUT(request: Request) {
    console.log(request);

    // Parse the request body to get the updated user data
    const updatedUserData: UpdatedUserData = await request.json();
    console.log(updatedUserData);
    const updateFields: Partial<IUser> = {
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
        email: updatedUserData.email,
        password: updatedUserData.password,
    };
    const id = updatedUserData.id;

    // Example: Update the user data in your database or external API
    // Replace this with your actual update logic
    const result = await updateUser(id, updateFields);
    
    console.log(result);

    // Return a response indicating success or failure
    if (result.success) {
        const result = await getAllUsers();
        console.log(result);
        return NextResponse.json({ message: 'User updated successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to update user', error: result.error }, { status: 500 });
    }
}
