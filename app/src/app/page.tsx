import "@/styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import VehiclesIndex from "./vehicles";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VehiclesIndex />
      <Footer />
    </main>
  );
}
