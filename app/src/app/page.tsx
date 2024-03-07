import "@/styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getAllUsers } from "@/utils/db";
import { IUser } from "@/models/User";
import DeleteAccount from "@/components/ui/deleteAccount";

async function fetchUsers() {
  const result = await getAllUsers();
  if (result.success) {
    return result.value as IUser[];
  } else {
    return result.error.message;
  }
}
export default async function Home() {

  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}
