
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
import LocationIndex from "@/components/dashboard/location/location-index";
import LocationCard from "@/components/dashboard/location/location-card";
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

const onSubmit = async function onSubmit(name:string) {
    "use server"
    console.log("Ok was clicked");
    console.log(name);
}

  const locations = await fetchLocations();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 w-full bg-white shadow-none appearance-none md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search locations..."
              type="search"
            />
          </form>
          <div className="w-full">
            <div className="flex justify-end gap-4">
              <Modal title="Modal Title" onClose={onClose} onSubmit={onSubmit}>
                <p>Modal Content</p>
              </Modal>
              <Button asChild size="sm" variant="outline">
                <Link href="/admin/locations?showDialog=true">
                New Location
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    size="icon"
                    variant="ghost"
                  >
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="32"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
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
                  <TableHead className="w-[100px]">Latitude</TableHead>
                  <TableHead className="w-[100px]">Longitude</TableHead>
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
    </div>
  );
}






function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
