import React, { useEffect, useState } from "react";
import { UserCard } from "./user-card";

export default function Users() {
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("api/users", {
          cache: "no-store",
        });
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
      } catch (error) {

        console.log("Error loading users: ", error);
      }
    };

    fetchUsers();
 }, []); // Empty dependency array means this effect runs once on mount

 return (
    <div className="p-8 bg-ghost mb-2 space-y-8">
        {users.map((user) => (
          <UserCard key={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          />
        ))}

    </div>
 );
}
