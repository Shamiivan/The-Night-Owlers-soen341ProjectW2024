import "@/styles/global.css";
import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ReservationList from "@/components/ui/ReservationList";

export default function Home() {
  const user = {
    name: 'Jame connor',
    UserID: 10
  }
  const reservationsDataSets = [
    [
      { img:'', id: 1, car: 'Car A', startDate: '2024-03-05', endDate: '2024-03-08', location:'Airport'},
    ],
    [
      { img:'', id: 2, car: 'Car B', startDate: '2024-03-10', endDate: '2024-03-15', location:'Train station' },
    ],
    // link to database
  ];


  return (
    <main>
      <Navbar />
      <div className="container mx-auto my-8 p-4">
        <div className="flex items-end mb-4">
          <p className="text-4xl font-bold mr-2">Reservation list</p>
          <p>(click on the list for more information)</p>
        </div>
        <p className="text-3xl font-semibold mb-6">{user.name}</p>

        {reservationsDataSets.map((reservationsData, index) => (
          <div key={index} className="mb-8">
            <ReservationList reservationsData={reservationsData} />
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
