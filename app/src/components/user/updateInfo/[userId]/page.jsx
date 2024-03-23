'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UpdateUserForm = ({ oldImage, oldFirstName, oldLastName, oldEmail, oldPassword, oldPhoneNumber, oldAddress, oldRole, id }) => {

  const [image, setImage] = useState(oldImage);
  const [firstName, setFirstName] = useState(oldFirstName);
  const [lastName, setLastName] = useState(oldLastName);
  const [email, setEmail] = useState(oldEmail);
  const [password, setPassword] = useState(oldPassword);
  const [phone, setPhone] = useState(oldPhoneNumber);
  const [address, setAddress] = useState(oldAddress);
  const [role, setRole] = useState(oldRole);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetToOldValues = () => {
    setImage(oldImage);
    setFirstName(oldFirstName);
    setLastName(oldLastName);
    setEmail(oldEmail);
    setPassword(oldPassword);
    setPhone(oldPhoneNumber);
    setAddress(oldAddress);
    setRole(oldRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to update this user?');

    if (isConfirmed) {
      // Proceed with the form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, email, password, phone, address, role, id }),

        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      } else {
        console.error('Error updating user:', response.statusText);
      }
      alert('Information sent successfully!');
    }
  };

  // Function to toggle between edit and view modes
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      resetToOldValues(); // Reset values when switching to edit mode
    }
  };

  const hidePassword = (password) => {
    return '*'.repeat(password.length);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 lg:px-6 space-y-6">
      
      {editMode ? (
        <div>
          <div className="gap-2">
            <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl ml-10">Update User Information</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='px-10 pb-10 mt-5 rounded-xl'>
              <label htmlFor="imageUpload" className={`flex justify-center`} style={{ cursor: editMode ? 'grab' : 'default' }}>
                {image ? (
                  <Image src={image} alt="User" width={300} height={300} />
                ) : (
                  <Image src="/user-icon.png" alt="User Placeholder" width={300} height={300} />
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  style={{ cursor: 'grab' }}
                  onChange={handleImageChange}
                />
              </label>
              <div className='border-2 border-slate-300 rounded-sm bg-slate-200 shadow-md px-6 mt-10'>
                <div className='grid grid-cols-6 gap-6 my-6'>
                  <label htmlFor="firstNameInput"><b className='text-lg'>First Name:</b></label>
                  <input
                    type="text"
                    id="firstNameInput"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-1 border-none focus:outline-none col-span-2 rounded-md"
                  />
                  <label htmlFor="lastNameInput"><b className='text-lg'>Last Name:</b></label>
                  <input
                    type="text"
                    id="lastNameInput"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-1 border-none focus:outline-none col-span-2 rounded-md"
                  />
                  <label htmlFor="emailInput"><b className='text-lg'>Email:</b></label>
                  <input
                    type="email"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-1 border-none focus:outline-none col-span-2 rounded-md"
                  />
                  <label htmlFor="passwordInput"><b className='text-lg'>Password:</b></label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="passwordInput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-1 border-none focus:outline-none col-span-1 rounded-md"
                    />
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="ml-2 cursor-pointer" />
                  <label htmlFor="phoneInput"><b className='text-lg'>Phone:</b></label>
                  <input
                    type="tel"
                    id="phoneInput"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-1 border-none focus:outline-none col-span-2 rounded-md"
                  />
                  <label htmlFor="addressInput"><b className='text-lg'>Address:</b></label>
                    <input
                      type="text"
                      id="addressInput"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-1 border-none focus:outline-none col-span-2 rounded-md"
                    />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="w-full">
                  <Button type="submit" variant="secondary" className="text-primary-foreground mt-auto">
                    Update
                  </Button>
                </div>
                <Button onClick={toggleEditMode} variant="ghost" className="mt-auto">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
        <div className="gap-2">
          <h1 className="text-3xl font-bold text-primary tracking-tighter sm:text-5xl ml-10">User Information</h1>
        </div>
        <div className='px-10 pb-10 mt-5 rounded-xl'>
          <div className='flex justify-center'>
            {oldImage ? (
              <Image src={oldImage} alt="User" width={300} height={300} />
            ) : (
              <Image src="/user-icon.png" alt="User Placeholder" width={300} height={300} />
            )}
          </div>
          <div className='border-2 border-slate-300 rounded-sm bg-slate-200 shadow-md px-6 mt-10'>
            <p className='mt-3 mb-2 text-2xl font-bold flex justify-center'>{oldFirstName} {oldLastName}</p>
            <div className='grid grid-cols-2 gap-6 my-6'>
              <p><b className='text-lg'>Email:</b> {oldEmail}</p>
              <p><b className='text-lg'>Password:</b> {hidePassword(oldPassword)}</p>
              <p><b className='text-lg'>Phone:</b> {oldPhoneNumber}</p>
              <p><b className='text-lg'>Address:</b> {oldAddress}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="w-full">
              <Button onClick={toggleEditMode} variant="secondary" className="mt-auto text-white">
                Edit
              </Button>
            </div>
            <Link href="/">
              <Button variant="ghost" className="mt-auto w-full">
                Back
              </Button>
            </Link>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserForm;
