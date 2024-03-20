'use client'
import { Button } from "@/components/ui/button";
import "@/styles/global.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";
import { getReservationById } from "@/utils/reservationRepository";
import { getVehicleById } from "@/utils/vehicleRepository";
import { getUserById } from "@/utils/userRepository";

export default function RentalAgreement({ params }) {
    const [reservationInfo, setReservationInfo] = useState({});
    const [renterInfo, setRenterInfo] = useState({});
    const [vehicleInfo, setVehicleInfo] = useState({});
    const rentalCompanySignatureRef = useRef(null);
    const renterSignatureRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reservationData = await getReservationById(params.reservationId);
                setReservationInfo(reservationData);
                
                const vehicleData = await getVehicleById(reservationData.vehicleId);
                setVehicleInfo(vehicleData);
                
                const userData = await getUserById(reservationData.userId);
                setRenterInfo(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.reservationId]);

    const handleContinue = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Are you sure you want to continue?');
        if (confirmed) {
            alert('Information sent successfully!');
            router.push('/admin/reservations');
        }
    };

  return (
    <div className="mx-auto max-w-screen-lg p-10 bg-slate-200">
        <form onSubmit={handleContinue}>
        <p className="text-3xl font-bold mb-4">Car Rental Agreement</p>
        <p className="mb-4">Rental Agreement Number: [Unique Rental Agreement Number]</p>
        <p>
            This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name],
            located at [Address], hereinafter referred to as the "Rental Company,"
            and the individual or entity identified below, hereinafter referred to as the "Renter":
        </p>

        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">1. Renter's Information:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Name: {renterInfo.name}</p>
                    <p>Address: {renterInfo.address}</p>
                    <p>Contact Number: {renterInfo.contactNumber}</p>
                    <p>Email Address: {renterInfo.email}</p>
                    <p>Driver's License Number: {renterInfo.driverLicenseNumber}</p>
                </div>
            <div>
                <h2 className="text-xl font-bold mb-2">2. Vehicle Information:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Make: {vehicleInfo.make}</p>
                    <p>Model: {vehicleInfo.model}</p>
                    <p>Year: {vehicleInfo.year}</p>
                    <p>License Plate Number: {vehicleInfo.licensePlateNumber}</p>
                    <p>Vehicle Identification Number (VIN): {vehicleInfo.vin}</p>
                    <p>Color: {vehicleInfo.color}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">3. Rental Details:</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p>Rental Start Date:</p>
                    <p>Rental End Date:</p>
                    <p>Pick-up Location:</p>
                    <p>Drop-off Location:</p>
                    <p>Rental Period:</p>
                    <p>Mileage Limit (if applicable):</p>
                    <p>Rental Rate:</p>
                    <p>Additional Services (if any):</p>
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
                    <label className="w-24">Print Name:</label>
                    <input type="text" className="ml-2 border rounded-md py-1 px-2"/>
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label className="w-24">Date:</label>
                    <input type="text" className="ml-2 border rounded-md py-1 px-2"/>
                </div>
                <p className="mt-6 mb-2 text-lg font-semibold">Renter:</p>
                <div className="mt-2 grid grid-cols-6">
                    <label className="w-24">Signature:</label>
                    <SignatureCanvas
                        ref={renterSignatureRef}
                        canvasProps={{ className: "border rounded-md bg-white h-32" }}
                    />
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label className="w-24">Print Name:</label>
                    <input type="text" className="border rounded-md py-1 px-2"/>
                </div>
                <div className="mt-2 grid grid-cols-6">
                    <label className="w-24">Date:</label>
                    <input type="text" className="border rounded-md py-1 px-2"/>
                </div>
                <div className="flex justify-between mt-8">
                    <Button onClick={handleContinue}>
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
