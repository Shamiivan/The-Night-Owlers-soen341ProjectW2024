'use client'
// Import necessary React hooks and types for creating a context and managing state
import React, { useState, createContext, ReactNode } from 'react';

// Define the shape of the context data for vehicles, specifically focusing on the pickup date
interface VehicleContextData {
  pickupDate: string; // To store the pickup date as a string
  setPickupDate: React.Dispatch<React.SetStateAction<string>>; // Function to update the pickup date
}

// Create the Vehicle context with an initial undefined value, to be populated later
// This context will eventually hold the pickup date and its setter function
const VehicleContext = createContext<VehicleContextData | undefined>(undefined);

// Define props for the VehicleProvider, which expects any React node(s) as children
interface VehicleProviderProps {
  children: ReactNode; // Can be any valid React child or children
}

// Define the VehicleProvider component, which will wrap around parts of the app that need access to vehicle context
export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  // Use useState to manage the pickup date within this context
  // Initially, the pickup date is an empty string
  const [pickupDate, setPickupDate] = useState<string>("");

  // Render the Provider component from VehicleContext
  // This makes pickupDate and setPickupDate available to any child components
  return (
    <VehicleContext.Provider value={{ pickupDate, setPickupDate }}>
      {children} {/* Render children within the context provider */}
    </VehicleContext.Provider>
  );
};

// Export VehicleContext for use with the useContext hook in consuming components
export default VehicleContext;
