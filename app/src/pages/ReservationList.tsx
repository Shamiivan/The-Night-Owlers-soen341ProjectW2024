import "@/styles/global.css";
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ReservationList from "@/components/ui/ReserveList";

export default function Home() {
  
  const reservationsDataSets = [
    [
      { img:'', id: 1, car: 'Car A', startDate: '2024-03-05', endDate: '2024-03-08', location:'Airport'},
    ],
    [
      { img:'', id: 2, car: 'Car B', startDate: '2024-03-10', endDate: '2024-03-15', location:'Train station' },
    ],
    // link to database
  ];

  const [user, setUser] = useState({
    name: '',
    userID: null
  });

  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error loading user data: ", error);
      }
    };

    // Fetch reservations for the current user
    const fetchUserReservations = async () => {
      try {
        // Check if user.userID is not null before making the request
        if (user.userID !== null) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/reservations/user/${user.userID}`, {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Failed to fetch user reservations");
          }

          const data = await res.json();
          setUserReservations(data);
        }
      } catch (error) {
        console.error("Error loading user reservations: ", error);
      }
    };

    fetchUserData();
    fetchUserReservations();
  }, [user.userID]);

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
