import React from 'react'
import Navbar from '../../components/ui/Navbar'
import Footer from '../../components/ui/Footer'
import DriverDetail from '@/components/ui/DriverDetail'
import BillingAddress from '@/components/ui/BillingAddress'
import Payment from '@/components/ui/Payment'
import ReserveDetail from '@/components/ui/ReserveDetail'

const ReserveForm = () => {
  return (
    <main>
        <Navbar/>
          <div className='flex flex-auto justify-around'>
            <h1 className='text-4xl font-semibold'>Car Rental Form</h1>
            <div className='mt-8'>Start</div>
            <div className='mt-8'>End</div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='ml-10'>
              <DriverDetail/>
              <BillingAddress/>
              <Payment/>
            </div>
            <div className='mr-10'>
              <ReserveDetail/>
            </div>
          </div>
        <Footer/>
    </main>
  )
}

export default ReserveForm