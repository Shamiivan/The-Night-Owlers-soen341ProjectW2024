import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const {
        email,
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
    } = body;

    const data = await resend.emails.send({
        from: 'Night Owlers <nightowlers@resend.dev>',
        to: email,
        subject: 'Reservation Confirmation',
        text: "",
        react: EmailTemplate({
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
        }),
    });

    if(data) {
        return NextResponse.json({ message: 'Email sent successfully' });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
