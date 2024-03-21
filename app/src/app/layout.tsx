// Import necessary types and utilities
import type { Metadata } from "next";
import "@/styles/global.css"; // Importing global styles
//import SessionProvider from "@/app/Provider";
import AuthProvider from "@/app/Provider";

import { cn } from "../lib/utils"; // Importing a utility function for class name concatenation
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
// Defining metadata for the application
export const metadata: Metadata = {
  title: "The Night Owlers",
  description: "",
};

// The root layout component for the application
export default async function RootLayout({
  children, // The children elements to be rendered within the layout
}: Readonly<{
  children: React.ReactNode; // Type definition for the children prop
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased", // Applying global styles and the Inter font
          )}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
