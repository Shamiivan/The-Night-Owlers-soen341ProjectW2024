"use client"
import React from 'react'
import Navbar from '../../components/ui/Navbar'
import Footer from '../../components/ui/Footer'
import DriverDetail from '@/components/ui/DriverDetail'
import BillingAddress from '@/components/ui/BillingAddress'
import Payment from '@/components/ui/Payment'
import ReserveDetail from '@/components/ui/ReserveDetail'

const ReserveForm = () => {
  const Reserve = {
    startTime: '12.00 pm',
    startDate: '12-02-2024',
    endTime: '12.00 pm',
    endDate: '12-03-2024',
    carData: {
      img: 'car.jpg',
      name: "Car Name",
      price: 99,
      description: "This is a great car with excellent features for your next trip.",
      automatic: true,
      nPeople: 4,
      nBags: 2
    }
  };

  return (
    <main>
        <Navbar/>

        <div className=' mt-6 grid grid-cols-12 items-center'>
          <p className='text-4xl font-semibold col-start-2 col-span-4'>Car Rental Form</p>
          <div className='col-start-7 col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>Start</p>
            <div className='bg-slate-200 flex justify-around font-medium'>
              <p className='p-2'>{Reserve.startTime}</p>
              <p className='p-2'>{Reserve.startDate}</p>
            </div>
          </div>
          <div></div>
          <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>End</p>
            <div className='bg-slate-200 flex justify-around font-medium'>
              <p className='p-2'>{Reserve.endTime}</p>
              <p className='p-2'>{Reserve.endDate}</p>
            </div>
          </div>
        </div>
        
        <div className='grid grid-cols-2 gap-6'>
          <div className='ml-10'>
            <DriverDetail/>
            <BillingAddress/>
            <Payment/>
          </div>
          <div className='mr-10'>
            <ReserveDetail
              img={Reserve.carData.img}
              name={Reserve.carData.name}
              price={Reserve.carData.price}
              description={Reserve.carData.description}
              automatic={Reserve.carData.automatic}
              nPeople={Reserve.carData.nPeople}
            />
          </div>
        </div>

        <Footer/>
    </main>
  )
}

export default ReserveForm