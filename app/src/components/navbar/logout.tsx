import { signOut } from "next-auth/react";

export function LogoutButton() {
 const handleLogout = () => {
    signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
 };

 return (
    <button onClick={handleLogout}>Logout</button>
 );
}
