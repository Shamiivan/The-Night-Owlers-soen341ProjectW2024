// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { addVehicle } from '@/utils/vehicleRepository';
import { IVehicle } from '@/models/Vehicle';

// export async function GET() {
//     const result = await getAllUsers();
//     console.log(result);
//     if (result.success) {
//         return NextResponse.json({ success: true, value: result.value });
//     } else if (result.error) {
//         return NextResponse.json({ success: false, error: result.error.message });
//     } else {
//         // Handle unsupported methods or other conditions
//         return  NextResponse.json({ success: false, error: 'Method not allowed' });
//     }
// }

/*
// POST function to create a new vehicle
export async function POST(request: Request) {
    const {
        brand,
        imageUrl,
        vehicleModel,
        category,
        year,
        automatic,
        nPeople,
        nBags,
        color,
        fuelType,
        engineCapacity,
        rentalPrice,
        mileage,
        description
    } = await request.json();

    const vehicle: IVehicle = {
        brand,
        imageUrl,
        category, 
        vehicleModel,
        year,
        automatic,
        nPeople,
        nBags,
        color,
        fuelType,
        engineCapacity,
        rentalPrice,
        mileage,
        description
    };
    const result = await addVehicle(vehicle);
    console.log(result)
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User created successfully', value: result.value });
    } else {
        return NextResponse.json({ message: 'Failed to create user', error: result.error }, { status: 500 });
    }
}
*/



// src/app/api/users/[userId]/route.ts




import { getAllVehicle, createVehicle, deleteVehicle, updateVehicle,getVehicleById } from "@/utils/vehicleRepository"; // Adjust the import path as necessary

export async function GET(req: NextApiRequest, { params }: any, res: NextApiResponse) {
    const {vehicleId } = params;
    const result = await getVehicleById(vehicleId as string);
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
    const updateFields: Partial<IVehicle> = {
        brand: updatedUserData.brand,
        rentalPrice: updatedUserData.rentalPrice,
        description: updatedUserData.description,
        
    };
    const id = updatedUserData.id;

    // Example: Update the user data in your database or external API
    // Replace this with your actual update logic
    const result = await updateVehicle(id, updateFields);

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

    const result = await deleteVehicle(body._id);
    console.log(result);

    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User deleted successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to delete user', error: result.error }, { status: 500 });
    }
}
// pages/api/users/index.ts





// POST function to create a new user
export async function POST(request: Request) {
    // Parse the request body to get the new user data
    const {name,brand,description  }= await request.json();
   
    const result = await createVehicle(name,brand,description);
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'User created successfully', value: result.value });
    } else {
        return NextResponse.json({ message: 'Failed to create user', error: result.error }, { status: 500 });
    }
}
