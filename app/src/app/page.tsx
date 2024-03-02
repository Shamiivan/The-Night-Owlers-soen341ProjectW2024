import "@/styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import DashboardComponent from "@/components/ui/Dashboard";

export default function Home() {
  return (
    <main>
      <Navbar />
      <DashboardComponent />
      <Footer />
    </main>
  );
}
