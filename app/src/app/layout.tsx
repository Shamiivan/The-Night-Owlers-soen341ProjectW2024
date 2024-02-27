// Import necessary types and utilities
import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import { Inter as FontSans } from "next/font/google"; // Importing the Inter font as FontSans from Next.js's font optimization
import "@/styles/global.css"; // Importing global styles

import { cn } from "../lib/utils"; // Importing a utility function for class name concatenation

// Configuring the Inter font for use in the application
export const fontSans = FontSans({
  subsets: ["latin"], // Specifying the font subsets to be used
  variable: "--font-sans", // Generating a unique CSS variable name for the font
});

// Defining metadata for the application
export const metadata: Metadata = {
  title: "The Night Owlers", // Setting the title of the application
  description: "", // Placeholder for the description
};

// The root layout component for the application
export default function RootLayout({
  children, // The children elements to be rendered within the layout
}: Readonly<{
  children: React.ReactNode; // Type definition for the children prop
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Applying global styles and the Inter font
          fontSans.variable, // Using the unique CSS variable for the Inter font
        )}
      >
        {children}
      </body>
    </html>
  );
}
