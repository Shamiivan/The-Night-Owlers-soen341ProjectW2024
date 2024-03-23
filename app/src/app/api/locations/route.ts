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
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Parse the request body to get the new location data
    const { name, address, city, state, typeOfLocation, postalCode, country, latitude, longitude, phone, email, operatingHours, services, description } = req.body;

    const result = await createLocation(name, address, city, state, typeOfLocation, postalCode, country, latitude, longitude, phone, email, operatingHours, services, description);
    if (result.success) {
        return NextResponse.json({ success: true, value: result.value });
    } else if (result.error) {
        return NextResponse.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return NextResponse.json({ success: false, error: 'Method not allowed' });
    }
}

