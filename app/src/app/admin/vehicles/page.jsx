import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { getAllVehicles } from "@/utils/vehicleRepository";
import VehicleCard from "@/components/dashboard/vehicles/vehicle-card";
import Modal from "@/components/modal";
import CreateVehicleForm from "@/components/dashboard/createVehicleForm";


async function fetchVehicles() {
  const response = await getAllVehicles();
  if (response.success) {
    return response.value;
  } else {
    return [];
  }
}

export default async function Vehicles() {
  async function onClose() {
    "use server"
    console.log("Modal has closed");
  }
  const vehicles = await fetchVehicles();

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-left gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        {/* TODO : IMPLEMENT PAGE NAME */}
        <Button className="mt-2" asChild size="sm" variant="link">
          <Link href="/admin/vehicles?showDialog=true">
            New Vehicle
          </Link>
        </Button>
      </header>
      {/* <Modal title="Create a new location" onClose={onClose} onSubmit={onSubmit}>
      <p>Modal Content</p>
    </Modal> */}
      <main className="flex flex-grow flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg">
          <Modal title="Create a new vehicle"
            onClose={onClose}
            redirectRoute="/admin/vehicles"
          >
           <CreateVehicleForm />
          </Modal>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Make</TableHead>
                <TableHead className="w-[100px]">Model</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[100px]">Year</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Vin</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles &&
                vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id}
                    _id={vehicle._id}
                    make={vehicle.brand}
                    vehicleModel={vehicle.vehicleModel}
                    status={vehicle.status}
                    price={vehicle.rentalPrice}
                    year={vehicle.year}
                    category={vehicle.category}
                    vin={vehicle.vin}
                  />
                ))}
            </TableBody>
          </Table>

        </div>
      </main>
    </div>
  );
}
