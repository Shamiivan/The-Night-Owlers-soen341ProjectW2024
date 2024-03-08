"use client"

import React, { useState } from 'react';
import { Button } from "./button";
import Link from 'next/link';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDelete = () => {
    // Add logic here for actual account deletion
    // Check the password, perform deletion, etc.
    if (password === 'userpassword') {
      setIsDeleted(true);
    } else {
      alert('Incorrect password. Deletion failed.');
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setIsDeleted(false);
    setShowPopup(false);
    setPassword('');
  };

  return (
    <>
      <Button onClick={handleOpenPopup}>Delete Account</Button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-2xl font-bold mb-4">Delete Account</p>
            {isDeleted ? (
                 <>
                 <p>Your account has been successfully deleted.</p>
                 <Link href="/">
                   <Button
                    className="bg-red-500 hover:bg-red-400 mt-4"
                    onClick={handleClosePopup}>
                    Close
                   </Button>
                 </Link>
               </>
            ) : (
              <>
                <p className="mb-4">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <label htmlFor="password" className="block mb-2">Enter your password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mb-4"
                />
                <div className="flex justify-between">
                  <Button onClick={handleDelete} disabled={!password.trim()}>
                    Delete Account
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-400"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
