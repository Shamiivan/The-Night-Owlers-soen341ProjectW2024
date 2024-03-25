'use client';
import "@/styles/global.css";
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PSPDFKit from 'pspdfkit';

export default function RentalAgreementForm({reservation, user, vehicle }) {
	


	const timeDifference = reservation.returnDateTime.getTime() - reservation.pickupDateTime.getTime();
    const returnPeriodInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
	
	// Insert the form field values into Instant JSON.
	const instantJSON = {
		format: "https://pspdfkit.com/instant-json/v1",
		formFieldValues: [
			{ v: 1, type: "pspdfkit/form-field-value", name: "NameField", value: reservation.name },
			{ v: 1, type: "pspdfkit/form-field-value", name: "AddressField", value: user.address},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PhoneField", value: user.phone},
			{ v: 1, type: "pspdfkit/form-field-value", name: "EmailField", value: user.email},
			{ v: 1, type: "pspdfkit/form-field-value", name: "DriverlicenseField", value: reservation.driverlicense},
			{ v: 1, type: "pspdfkit/form-field-value", name: "BrandField", value: vehicle.brand},
			{ v: 1, type: "pspdfkit/form-field-value", name: "ModelField", value: vehicle.vehicleModel},
			{ v: 1, type: "pspdfkit/form-field-value", name: "YearField", value: vehicle.year.toString()},
			{ v: 1, type: "pspdfkit/form-field-value", name: "LicensePlateField", value: vehicle.licensePlate},
			{ v: 1, type: "pspdfkit/form-field-value", name: "VINField", value: vehicle.VIN},
			{ v: 1, type: "pspdfkit/form-field-value", name: "ColorField", value: vehicle.color},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PickupDateField", value: reservation.pickupDateTime.toLocaleDateString('en-US')},
			{ v: 1, type: "pspdfkit/form-field-value", name: "ReturnDateField", value: reservation.returnDateTime.toLocaleDateString('en-US')},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PickupLocationField", value: vehicle.pickupLocation},
			{ v: 1, type: "pspdfkit/form-field-value", name: "ReturnLocationField", value: vehicle.returnLocation},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PeriodField", value: returnPeriodInDays.toString()},
			{ v: 1, type: "pspdfkit/form-field-value", name: "MileageField", value: vehicle.mileage.toString()},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PriceField", value: vehicle.rentalPrice.toString()},
			{ v: 1, type: "pspdfkit/form-field-value", name: "CommentField", value: reservation.comments},
			{ v: 1, type: "pspdfkit/form-field-value", name: "PickupDateField2", value: reservation.pickupDateTime.toLocaleDateString('en-US')},

		]
	}
	// Open a document and immediately import Instant JSON into it.
	
	const containerRef = useRef(null);
	
	useEffect(() => {
		const container = containerRef.current;
	
		if (typeof window !== 'undefined') {
		  import('pspdfkit').then((PSPDFKit) => {
			if (PSPDFKit) {
			  PSPDFKit.unload(container);
			}
	
			PSPDFKit.load({
				licenseKey: 'DZ3yoMfjidDzHs59zDEJqSyZfkfPXvgK-L_BNMzSCAPomrstqi0pxEFJy8sjwv3CodG_KBdnaypNNUKs0tYvBXrKZhIsQlXSh3gYqM90VMGs93v9coS5h1gb2gL8UuQLb7oVefIUwnxFdY51cDRAo7JF9ylYCnYkVURlAFeodETH7FgXlMp-iCl52CKfM7Lsk5NFMi3zOBIHIQ',
				instantJSON: instantJSON,
				theme: PSPDFKit.Theme.Dark,
				toolbarItems: [...PSPDFKit.defaultToolbarItems, { type: 'form-creator' }],
				container,
			  	document: '/rentalagreement.pdf',
			  	baseUrl: `${window.location.protocol}//${window.location.host}/`,
			}).then((instance) => {
				console.log("PSPDFKit loaded", instance);
			});
		  });
		}
	  }, []);

	  const handleSubmit = async () => {
		// Get the PDF data from the PSPDFKit instance
		const pdfData = await containerRef.current.getInstance().exportPDF();

		// Send the PDF data to your backend for storage
		// Example: you can use fetch API to send a POST request
		const response = await fetch('/api/save-pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/pdf',
			},
			body: pdfData,
		});

		if (response.ok) {
			// Handle successful storage, e.g., show a success message
			console.log('PDF saved successfully!');
			route.push(`/viewreserve/${reservation.reservationId}`);
		} else {
			// Handle error, e.g., show an error message
			console.error('Failed to save PDF:', response.statusText);
		}
	};

	return (
		<div>
			<div ref={containerRef} style={{ height: '100vh' }} />
			<form onSubmit={handleSubmit} className="flex justify-between m-8">
				<Button type="submit">
					Submit
				</Button>
				<Link href="/admin/reservations">
					<Button className="bg-red-500 hover:bg-red-600">
						Back
					</Button>
				</Link>
			</form>
		</div>
	
	)
			
}