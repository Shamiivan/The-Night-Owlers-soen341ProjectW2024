// Import necessary types and utilities
import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import "@/styles/global.css"; // Importing global styles

import { cn } from "../lib/utils"; // Importing a utility function for class name concatenation
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
        )}
      >
        {children}
      </body>
    </html>
  );
}
