import React from "react";
import { Button } from "./button";
import Link from 'next/link';
import Image from 'next/image'


const Navbar: React.FC = () => {
  return (
    <div className="bg-blue-300 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-1 px-20">
        <a href="" className="flex items-center">
        <div>
    <Image src="/logo.png" alt="Car" width={"100"} height={100} />
    </div>
        </a>
        <div></div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 items-center">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Home
              </a>
            </li>
            <li>
            <Link href="/vehicles" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Rent
            </Link>
          </li>
            <li>
              <a href="/ReservationList" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Manage
              </a>
            </li>
            <li>
              <a href="admin/users" className="block py-10 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Admin 
              </a>
            </li>
            <li>
              <a href="#Help" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Help
              </a>
            </li>
            <li>
              <a href="#Contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Contact
              </a>
            </li>
            <li>
            <Button asChild>
              <Link href="/signin">Login</Link>
            </Button>
            </li>
            <li>
            <Button asChild className="bg-slate-500 hover:bg-blue-600">
              <Link href="/signUp">Sign in</Link>
            </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
)};
export default Navbar;

