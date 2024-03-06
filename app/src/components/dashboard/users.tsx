import React, { useEffect, useState } from "react";
import { UserCard } from "./user-card";
import { IUser } from "@/models/User";

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("api/users", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        const users = Array.isArray(data.value) ? data.value : [];
        setUsers(users);
      } catch (error) {

        console.log("Error loading users: ", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="p-8 bg-ghost mb-2 space-y-8">
      {users.map((user) => (
        <UserCard
          key={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        />
      ))}

    </div>
  );
}
