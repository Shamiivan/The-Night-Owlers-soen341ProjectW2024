import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getAllUsers } from '@/utils/userRepository';
import User from '@/models/user';
import { get } from 'http';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'GET') {
    const result = await getAllUsers();
    if (result.success) {
      res.status(200).json({ success: true, data: result.value });
      console.log(result);
    } else {
      res.status(400).json({ success: false, error: 'Failed to create user' });
    }
} else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
 }
}
