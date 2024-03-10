import "@/styles/global.css";
import React from 'react';
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default async function Home() {
  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}
