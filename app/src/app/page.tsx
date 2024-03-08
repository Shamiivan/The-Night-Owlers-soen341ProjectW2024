import "@/styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getAllUsers } from "@/utils/userRepository";
import { IUser } from "@/models/User";

async function fetchUsers() {
  const result = await getAllUsers();
  if (result.success) {
    return result.value as IUser[];
  } else {
    return result.error.message;
  }
}
export default async function Home() {
  const result = await fetchUsers();
  const users = Array.isArray(result) ? result : [];
  console.log(users[0]._id?.toString());
  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}
