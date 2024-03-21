// src/app/api/users/[userId]/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { middleware } from '../../../../../middleware';
import { IUser } from '@/models/user';

import { getUserById, updateUser, getAllUsers, deleteUser, createUser } from "@/utils/userRepository"; // Adjust the import path as necessary

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



interface UpdatedUserData {
    [key: string]: any;
}


export async function PUT(request: Request) {
    console.log(request);
    // Parse the request body to get the updated user data
    const updatedUserData: UpdatedUserData = await request.json();
    console.log("UPDATED ", updatedUserData);
    const updateFields: Partial<IUser> = {
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
        email: updatedUserData.email,
        password: updatedUserData.password,
        address: updatedUserData.address,
        phone: updatedUserData.phone,
        role: updatedUserData.role,
    };
    const id = updatedUserData.id;

    // Example: Update the user data in your database or external API
    // Replace this with your actual update logic
    const result = await updateUser(id, updateFields);

    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User updated successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to update user', error: result.error }, { status: 500 });
    }
}

// DELETE function to delete a user by their ID
export async function DELETE(request: Request) {
    const body = await request.json();
    console.log(body._id);

    const result = await deleteUser(body._id);
    console.log(result);

    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User deleted successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to delete user', error: result.error }, { status: 500 });
    }
}
