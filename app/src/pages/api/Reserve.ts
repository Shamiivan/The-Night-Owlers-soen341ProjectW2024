// Import necessary dependencies
import type { NextApiRequest, NextApiResponse } from 'next';
import { createReservation } from '@/utils/db';
import Reservation from '@/models/Reservation'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        startTime,
        startDate,
        endTime,
        endDate,
        img,
        name,
        price,
        description,
        automatic,
        nPeople,
        nBags,
        firstName,
        lastName,
        email,
        contactNumber,
        address,
      } = req.body;
      console.log(req.body);
      const result = await createReservation({
        startTime,
        startDate,
        endTime,
        endDate,
        img,
        name,
        price,
        description,
        automatic,
        nPeople,
        nBags,
        firstName,
        lastName,
        email,
        contactNumber,
        address,
      });

      if (result.success) {
        res.status(201).json({ success: true, data: result.value });
      } else {
        res.status(400).json({ success: false, error: 'Failed to create reservation' });
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, data: reservations });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
