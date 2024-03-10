import React from "react";
import { Button } from "./ui/button";
import Image from "./ui/Image";
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  img: string;
  name: string;
  price: number;
  description: string;
  automatic: boolean;
  nPeople: number;
  nBags: number;
};


const Card: React.FC<Props> = (
  { img, name, price, description, automatic, nPeople, nBags},
) => {
  const router = useRouter();
  const query = router.query;
  const isModify = router.query && router.query.modify === 'true';

  return (
    <div className="border rounded bg-secondary-foreground mx-2 max-w-sm p-4 sm:px-4 sm:py-3 lg:max-w-sm lg:px-4">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-40">
          <img
            src= {img}
            alt="Front of men's Basic Tee in black."
            className="max-h-80 w-full object-fill object-center"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-gray-800">
            {name}
          </h2>
          <p className="text-xs pl-1 font-medium text-gray-300">${price}/day</p>
          <p className="text-xs pl-1 font-medium text-gray-300">${query.price}</p>
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
            img,
            name,
            price,
            description,
            automatic,
            nPeople,
            nBags,
            ...(isModify ? {
              Rimg: query.img,
              Rname: query.name,
              Rprice: query.price,
              Rdescritpion: query.description,
              Rautomatic:query.automatic,
              RnPeople: query.nPeople,
              RnBags: query.nBags
            } : {}),
          },
        }}
        passHref
      >
        <Button>Select</Button>
      </Link>
    </div>
  );
};

export default Card;
