import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from '@/components/ui/Footer';
import VehicleDetailCard from '@/components/vehicleDetailCard';
import { Details } from '@/components/details';

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
      return (
        <div>
          {/* <Navbar />
          <VehicleDetailCard
            name="Honda Civic"
            carDescription="The Honda Civic is a line of cars manufactured by Honda. "
            carImage="https://www.honda.ca/en/civic_sedan"
            carInformation={carInformation}
          />
      <Footer /> */}
      <Details />
    </div>
  );
};

export default VehicleDetails;