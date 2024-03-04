// app/about/page.js
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/utils/db';
import { IUser } from '@/models/User';

async function fetchUsers() {
    const result = await getAllUsers();
    if (result.success) {
        return result.value as IUser[];

    } else {
        return result.error.message;
    }
}

export default async function About() {
    const result = await fetchUsers();
    const users = Array.isArray(result) ? result : [];
    return (
        <div>
            <h1>About Us</h1>
            <ul>
                {users.map((user: IUser) => (
                    <li key={user._id}>
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
