import type { NextApiRequest, NextApiResponse } from "next";
import { addCar } from '@/utils/db';


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { brand, carModel, year, transmissionType, color, fuelType, engineCapacity, totalDoors, rentalPrice, mileage } = req.body;
        console.log(req.body);
        const result = await addCar(brand, carModel, year, transmissionType, color, fuelType, engineCapacity, totalDoors, rentalPrice, mileage);
        if (result.success) {
            res.status(201).json({ success: true, data: result.value });
            console.log(result);
        } else {
            res.status(400).json({ success: false, error: 'Failed to create car' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}