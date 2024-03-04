import React, { useEffect, useState } from 'react';
import UserCard from "@/components/Dashboard/UserCard";

export default function UserIndex() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setUsers(data.data);
                } else {
                    console.error('Failed to fetch users:', data.error);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {users.map((user) => (
                    <UserCard  />
                ))}
            </div>
        </div>
    );
}
