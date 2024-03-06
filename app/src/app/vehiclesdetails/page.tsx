import "@/styles/global.css";
import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from '@/components/ui/Footer';
import VehicleDetailCard from '@/components/VehicleDetailCard';

const VehicleDetails: React.FC = () => {

      const carInformation = {
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        transmissionType: {
          automatic: true,
          nPeople: 5,
          nBags: 3,
        },
        color: 'Blue',
        fuelType: 'Petrol',
        engineCapacity: 1500,
        totalDoors: 4,
        rentalPrice: 100,
        mileage: 58000,
      };
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow"> 
            <VehicleDetailCard
              name="Honda Civic"
              carDescription="The Honda Civic is a line of cars manufactured by Honda."
              carImage="/HondaCivic.jpeg" 
              carInformation={carInformation}
            />
          </main>
          <Footer />
        </div>
      );
    };

export default VehicleDetails;