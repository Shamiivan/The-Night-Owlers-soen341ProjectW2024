import React from "react";
import { Button } from "./ui/button";
import Image from "./ui/Image";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";


import { useRouter } from 'next/navigation';

interface Props {
  brand: string;
  price: number;
  description: string;
  automatic: boolean;
  nPeople: number;
  nBags: number;
  _id:string;
  
}
export function Card({brand, price,description, _id }: Props) {
  const router = useRouter();
  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/vehicles/${_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ _id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) { throw new Error('Failed to delete user'); }
      else if (response.ok) { router.push("/admin/vehicles"); }


    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };
const Card: React.FC<Props> = (
  { brand, price, description, automatic, nPeople, nBags },
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
            {brand}
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
   
      <Button>Make a reservation</Button>
    </div>
  );
};

}
export default Card;
