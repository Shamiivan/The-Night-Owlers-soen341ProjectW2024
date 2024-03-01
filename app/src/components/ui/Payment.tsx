import React from 'react'

const Payment = () => {
  return (
    <div className='px-10  pb-10 border-2 border-black rounded-xl'>
        <h1 className='font-semibold'>How to pay</h1>
        <div className="my-5">
          <p className=''>Cardholder Name</p>
          <input type="name" placeholder="First name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-full"/>
        </div>
        <div>
          <p className=''>Card Number</p>
          <input type="number" placeholder="Last name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300 w-full"/>
        </div>

        <div className="grid grid-cols-2 my-5">
          <div>
            <p className=''>Expiration Date</p>
            <input type="Date" placeholder="First name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
          </div>
          <div>
            <p className=''>CVC</p>
            <input type="number" placeholder="Last name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
          </div>
        </div>
    </div>
  )
}

export default Payment