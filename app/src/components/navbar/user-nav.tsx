"use client";
// display login button if the use is not logged in and diplay user name and logout button if the user is logged in

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "@/components/navbar/logout";

export function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-black relative border-2 border-slate-500 shadow-sm bg-slate-200">
              {user.firstName} {user.lastName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Welcome</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href={`/user/${user?.id}`} className="w-full flex items-start">Profile</a>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <a href={`/viewreserve/${user?.id}`} className="w-full flex items-start">Manage reservations</a></DropdownMenuItem>
              </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <a href='/'> 
              <button onClick={() => signOut()} className="w-full flex items-start">Logout</button>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/signin">Login</Link>
        </Button>
      )}
    </div>
  );
}
