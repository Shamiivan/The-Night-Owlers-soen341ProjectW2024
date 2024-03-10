import "@/styles/global.css";
import React from 'react';
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default async function Home() {
  return (
    
    <main className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">Welcome to RentalCars</h1>
    
    <img src="/logo.png" alt="Cars" className="mx-auto mb-8" />

  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  
      <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Best Pricing</h2>
        <p className="text-gray-800">Welcome to the Best Pricing Car Rental App, your ultimate destination for affordable and convenient car rentals. Whether you're planning a weekend getaway, a business trip, or a family vacation, our app offers the best rates and a wide selection of vehicles to suit your needs.</p>
      </div>
  
      <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Vast Collection of Cars</h2>
        <p className="text-gray-800">Discover an unparalleled array of vehicles with our Vast Collection of Cars feature on the Best Pricing Car Rental App. Embrace the freedom to choose from an extensive selection of automobiles tailored to every journey imaginable. Whether you're seeking the compact agility of city-centric models, the luxurious comfort of spacious sedans, or the rugged versatility of SUVs for outdoor escapades, our collection has it all. </p>
      </div>
  
      <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Available in 32 countries</h2>
        <p className="text-gray-800">Embark on your global journey with confidence, as our car rental services extend their reach across an impressive 32 countries. Wherever your wanderlust takes you, whether it's the bustling streets of major metropolises, the tranquil countryside, or the picturesque coastlines, our presence ensures that you have access to reliable transportation solutions. From the iconic landmarks of Europe to the vibrant cities of Asia and the sprawling landscapes of North America, our services transcend borders, offering seamless access to quality vehicles and unparalleled convenience. </p>
      </div>
  
    </div>
  </main>
  
    
  );
}
