// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { addVehicle, createVehicle, getAllVehicles } from '@/utils/vehicleRepository';
import { IVehicle } from '@/models/vehicle';

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
        description,
        licensePlate,
        VIN
    } = await request.json();

    const result = await createVehicle(
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
        description,
        licensePlate,
        VIN
        );
    console.log(result)
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'Vehicle created successfully', value: result.value });
    } else {
        return NextResponse.json({ message: 'Failed to create vehicle', error: result.error }, { status: 500 });
    }
}
