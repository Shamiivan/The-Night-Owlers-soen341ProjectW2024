'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";

interface User {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    license: string;
  }

  interface Vehicle {
    brand: string;
    vehicleModel: string;
    year: number;
    licensePlate: string;
    VIN: string;
    color: string;
    mileage: number;
    rentalPrice: number;
  }

  interface Reservation {
    id: string;
    pickupDate: Date;
    returnDate: Date;
    addition: string;
  }

export default function RentalAgreementForm({ 
        firstname,
        lastname,
        address,
        phone,
        email,
        license,
        brand,
        model,
        year,
        licensePlate,
        VIN,
        color,
        pickupDate,
        returnDate,
        pickupLocation,
        returnLocation,
        mileage,
        price,
        id,
        addition
    }) {

    const [rentalName, setRentalName] = useState<string | undefined>(); // Added type annotation for state variables
    const [rentalDate, setRentalDate] = useState<string | undefined>(); // Added type annotation for state variables
    const [renterName, setRenterName] = useState<string | undefined>(); // Added type annotation for state variables
    const [renterDate, setRenterDate] = useState<string | undefined>(); // Added type annotation for state variables

    const rentalCompanySignatureRef = useRef<SignatureCanvas | null>(null); // Added type annotation for ref
    const renterSignatureRef = useRef<SignatureCanvas | null>(null); // Added type annotation for ref
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isConfirmed = window.confirm('Are you sure you want to update this reservations?');

        if (isConfirmed) {
            const rentalCompanySignature = rentalCompanySignatureRef.current?.toDataURL();
            const renterSignature = renterSignatureRef.current?.toDataURL();
            console.log(rentalCompanySignature, rentalName, rentalDate, renterSignature, renterName, renterDate);

            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    rentalCompanySignature,
                    rentalName,
                    rentalDate,
                    renterSignature,
                    renterName,
                    renterDate,
                    status: 'rented',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Rental agreement submitted successfully!');
                router.push('/admin/reservations');
            } else {
                console.error('Error updating reservations:', response.statusText);
            }
            alert('Information sent successfully!');
        }
    };

    const timeDifference = returnDate.getTime() - pickupDate.getTime();
    const returnPeriodInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return (
    <div className="mx-auto max-w-screen-lg p-10 bg-slate-200">
        
        <p className="text-3xl font-bold mb-4">Car Rental Agreement</p>
        <p className="mb-4">Rental Agreement Number: {id}</p>
        <p>
            This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name],
            located at {pickupLocation}, hereinafter referred to as the "Rental Company,"
            and the individual or entity identified below, hereinafter referred to as the "Renter":
        </p>

        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">1. Renter's Information:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Name: </p>
                    <p>{firstname} {lastname} </p>
                    <p>Address: </p>
                    <p>{address}</p>
                    <p>Contact Number: </p>
                    <p>{phone}</p>
                    <p>Email Address: </p>
                    <p>{email} </p>
                    <p>Driver's License Number: </p>
                    <p>{license}</p>
                </div>
            <div>
                <h2 className="text-xl font-bold mb-2">2. Vehicle Information:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Make: </p>
                    <p>{brand}</p>
                    <p>Model: </p>
                    <p>{model}</p>
                    <p>Year: </p>
                    <p>{year}</p>
                    <p>License Plate Number: </p>
                    <p>{licensePlate}</p>
                    <p>Vehicle Identification Number (VIN):</p>
                    <p>{VIN}</p>
                    <p>Color: </p>
                    <p>{color}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">3. Rental Details:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Rental Start Date: </p>
                    <p>{pickupDate.toLocaleDateString('es-ES')}</p>
                    <p>Rental End Date:</p>
                    <p> {returnDate.toLocaleDateString('es-ES')}</p>
                    <p>Pick-up Location:</p>
                    <p>{pickupLocation}</p>
                    <p>Drop-off Location:</p>
                    <p>{returnLocation}</p>
                    <p>Rental Period:</p>
                    <p> {returnPeriodInDays} days</p>
                    <p>Mileage Limit (if applicable): </p>
                    <p>{mileage}</p>
                    <p>Rental Rate: </p>
                    <p>${price}/day</p>
                    <p>Additional Services (if any):</p>
                    <p>{!addition? "None" : addition}</p>
                </div>
            </div>
        </div>
        <h2 className="text-xl font-bold mb-2">4. Rental Terms and Conditions:</h2>
        <ul>
            <li>
                The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
            </li>
            <li>
                The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
            </li>
            <li>
                The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
            </li>
            <li>
            The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
            </li>
            <li>
                The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
            </li>
            <li>
                The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
            </li>
            <li>
                The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
            </li>
            <li>
                The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
            </li>
        </ul>

        <h2 className="text-xl font-bold mb-2">5. Indemnification:</h2>
        <p className="mb-8">
            The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
        </p>

        <h2 className="text-xl font-bold mb-2">6. Governing Law:</h2>
        <p className="mb-8">
            This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].
        </p>

        <h2 className="text-xl font-bold mb-2">7. Entire Agreement:</h2>
        <p className="mb-8">
            This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.
        </p>

        <h2 className="text-xl font-bold mb-2">8. Signatures:</h2>
        <p className="mb-8">
            The parties hereto have executed this Agreement as of the date first written above.
        </p>
        <form onSubmit={handleSubmit}>
        <div className="mb-6">
                <p className="mb-2 text-lg font-semibold">Rental Company:</p>
                <div className="grid grid-cols-6">
                    <label className="w-24">Signature:</label>
                    <SignatureCanvas
                    ref={rentalCompanySignatureRef}
                    canvasProps={{ className: "border rounded-md bg-white h-32" }}
                    />
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label htmlFor="rentalName" className="w-24">Print Name:</label>
                    <input
                        type="text"
                        id="rentalName"
                        value={rentalName}
                        onChange={(e) => setRentalName(e.target.value)}
                        className="border rounded-md py-1 px-2"
                    />
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label htmlFor="rentalDate" className="w-24">Date:</label>
                    <input
                        type="text"
                        id="rentalDate"
                        value={rentalDate}
                        onChange={(e) => setRentalDate(e.target.value)}
                        className="border rounded-md py-1 px-2"
                    />
                </div>
                <p className="mt-6 mb-2 text-lg font-semibold">Rente:</p>
                <div className="mt-2 grid grid-cols-6">
                    <label className="w-24">Signature:</label>
                    <SignatureCanvas
                        ref={renterSignatureRef}
                        canvasProps={{ className: "border rounded-md bg-white h-32" }}
                    />
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label htmlFor="renterName" className="w-24">Print Name:</label>
                    <input
                        type="text"
                        id="renterName"
                        value={renterName}
                        onChange={(e) => setRenterName(e.target.value)}
                        className="border rounded-md py-1 px-2"
                    />
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label htmlFor="renterDate" className="w-24">Date:</label>
                    <input
                        type="text"
                        id="renterDate"
                        value={renterDate}
                        onChange={(e) => setRenterDate(e.target.value)}
                        className="border rounded-md py-1 px-2"
                    />
                </div>
                <div className="flex justify-between mt-8">
                    <Button type="submit">
                        Continue
                    </Button>
                    <Link href="/admin/reservations">
                        <Button className="bg-red-500 hover:bg-red-600">
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
        </form>
    </div>
  )
}
