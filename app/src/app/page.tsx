import Image from "next/image";
import "@/styles/global.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Page</h1>

      <Card
        title="Special Offer"
        description="This is an amazing deal that you shouldn't miss."
        content="Details about the special offer..."
        buttonText="Make Reservation"
      />
      <Navbar />
    </main>
  );
}
