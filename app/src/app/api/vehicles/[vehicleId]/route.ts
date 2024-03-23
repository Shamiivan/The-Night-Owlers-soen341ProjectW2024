// src/app/api/users/[userId]/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { middleware } from '../../../../../middleware';
import { IVehicle } from '@/models/vehicle';
import { getVehicleById, updateVehicle, getAllVehicles, deleteVehicle, addVehicle } from "@/utils/vehicleRepository";


export async function GET(req: NextApiRequest, { params }: any, res: NextApiResponse) {
    const { vehicleId } = params;
    const result = await getVehicleById(vehicleId as string);
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        return NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}



interface UpdatedData {
    [key: string]: any;
}


export async function PUT(request: Request) {
    // Parse the request body to get the updated vehicle data
    const updatedData: UpdatedData = await request.json();
    console.log("UPDATED ", updatedData);
    const updatedFields: Partial<IVehicle> = {
        brand: updatedData?.brand,
        imageUrl: updatedData?.imageUrl,
        category: updatedData?.category,
        vehicleModel: updatedData?.vehicleModel,
        year: updatedData?.year,
        automatic: updatedData?.automatic,
        nPeople: updatedData?.nPeople,
        nBags: updatedData?.nBags,
        color: updatedData?.color,
        fuelType: updatedData?.fuelType,
        engineCapacity: updatedData?.engineCapacity,
        rentalPrice: updatedData?.rentalPrice,
        mileage: updatedData?.mileage,
        description:updatedData?.description,
        licensePlate: updatedData?.licensePlate,
        VIN: updatedData?.VIN
    };
    const id = updatedData.id;

    // Update the vehicle data in database or external API
    const result = await updateVehicle(id, updatedFields);

    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'Vehicl updated successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to update vehicl', error: result.error }, { status: 500 });
    }
}

// DELETE function to delete a vehicl by their ID
export async function DELETE(request: Request) {
    const body = await request.json();
    console.log(body._id);

    const result = await deleteVehicle(body._id);
    
    // Return a response indicating success or failure
    if (result.success) {
        return NextResponse.json({ message: 'Vehicle deleted successfully' });
    } else {
        return NextResponse.json({ message: 'Failed to delete vehicl', error: result.error }, { status: 500 });
    }
}
