// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, getUserById } from "@/utils/db";

// export async function GET() {
//     const result = await getAllUsers();
//     console.log(result);
//     if (result.success) {
//         return Response.json({ success: true, value: result.value });
//     } else if (result.error) {
//         return Response.json({ success: false, error: result.error.message });
//     } else {
//         // Handle unsupported methods or other conditions
//         return  Response.json({ success: false, error: 'Method not allowed' });
//     }
// }

export async function GET(req: NextApiRequest, { params }: any) {
    const { id } = params;
    console.log(id);

    const result = await getUserById(id);
    if(result.success) {
        return Response.json({ success: true, value: result.value });
    } else if (result.error) {
        return Response.json({ success: false, error: result.error.message });
    } else {    
        return Response.json({ success: false, error: 'Method not allowed' });
    }
}