import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/card/Avatar";
import { UserCard } from "@/components/dashboard/user-card";
import { IUser } from "@/models/User";
import { getAllUsers } from "@/utils/db";

async function fetchUsers() {
  const result = await getAllUsers();
  if (result.success) {
    return result.value as IUser[];
  } else {
    return result.error.message;
  }
}

export default async function Users() {
  const result = await fetchUsers();
  const users = Array.isArray(result) ? result : [];

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
