import mongoose, { Document, Schema } from 'mongoose';

// Define the car interface
interface ICar extends Document {
    name: string;
    price: number;
    description?: string; 
    automatic: number;
    npeople: number;
    nbags: number;
    buttontext: string;
    gasoline: number; 

}

// Check if the model is already compiled
let vehicle: mongoose.Model<ICar> | undefined = mongoose.models.car as mongoose.Model<ICar> | undefined;

if (!vehicle) {
    // Define the Car schema
    const carSchema = new Schema<ICar>({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String }, 
        automatic: { type: Number, required: true },
        npeople: { type: Number, required: true },
        nbags: { type: Number, required: true },
        gasoline: { type: Number, required: true },
        buttontext: { type: String, required: true },
  
    });

    // Create the Car model
 vehicle = mongoose.model<ICar>('car', carSchema);
}
console.log("Vehicle model:", vehicle.name);
export default vehicle;
export type { ICar };
