import React from 'react'

const DriverDetail = () => {
  return (
    <div className='px-10  pb-10 border-2 border-black rounded-xl mt-8'>
        <h1 className='font-semibold'>Driver's Detail</h1>
        
        <div className="grid-rows-2">
          <div className="grid grid-cols-2 my-5">
            <div>
              <p className=''>First Name</p>
              <input type="name" placeholder="First name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
            </div>
            <div>
              <p className=''>Last Name</p>
              <input type="name" placeholder="Last name" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2">
              <div>
                <p className=''>Email</p>
                <input type="name" placeholder="Email" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
              </div>
              <div>
                <p className=''>Contact Number</p>
                <input type="name" placeholder="Contact Number" className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"/>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default DriverDetail