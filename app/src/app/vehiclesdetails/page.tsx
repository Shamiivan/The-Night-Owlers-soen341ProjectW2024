import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from '@/components/ui/Footer';
import VehicleDetailCard from '@/components/VehicleDetailCard';
let db = require('@/utils/db');
let cdb = require('@/utils/cardb');

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
      db.connectToDatabase();
     // db.getCarById('65e2e8b8307dc19abacdc792')
      db.getUserById('65e6e4944909ef3b2fd8a7f8')
      //cdb.connectToDatabase();
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