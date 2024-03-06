import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from '@/components/ui/Footer';
import VehicleDetailCard from '@/components/VehicleDetailCard';
import cdbservice from '@/pages/api/cdbservice';
let db = require('@/utils/db');
let cdb = require('@/utils/cardb');
let cdbs = require('@/pages/api/cdbservice');
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
      //db.readItem('65e2e8b8307dc19abacdc792')
      //db.getUserById('65e2e8b8307dc19abacdc792')
      //cdb.connectToDatabase();
    //  console.log('ho'+cdb.getcarById( documentId));
     // cdb.getcarById( documentId);
    cdbs.data
      return (
        <div>
          <Navbar />
          <VehicleDetailCard
            name="Honda Civic"
            carDescription="The Honda Civic is a line of cars manufactured by Honda. "
            carImage="https://www.honda.ca/en/civic_sedan"
            carInformation={carInformation}
          />
        
      <Footer />
    </div>
  );
};

export default VehicleDetails;