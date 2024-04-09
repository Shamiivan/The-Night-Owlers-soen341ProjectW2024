'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Document, Page } from 'react-pdf';

export default function RentalAgreementForm({ reservation, user, vehicle }) {
    const router = useRouter();
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        // Fetch PDF data from the backend
        const fetchPdfData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/${reservation._id}/pdf`);
                if (response.ok) {
                    const data = await response.blob();
                    setPdfData(data);
                } else {
                    console.error('Error fetching PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdfData();
    }, [reservation._id]);


    const handlePrint = () => {
        // Implement print functionality
        window.print();
    };

    return (
        <div>
             <iframe src={reservation.pdfData} alt="rental agreement" className='w-full h-screen'/>
             <div className="flex justify-between m-8">
                <Link href="/admin/reservations">
                    <Button className="bg-red-500 hover:bg-red-600">Back</Button>
                </Link>
            </div>
        </div>
    );
}
