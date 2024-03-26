import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";

interface IVehicle extends Document {
    brand: string;
    imageUrl: string;
    category: string;
    vehicleModel: string;
    year: number;
    automatic: boolean;
    nPeople: number;
    nBags: number;
    color: string;
    fuelType: string;
    engineCapacity: number;
    rentalPrice: number;
    mileage: number;
}

interface VehicleProps {
 brand: string;
 imageUrl: string;
 category: string;
 vehicleModel: string;
 year: number;
 automatic: boolean;
 nPeople: number;
 nBags: number;
 color: string;
 fuelType: string;
 engineCapacity: number;
 rentalPrice: number;
 mileage: number;
 _id: string;
}

export default function VehicleCard({ brand, imageUrl, category, vehicleModel, year, automatic, nPeople, nBags, color, fuelType, engineCapacity, rentalPrice, mileage, _id }: VehicleProps) {

 const deleteVehicle = async () => {

    const isConfirmed = window.confirm(`Are you sure you want to delete ${brand} ${vehicleModel}?`);
    try {
      const response = await fetch(`/api/vehicles/${_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ _id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      } else {
        window.location.reload();
      }
      
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
    alert('Delete Information successfully!');
 };

 return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={imageUrl} alt="Vehicle" />
        <AvatarFallback>{brand.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {brand} {vehicleModel}
        </p>
        <p className="text-sm text-muted-foreground">
          {category} - {year} - {color}
        </p>
        <p className="text-sm text-muted-foreground">
          ID: {_id}
        </p>
      </div>
      <div className="ml-auto font-medium flex flex-row">
        <div className="mr-2">
          <Link href={`/admin/updateVehicle/${_id}`}>
            <Button variant="link">Update</Button>
          </Link>
        </div>
        <div className="mr-2">
          <Button variant="destructive" onClick={deleteVehicle}>Delete</Button>
        </div>
      </div>
      <Separator />
    </div>
 );
}
