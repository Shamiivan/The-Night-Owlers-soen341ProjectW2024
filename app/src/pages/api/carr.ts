import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/models/Vehicle';

import { getAllVehicle, createVehicle } from '@/utils/vehicleRepository';

import { get } from 'http';
import Vehicle from '@/models/Vehicle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
       const { brand,rentalPrice,description } = req.body;
       console.log(req.body);
       const result = await createVehicle(brand,rentalPrice, description);
       if (result.success) {
         res.status(201).json({ success: true, data: result.value });
         console.log(result);
       } else {
         res.status(400).json({ success: false, error: 'Failed to create user' });
       }
    } else if (req.method === 'GET') {
        const result = await getAllVehicle();
        if (result.success) {
          res.status(200).json({ success: true, data: result.value });
          console.log(result);
        } else {
          res.status(400).json({ success: false, error: 'Failed to create user' });
        }
    }
    else {
       res.status(405).json({ success: false, error: 'Method not allowed' });
    }
   }
   