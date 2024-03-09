import React from "react";
import { Button } from "./ui/button";
import Image from "./ui/Image";
import Link from 'next/link';


interface Props {
  name: string;
  price: number;
  description: string;
  automatic: boolean;
  nPeople: number;
  nBags: number;
}

const Card: React.FC<Props> = (
  { name, price, description, automatic, nPeople, nBags },
) => {
  return (
    <div className="border rounded bg-secondary-foreground mx-2 max-w-sm p-4 sm:px-4 sm:py-3 lg:max-w-sm lg:px-4">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-40">
          <img
            src="https://picsum.photos/200/300?grayscale"
            alt="Front of men's Basic Tee in black."
            className="max-h-80 w-full object-fill object-center"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-gray-800">
            {name}
          </h2>
          <p className="text-xs pl-1 font-medium text-gray-300">${price}/day</p>
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <hr className="border-1 border-gray-300 my-4" />
      </div>
      <Link href="/ReserveForm" passHref>
        <Button>Make a reservation</Button>
      </Link>
    </div>
  );
};

export default Card;
