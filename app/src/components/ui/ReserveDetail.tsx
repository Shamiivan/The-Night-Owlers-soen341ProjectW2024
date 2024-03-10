import React from 'react'
import { Button } from './button'


interface Props {
  img: string;
  name: string;
  price: number;
  description: string;
  automatic: boolean;
  nPeople: number;
  nBags: number;
}

const ReserveDetail: React.FC<Props> = (
  { img, name, price, description, automatic, nPeople},
) => {
  return (
    <div className='px-10  pb-10 mt-5 border-2 border-black rounded-xl '>
        <h1 className='font-semibold'>ReserveDetail</h1>
        <img src={img} className="w-fit my-3 rounded-sm" alt="Car"/>
        <div className='border-1 rounded-sm bg-slate-200 p-3'>
          <p className='text-xl font-semibold'>{name}</p>
          <p className=''>Description: {description}</p>
          <p className=''>Type: {automatic}</p>
          <p className=''>No. of seat: {nPeople}</p>
        </div>
        <div className='border-1 rounded-sm bg-slate-200 my-4 p-3'>
          <p className='text-xl font-semibold'>Price</p>
          <p>${price}</p>
        </div>
    </div>
  )
}

export default ReserveDetail