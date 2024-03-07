import type { NextApiRequest, NextApiResponse } from 'next';
import { getallcars} from "@/utils/cardb";
//import {readAllcars} from "@/utils/cardb";

export async function GET() {
    const result = await getallcars();
    console.log(result);
    if (result.success) {
        console.log('api work');
        return Response.json({ success: true, value: result.value });
    } else if (result.error) {
        console.log('api not work');
        return Response.json({ success: false, error: result.error.message });
    } else {
        // Handle unsupported methods or other conditions
        return  Response.json({ success: false, error: 'api not allowed' });
    }
}