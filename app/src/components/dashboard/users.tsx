import React, { useEffect, useState } from "react";
import { UserCard } from "./user-card";
import { IUser } from "@/models/user";
import { getAllUsers } from "@/utils/userRepository";

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/users`, {
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
  }, []);

  return (
    <div className="p-8 bg-ghost mb-2 space-y-8 max-h-[650px] overflow-y-auto">
      {users.map((user) => (
        <UserCard
          key={user._id}
          _id={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        />
      ))}

    </div>
  );
}
