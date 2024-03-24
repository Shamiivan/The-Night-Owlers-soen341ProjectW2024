import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllLocations, createLocation } from "@/utils/locationRepository";
import { NextRequest, NextResponse } from 'next/server';


// GET function to retrieve all locations
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const result = await getAllLocations();
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}

// POST function to create a new location
export async function POST(request: Request) {
    // Parse the request body to get the new location data
    const {
        name,
        address,
        city,
        country,
        typeOfLocation,
        postalCode,
        latitude,
        longitude,
        phone,
        email,

    }= await request.json();
    console.log("name : ", name);
    const result = await createLocation(
        name,
        address,
        city,
        country,
        typeOfLocation,
        postalCode,
        latitude,
        longitude,
        phone,
        email,
    );

    console.log(result);
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}

