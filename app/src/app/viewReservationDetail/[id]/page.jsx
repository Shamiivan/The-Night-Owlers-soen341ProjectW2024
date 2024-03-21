import React from 'react'
import ReservationDetailCard from '@/components/ReservationDetailCard'

export default async function ViewReservationDetail ({params}) {

    const id = params.id

    return (
        <div>
            <ReservationDetailCard reservationId={id} />
        </div>
    )
}

