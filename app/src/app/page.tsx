import "@/styles/global.css";
import React from 'react';
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { getAllUsers } from "../utils/userRepository";
import { IUser } from "@/models/User";

async function fetchUsers() {
  const result = await getAllUsers();
  if (result.success) {
    return result.value as IUser[];
  } else {
    console.error("Error fetching users:", result.error.message);
    return []; // Return an empty array on error
  }
}

export default async function Home() {
  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}