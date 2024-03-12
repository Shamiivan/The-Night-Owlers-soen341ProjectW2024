// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { addVehicle, getAllVehicles } from '@/utils/vehicleRepository';
import { IVehicle } from '@/models/Vehicle';

export async function GET() {
    const result = await getAllVehicles();
    console.log(result);
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return  NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}


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
