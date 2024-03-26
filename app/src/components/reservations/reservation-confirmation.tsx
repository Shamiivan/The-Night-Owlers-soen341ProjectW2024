"use client"
import "@/styles/global.css";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface ReservationFormProps {
    user: {
        name: string;
    },
    vehicle: {
        vehicleId: string;
        brand: string;
        vehicleModel: string;
        imageUrl: string;
        nPeople: number;
        nBags: number;
        automatic: boolean;

        color: string;
        fuelType: string;
        engineCapacity: number;
        year: number;
        rentalPrice: number;
        mileage: number;
        description: string;
    },
    pickupDate: Date;
    returnDate: Date;
    comments: string;
}
export default function ReservationConfirmation({ user, vehicle, pickupDate, returnDate, comments }: ReservationFormProps) {

const handleSubmit = async (e: React.FormEvent) => {

};
    return (
        <main>
            <div className='min-h-screen bg-gray-100'>
                <p className='text-4xl font-semibold m-10'>Reservation Detail</p>
                <div className='m-8 p-4 bg-blue-200 shadow-md rounded-md'>
                    <div className='flex mb-4 p-4'>
                        <div>
                            {/*<div className='bg-slate-200 rounded-lg p-2 pl-5 m-2'>
              <p className='font-medium'>Location:</p>
              <p>{exampleReservation.location}</p>
            </div>*/}
                            <div className='grid grid-cols-2'>
                                <div className='bg-slate-200 rounded-lg border-2 border-slate-400 shadow-md py-2 px-4 m-2'>
                                    <p className='font-medium'>Start Date:</p>
                                    <p>{pickupDate}</p>
                                </div>
                                <div className='bg-slate-200 rounded-lg border-2 border-slate-400 shadow-md py-2 px-4 m-2'>
                                    <p className='font-medium '>End Date:</p>
                                    <p>{returnDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center items-center">
                            <img src={vehicle.imageUrl} alt="Car Image" className="object-cover rounded-full" />
                        </div>
                        {/*<div className=''>
            <p className='bg-slate-200 rounded-lg p-4 m-2 font-medium'>Status: {exampleReservation.status}</p>
          </div>*/}
                    </div>
                    <div className='bg-slate-100 rounded-lg border-2 border-slate-400 shadow-md py-6 pl-10 m-2'>
                        <p className="flex text-3xl font-bold mb-2 pb-2 justify-center">Car Information</p>
                        <div className='ml-10'>
                            <p className='text-xl font-bold'>Name: {vehicle.brand} {vehicle.vehicleModel}</p>
                            <div className='grid grid-cols-2 mt-3'>
                                <p className=''>
                                    <b>Type:</b> {vehicle.automatic ? 'Automatic' : 'Manual'}
                                </p>
                                <p className=''><b>No. of seats:</b> {vehicle.nPeople}</p>
                                <p className=''><b>Fuel Type:</b> {vehicle.fuelType}</p>
                                <p className=''>
                                    <b>Engine Capacity:</b> {vehicle.engineCapacity} cc
                                </p>
                                <p className=''><b>Year:</b> {vehicle.year}</p>
                            </div>
                            <p className='mt-4 p-2 text-lg font-bold bg-slate-200 w-fit rounded-lg border-2 border-slate-300 shadow-md'>Rental Price: ${vehicle.rentalPrice}/day</p>
                        </div>
                    </div>
                    <div className='flex justify-end m-2'>
                        <Button className='mr-2' onClick={} >Modify</Button>
                        <Button className='bg-red-500 hover:bg-red-400' onClick={handleSubmit}>
                            Cancel
                        </Button>
                    </div>
                    {/* Cancel Confirmation Popup */}
                    {showCancelPopup && (
                        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
                            <div className='bg-white p-4 rounded-md'>
                                <p className='text-xl font-semibold mb-4'>Confirm Cancellation</p>
                                <p className='mb-4'>Are you sure you want to cancel this reservation?</p>
                                <div className='flex justify-end'>
                                    <Button onClick={handleSubmit}>Yes</Button>
                                    <Button onClick={handleSubmit} className='ml-2 bg-red-500 hover:bg-red-400'>
                                        No
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Modification Popup */}
                    {showModifyPopup && (
                        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
                            <div className='bg-white p-4 rounded-md'>
                                <p className='text-xl font-semibold mb-4'>Confirm Modification</p>
                                <p className='mb-4'>Are you sure you want to modify this reservation?</p>
                                <div className='flex justify-end'>
                                    <Button onClick={handleSubmit}>Yes</Button>
                                    <Button onClick={handleSubmit} className='ml-2 bg-red-500 hover:bg-red-400'>
                                        No
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
