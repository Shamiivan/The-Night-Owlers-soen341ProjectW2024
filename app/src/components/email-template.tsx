import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    ReservationId: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pickupLocation: string;
    returnLocation: string;
    comments: string;
    imgUrl: string;
    brand: string;
    model: string;
    year: number;
    fuelType: string;
    color: string;
    nPeople: number;
    rentalPrice: number;
    totalPrice: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    ReservationId,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    pickupLocation,
    returnLocation,
    comments,
    imgUrl,
    brand,
    model,
    year,
    fuelType,
    color,
    nPeople,
    rentalPrice,
    totalPrice,
}) => (
    <div>
    <h1>Hello, {name}!</h1>
    <p>Thank you for using our service. Here are your reservation details:</p>
    <p>Your reservation ID: {ReservationId}</p>
    <p>Your pickup details:</p>
    <ul>
      <li>Date: {pickupDate}</li>
      <li>Time: {pickupTime}</li>
      <li>Location: {pickupLocation}</li>
    </ul>
    <p>Your return details:</p>
    <ul>
      <li>Date: {returnDate}</li>
      <li>Time: {returnTime}</li>
      <li>Location: {returnLocation}</li>
    </ul>
    <p>Detail of your car:</p>
    <img src={imgUrl} alt="Car" width="300"/>
    <ul>
        <li>{brand} {model}</li>
        <li><span className="font-medium">Year:</span> {year}</li>
        <li><span className="font-medium">Fuel Type:</span> {fuelType}</li>
        <li><span className="font-medium">Color:</span>{color}</li>
        <li><span className="font-medium">Number of People:</span>{nPeople} people</li>
        <li><span className="font-medium">Rental Price:</span>${rentalPrice}</li>
    </ul>
    <p>Additional comments: {comments}</p>
    <p>Total Price: ${totalPrice}</p>
  </div>
);
