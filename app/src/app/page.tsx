import "@/styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// add typedoc comment to the function  to generate documentation
/**
 * Home page
 * @returns {JSX.Element} JSX.Element
 */

export default function Home() {
  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}
