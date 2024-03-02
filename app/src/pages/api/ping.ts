import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, createUser } from '../../utils/db';
import printError from "../../utils/print";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
   const result = await createUser("John", "Doe", "password", "jhon.doe@gmail.com", "customer");
    if (result.success) {
        res.status(200).json({ message: "Connected to MongoDB!" });
        console.log(typeof result.value)
        console.log(result.value)
        
        
    } else {
       printError(result.error.message);
       printError(result.error);
        res.status(500).json({ error: "Failed to connect to MongoDB." });
    }
}
