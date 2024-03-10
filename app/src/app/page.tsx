import "@/styles/global.css";
import React from 'react';
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default async function Home() {
  return (
    
   <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to RentalCars</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Best Pricing</h2>
            <p className="text-gray-700">XXX</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Large Collection of Models</h2>
            <p className="text-gray-700">XXX.</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Available in 32 countries</h2>
            <p className="text-gray-700">XXX</p>
          </div>
        </div>
      </main>
    
  );
}
