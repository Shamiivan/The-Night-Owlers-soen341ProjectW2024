// Import necessary types and utilities
import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import "@/styles/global.css"; // Importing global styles
import SessionProvider from "@/app/Provider";

import { cn } from "../lib/utils"; // Importing a utility function for class name concatenation
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
// Defining metadata for the application
export const metadata: Metadata = {
 title: "The Night Owlers", // Setting the title of the application
 description: "", // Placeholder for the description
};

// The root layout component for the application
export default async function RootLayout({
 children, // The children elements to be rendered within the layout
}: Readonly<{
 children: React.ReactNode; // Type definition for the children prop
}>) {
  
 return (
    <SessionProvider
      // Assuming you have the necessary props for SessionProvider here
      // You might need to adjust these based on your actual SessionProvider implementation
      session={null} // Placeholder for session prop
      basePath="/"
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased", // Applying global styles and the Inter font
          )}>
            
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
            
        </body>
      </html>
    </SessionProvider>
 );
}
