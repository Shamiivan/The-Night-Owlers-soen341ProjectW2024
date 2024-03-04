"use client"
import React, { useState, ChangeEvent } from 'react';

const DriverDetail = () => {
  const [DfirstName, setDFirstName] = useState('');
  const [DlastName, setDLastName] = useState('');
  const [Demail, setDEmail] = useState('');
  const [DcontactNumber, setDContactNumber] = useState('');

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDLastName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDEmail(event.target.value);
  };

  const handleContactNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDContactNumber(event.target.value);
  };

  return (
    <form className='px-10 pb-10 border-2 border-black rounded-xl mt-8'>
      <h1 className='font-semibold'>Driver's Detail</h1>

      <div className="grid-rows-2">
        <div className="grid grid-cols-2 my-5">
          <div>
            <p className=''>First Name</p>
            <input
              type="text"  // Updated from type="name"
              placeholder="First name"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={DfirstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <p className=''>Last Name</p>
            <input
              type="text"  // Updated from type="name"
              placeholder="Last name"
              className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
              value={DlastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div>
              <p className=''>Email</p>
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                value={Demail}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <p className=''>Contact Number</p>
              <input
                type="tel"
                placeholder="Contact Number"
                className="border-2 border-black rounded-full p-1 pl-3 bg-gray-300"
                value={DcontactNumber}
                onChange={handleContactNumberChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DriverDetail;
