import "@/styles/global.css";
import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="mr-2 text-blue-400">Find,</span>
        <span className="mx-2 text-blue-600">Rent,</span>
        <span className="ml-2 text-blue-800">Enjoy</span>
      </h1>

      <div className="flex justify-center items-center h-screen bg-blue-500 rounded-xl shadow-md shadow-gray-500">
        <div className="flex flex-col justify-center items-start p-8 mr-4 text-white">
          <h1 className="text-3xl font-bold mb-4">Welcome to Omni Rental !</h1>
        <p className="text-lg">
            At Omni Rental, we provide you with a seamless and convenient way to
            find the perfect vehicle for your needs. Whether you're planning a
            road trip, a business journey, or simply need a reliable ride for
            your daily commute, we've got you covered.
          </p>
        </div>

        <div>
          <Image
            src="/home_page_main.png"
            alt="Car"
            width={1900}
            height={300}
          />
        </div>
      </div>

      <div className="mb-8"></div>
      <div className="mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-md shadow-gray-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Best Pricing
          </h2>
          <p className="text-gray-800">
            Welcome to Omni Rental, your ultimate destination for affordable and
            convenient car rentals. Whether you're planning a weekend getaway, a
            business trip, or a family vacation, our app offers the best rates
            and a wide selection of vehicles to suit your needs.
          </p>
        </div>

        <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-md shadow-gray-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Vast Collection of Cars
          </h2>
          <p className="text-gray-800">
            Discover an unparalleled array of vehicles with our vast collection
            of cars. Embrace the freedom to choose from an extensive selection
            of automobiles tailored to every journey imaginable.{" "}
          </p>
        </div>

        <div className="bg-blue-100 border border-blue-200 rounded-md p-6 shadow-md shadow-gray-500">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Available in 32 countries
          </h2>
          <p className="text-gray-800">
            Embark on your global journey with confidence, as our car rental
            services extend their reach across an impressive 32 countries.
          </p>
        </div>
      </div>
    </main>
  );
}
