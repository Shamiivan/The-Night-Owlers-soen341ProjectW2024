import Card from "@/components/card";
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';
import Vehicle, { IVehicle } from '@/models/Vehicle';
import "@/styles/global.css";
import {getAllVehicle, getNumVehicle,getAllVehiclePara }from "@/utils/vehicleRepository"
import {getAllUsers,getUserById,}from "@/utils/userRepository"
//const Vehicle = require('@/utils/userRepository');
class VehicleNum {


  async   fetchVehicleCount() {
    const count = await getNumVehicle();
      //console.log(`Total number of vehicles: ${count}`);
      
  }



}


function VehicleList() {
  
  const vehicles = [];
  for (let i = 0; i < 10; i++) {
    vehicles.push(`Vehicle ${i}`);
  }
}


export default function Vehicles() {
  const cardData = {
    name: "Car Name",
    price: 99,
    description:
      "This is a great car with excellent features for your next trip.",
    automatic: true,
    nPeople: 4,
    nBags: 2
  };
  const count =  getNumVehicle();
  //const vehicles = [];
  const name: string[] = [];
  const price = [];
  const description=[];

  const countt =  Vehicle?.countDocuments({});
console.log("count is "+countt);
 

  //getAllVehiclePara();
  //const  pricesArray  == await getAllVehiclePara();
//console.log('prize'+pricesArray);

//etUserById('65e2e8b8307dc19abacdc792');

  dotenv.config();
// Retrieve the MongoDB URI from environment variables
const uri =  'mongodb+srv://nightOwlers:soen341@car-rental.kwm8q1v.mongodb.net/?retryWrites=true&w=majority&appName=car-rental';
if (!mongoose.connection.readyState) {
   mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
  });
}
for (let i = 0; i <10; i++) {

  // vehicles.push(`Vehicle ${i}`);
   name.push(`Vehicle ${i}`);
   price.push(`Vehicle ${i}`);
   description.push(`Vehicle ${i}`);
 
 }
 let ii=0;
 const brandArray: string[] = [];
 const rentalPriceArray: number[] = [];
Vehicle?.find({}, { brand: 1, rentalPrice: 1 })
    .then(vehicleeArray => {
        
       

        
        vehicleeArray.forEach(doc => {
          
            brandArray.push(doc.brand);
            rentalPriceArray.push(doc.rentalPrice);
            console.log( brandArray);
        });
       
    })
    .catch(error => {
        console.error("Error occurred while fetching data:", error);
    });

  //const countt =  Vehicle?.countDocuments({});
  //console.log('length is'+aa);
  
 // const vehiclee = Vehicle?.find({}, { brand: 1, rentalPrice:1 });
 // const pricesArray =vehiclee?.map(vehicle => vehicle.rentalPrice);
  //console.log('aa'+pricesArray[1]);



 

  //console.error("An error occurred:", error.message);

 // getAllVehicle();
 // getAllUsers()
// getNumVehicle();
  return (
    <main>
      <div className="flex">
        {/* filters */}
        <div
          style={{ flexGrow: 1 }}
          className="rounded border p-4 m-1 flex flex-col"
        >
          {/* FILTERS 1: CATEGORIES */}
          <div className="flex flex-col">
            <h3>Categories</h3>
            <ul className="list-disc">
              <li>cars</li>
              <li>Suvs</li>
              <li>Trucks</li>
              <li>Vans</li>
            </ul>
          </div>
        </div>

        {/* CARS */}
       <div style={{ flexGrow: 2 }} className="p-4 m-1">
          <div className="flex flex-col">
            <div className="flex mb-8 justify-between">
        {/*const countt= await VehicleNum.fetchVehicleCount();*/ } 
        
        <div>
      { name.map(( name, index) => (
        <Card
          key={index}
          name={ brandArray[index]}
          price={ cardData.price}
          description={brandArray[index]}
          automatic={cardData.automatic}
          nPeople={cardData.nPeople}
          nBags={cardData.nBags}
        />
      ))}
    </div>
  


            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
