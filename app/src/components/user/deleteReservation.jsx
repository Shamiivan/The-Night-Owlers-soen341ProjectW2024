'use client'
import "@/styles/global.css";
import React from 'react'
import { Button } from "@/components/ui/button";

export default function DeleteReservation({id}) {
  const deleteReserve = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this reservation?');
    if (confirmed) {
        try {
            const response = await fetch(`/api/reservations/${id}`, {
              method: 'DELETE',
              body: JSON.stringify({ _id: id }),
              headers: {
              'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
            throw new Error('Failed to delete reservation');
            }
        window.location.reload();
        alert('Reservation deleted successfully!');
        } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('Failed to delete reservation');
        }
    }

      
  };

  return (
    <div className="mt-auto w-full">
      <Button variant="destructive" className="mt-auto w-full" onClick={deleteReserve}>
        Cancel
      </Button>
    </div>
  );
}
