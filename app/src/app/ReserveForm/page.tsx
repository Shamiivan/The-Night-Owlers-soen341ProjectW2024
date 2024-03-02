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

        <div className=' mt-6 grid grid-cols-12 items-center'>
          <p className='text-4xl font-semibold col-start-2 col-span-4'>Car Rental Form</p>
          <div className='col-start-7 col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>Start</p>
            <p className='pl-4 pt-1 pb-1'>Date & time</p>
          </div>
          <p className='self-center justify-self-center'>Arrow</p>
          <div className='col-span-2 border-2 border-black rounded-lg ml-3'>
            <p className='pl-4 pt-1 text-lg font-medium'>End</p>
            <p className='pl-4 pt-1 pb-1'>Date & time</p>
          </div>
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