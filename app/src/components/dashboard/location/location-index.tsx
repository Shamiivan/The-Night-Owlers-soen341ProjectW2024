import React, { useEffect, useState } from "react";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import LocationCard from "./location-card";



export default function LocationIndex() {
;
 return (
    <TableBody>
        <LocationCard
            _id="1"
            name="Shami"
            address="1234 Street"
            city="City"
            state="State"
            typeOfLocation="city"
            postalCode="12345"
            country="Country"
            latitude={123.456}
            longitude={123.456}
            phone="555-555-5555"
            email="shamiivan@.gmail.com"
            operatingHours={{ open: "9:00 AM", close: "5:00 PM" }}
        />
    </TableBody>
 );
}
