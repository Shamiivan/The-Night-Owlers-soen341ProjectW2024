import React, { useEffect, useState } from "react";
import { UserCard } from "./user-card";

import {VehicleCard} from "@/components/dashboard/VehicleCard";
import mongoose from 'mongoose';
import executeAsync from '@/utils/Result';
import dotenv from 'dotenv';

import Vehicle, { IVehicle } from '@/models/Vehicle';
import "@/styles/global.css";
import {getAllVehicle, getNumVehicle,getAllVehiclePara,fetchVehicleData }from "@/utils/vehicleRepository"
import {getAllUsers,getUserById,}from "@/utils/userRepository"
//const Vehicle = require('@/utils/userRepository');
export default function VehicleList() {
  const [CARS, setvehicles] = useState<IVehicle[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/vehicles`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        const CARS = Array.isArray(data.value) ? data.value : [];
        setvehicles(CARS);
      } catch (error) {

        console.log("Error loading users: ", error);
      }
    };

    fetchCars();
  }, []); 

  return (
<div className="p-8 bg-ghost mb-2 space-y-8">
{CARS.map((car) => (
  < VehicleCard
    key={car._id}
    _id={car._id}
    brand={car.brand}
  price={car.rentalPrice}
  description={car.description}
  />
))}

</div>
  );
}

