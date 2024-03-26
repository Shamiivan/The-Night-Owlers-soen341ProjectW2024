
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Sidebar from "@/components/dashboard/sidebar";
import { UserNav } from "@/components/navbar/user-nav";
import LocationCard from "@/components/dashboard/locations/location-card";
import { getAllLocations } from "@/utils/locationRepository";
import { getAllVehicles } from "@/utils/vehicleRepository";
import { get } from "http";
import Modal from "@/components/forms/new-location-form";

const fetchLocations = async () => {
  const response = await getAllLocations();
  if (response.success) {
    return response.value;
  } else {
    console.error("Failed to fetch locations");
    console.error(response.error.message);
    return [];
  }
};

export default async function LocationView() {
  // modal functions

  async function onClose() {
    "use server"
    console.log("Modal has closed")

  }

  const onSubmit = async function onSubmit(name: string) {
    "use server"
    console.log("Ok was clicked");
    console.log(name);
  }

  const locations = await fetchLocations();
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-left gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        {/* TODO : IMPLEMENT PAGE NAME */}
        <Button className="mt-2" asChild size="sm" variant="link">
          <Link href="/admin/locations?showDialog=true">
            New Location
          </Link>
        </Button>
      </header>
      <Modal title="Create a new location" onClose={onClose} onSubmit={onSubmit}>
        <p>Modal Content</p>
      </Modal>
      <main className="flex flex-grow flex-col gap-4 p-4 md:gap-8 md:p-6">

        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Name</TableHead>
                <TableHead className="w-[120px]">Address</TableHead>
                <TableHead className="w-[100px]">City</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Postal Code</TableHead>
                <TableHead className="w-[100px]">Country</TableHead>
                <TableHead className="w-[120px]">Phone</TableHead>
                <TableHead className="w-[120px]">Email</TableHead>
                <TableHead className="w-[200px]">Operating Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations &&
                locations.map((location) => (
                  <LocationCard
                    key={location._id}
                    _id={location._id}
                    name={location.name}
                    address={location.address}
                    city={location.city}
                    typeOfLocation={location.typeOfLocation}
                    postalCode={location.postalCode}
                    country={location.country}
                    latitude={null}
                    longitude={null}
                    phone={location.phone}
                    email={location.email}
                    operatingHours={location.operatingHours}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}




// https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat