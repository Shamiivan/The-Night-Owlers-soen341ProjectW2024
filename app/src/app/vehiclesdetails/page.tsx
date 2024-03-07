import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from '@/components/ui/Footer';
import VehicleDetailCard from '@/components/VehicleDetailCard';
import cdbservice from '@/pages/api/cdbservice';
let db = require('@/utils/db');
let cdb = require('@/utils/cardb');
let cdbs = require('@/utils/cardbs');
//let cdbs = require('@/pages/api/cdbservice');
const VehicleDetails: React.FC = () => {

      const carInformation = {
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        transmissionType: {
          automatic: true,
          nPeople: 5,
          nBags: 3,
        },
        color: 'Red',
        fuelType: 'Petrol',
        engineCapacity: 1500,
        totalDoors: 4,
        rentalPrice: 100,
        mileage: 0,
      };
      cdb.connectDB();
      const documentId = '65e80d3dc03e69f034389091';
      cdb.readItem( '65e80d3dc03e69f034389091');
     cdb.readAllcars()
   //cdb.getallcars();
  //   db.getAllUsers();
      //db.readItem('65e2e8b8307dc19abacdc792')
      //db.getUserById('65e2e8b8307dc19abacdc792')
      //cdb.connectToDatabase();
    //  console.log('ho'+cdb.getcarById( documentId));
     // cdb.getcarById( documentId);
    // console.log('hi'+cdbs.aa);
     //console.log.(cdbs.item)
 //   cdbs.data
// const itemId=cdbs.item;
/*
async function fetchItem(itemId: string) {
  try {
    const response = await fetch(`http://localhost:3000/vehiclesdetails/${itemId}`);
      if (!response.ok) {
          
          throw new Error('Item not foundd');
      }
      const item = await response.json();

      document.getElementById('item-container')!.innerHTML = `Item Name: ${item.name}`;
  } catch (error) {
      console.error(error);
      
      document.getElementById('item-container')!.innerHTML = 'Error loading item';
  }
}
   
    fetchItem('65e80d3dc03e69f034389091');
*/

async function fetchItem(itemId: string) {
  try {
    const response = await fetch(`http://localhost:3000/vehiclesdetails/${itemId}`);
    if (!response.ok) {
        throw new Error('Item not founddd');
        
    }
    return await response.json(); 
  } catch (error) {
    console.error(error);
    throw error;
  }
}


fetchItem('65e80d3dc03e69f034389091')
  .then(item => {

    console.log('Item:', item);
  })
  .catch(error => {
    console.error('Error fetching item:', error);

  });


      return (
        <div>
          <Navbar />
          <VehicleDetailCard
            name ="aa"
            carDescription="The Honda Civic is a line of cars manufactured by Honda. "
            carImage="https://www.honda.ca/en/civic_sedan"
            carInformation={carInformation}
          
          />
        
      <Footer />
    </div>
  );
};

export default VehicleDetails;