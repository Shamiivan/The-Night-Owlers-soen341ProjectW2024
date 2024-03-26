import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

interface vehicleProps{
    _id: string;
    make: string;
    vehicleModel: string;
    year: number;
    vin: string;
    price: number;
    licensePlate: string;
    category: string;
    status: string;
    locations: string[];
}
export default function VehicleCard({
  _id, make, vehicleModel, year, vin, price, licensePlate, category, status, locations,
}){
  const deleteLocation = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );
    try {
      const response = await fetch(`/api/locations/${_id}`, {
        method: "DELETE",
        body: JSON.stringify({ _id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete location");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow>
        <TableCell>{make}</TableCell>
        <TableCell>{vehicleModel}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{price}$/day </TableCell>
        <TableCell>{year}</TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{vin}</TableCell>


    </TableRow>
  );
}
