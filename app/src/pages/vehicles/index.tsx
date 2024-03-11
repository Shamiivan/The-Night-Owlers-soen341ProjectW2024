import { useRouter } from 'next/router';
import Card from "@/components/card";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import "@/styles/global.css";
import  VehicleShow from "@/components/dashboard/vehicleShow";

export default function Vehicles() {
  const router = useRouter();
  const query = router.query;
  const isModify = router.query && router.query.modify === 'true';
  const heading = isModify ? 'Modify Reservation' : 'Available Vehicles';

  return (
    <main>
      <Navbar/>
      <div className="flex">
        {/* filters */}
        {/*<div
          style={{ flexGrow: 1 }}
          className="rounded border p-4 m-1 flex flex-col"
        >

          <div className="flex flex-col">
            <h3>Categories</h3>
            <ul className="list-disc">
              <li>cars</li>
              <li>Suvs</li>
              <li>Trucks</li>
              <li>Vans</li>
            </ul>
          </div>
        </div>*/}

        {/* CARS */}
        <div style={{ flexGrow: 2 }} className="p-4 m-1">
          <p className="text-3xl font-semibold mb-4">{heading}</p>
          <div className="flex flex-col">
      <VehicleShow/>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
