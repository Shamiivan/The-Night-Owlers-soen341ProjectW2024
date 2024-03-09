const express = require('express');
const cors = require('cors');
let cdb = require('@/utils/cardb');
import { Request, Response } from 'express';
import page from "@/vehiclesdetails";
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());


app.get('/vehiclesdetails/:id', async (req: Request, res: Response) => {
    try {

        const itemId: string = req.params.id;
          //  const aa=cdb.readIteam('65e80d3dc03e69f034389091').name;
        const item = await cdb.readItem(itemId);
        console.log('Received request for item with ID:', itemId);
        //console.log('aaa'+aa);
        if (item) {
            console.log(item);
            console.log('cardbs found');
            res.json(item); 
        } else {
            console.log('cardbs not found');
            res.status(404).send('Itemm not found');
       
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});