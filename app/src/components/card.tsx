import React from "react";
import { Button } from "./ui/button";
import Image from "./ui/Image";
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
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
  description:string;
};


const Card: React.FC<Props> = (
  { brand, imageUrl, category, vehicleModel, year, automatic, nPeople, nBags, color, fuelType, engineCapacity, rentalPrice, mileage, _id,description},
) => {
  const router = useRouter();
  const isModify = router.query && router.query.modify === 'true';

  return (
    <div className="border rounded bg-secondary-foreground my-10 mx-5 max-w-sm p-4 sm:px-4 sm:py-3 lg:max-w-sm lg:px-4 w-full">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-40">
          <img
            src= {imageUrl}
            alt="Front of men's Basic Tee in black."
            className="max-h-80 w-full object-fill object-center"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-gray-800">
            { brand} {vehicleModel}
          </h2>
          <p className="text-xs pl-1 font-medium text-gray-300">${rentalPrice}/day</p>
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <hr className="border-1 border-gray-300 my-4" />
      </div>
      <Link
        href={{
          pathname: isModify ? "/ModifyReservationPage" : "/ReserveForm",
          query: {
            vehicleId: _id,
            Rvehicle: router.query.vehicleId,
          }
        }}
        passHref
      >
        <Button>Select</Button>
      </Link>
    </div>
  );
};

export default Card;
