import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/utils/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'POST') {
    const { firstName,lastName, email, password } = req.body;
    console.log(req.body);
    const result = await createUser(firstName, lastName, email, password, 'customer');

    if (result.success) {
      res.status(201).json({ success: true, data: result.value });
      console.log(result);
    } else {
      res.status(400).json({ success: false, error: 'Failed to create user' });
    }
 } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
 }
}
