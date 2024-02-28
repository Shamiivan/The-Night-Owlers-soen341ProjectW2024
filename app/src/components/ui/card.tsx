import Link from "next/link";
import React from "react";
import {
  IoArrowForward,
  IoLocationSharp,
  IoTimeOutline,
} from "react-icons/io5";
import { Button } from "./button";

interface Props {
  name: string;
  price: string;
  description: string;
  automatic: boolean;
  nPeople: number;
  nBags: number;
}

const Card: React.FC<Props> = (
  { name, price, description, automatic, nPeople, nBags },
) => {
  return (
    <div className="w-72 sm:w-80 flex flex-col justify-start bg-white border overflow-hidden rounded-xl shadow-md">
      <div className="w-full h-48 sm:h-52 bg-slate-400 rounded-t-xl">
        <div className="absolute w-32 p-1 bg-sky-400 rounded-tl-xl rounded-br-lg text-white">
          category
        </div>
        <img
          src="https://picsum.photos/200/300?grayscale"
          // src={`/api/uploads/${encodeURIComponent(image)}`}
          // alt={name}
          className="w-full object-cover overflow-hidden max-h-full"
        />
      </div>
      <div className="w-full flex flex-col px-4 pb-4 gap-2 sm-gap-3 text-start rounded-b-xl">
        <div>
          <h3 className="w-full text-title-l font-semibold font-raleway text-black">
            Name
          </h3>
          <p className="italic text-base font-light">Additional tags</p>
        </div>

        <div className="flex flex-row items-start sm:items-center gap-2 sm:gap-6">
          <div className="flex flex-row items-center text-sm gap-1 text-gray-600">
            <IoTimeOutline size={24} color="gray" /> date
          </div>
          <div className="flex flex-row items-center text-sm gap-1 text-gray-600">
            <IoLocationSharp size={24} color="gray" /> location
          </div>
        </div>

        <p className="text-base text-gray-600 line-clamp-3">{description}</p>

        <Button>Make a reservation</Button>
      </div>
    </div>
  );
};

export default Card;
