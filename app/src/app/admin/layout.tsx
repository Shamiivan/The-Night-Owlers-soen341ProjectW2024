// Import necessary types and utilities
import type { Metadata } from "next";
import "@/styles/global.css"; // Importing global styles
//import SessionProvider from "@/app/Provider";
import AuthProvider from "@/app/Provider";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils"; // Importing a utility function for class name concatenation
import Sidebar from "@/components/dashboard/sidebar";
import { SearchIcon } from "lucide-react";
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
                        "pt-4 min-h-screen bg-background font-sans antialiased", // Applying global styles and the Inter font
                    )}
                >
                    <div className="flex flex-row min-h-screen">


                        <Sidebar />
                        <div className="flex flex-col flex-grow">
                            <main className="flex-grow">{children}</main>
                        </div>
                    </div>
                </body>
            </html>
        </AuthProvider>
    );
}
