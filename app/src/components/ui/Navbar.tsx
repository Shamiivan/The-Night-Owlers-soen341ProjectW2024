import React from "react";
import { Button } from "./button";
const Navbar: React.FC = () => {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-4 px-20">
        <a href="" className="flex items-center">
            <img src="" className="h-8" alt="Car Rental Logo" />
        </a>
        <div></div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
            <li>
              <a href="" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#Rent" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Rent
              </a>
            </li>
            <li>
              <a href="#Manage" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Manage
              </a>
            </li>
            <li>
              <a href="#CheckInOut" className="block py-10 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Check-In/Out
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
              <Button>
                fr
              </Button>
            </li>
            <li>
              <Button>
                Login
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
)};

export default Navbar;

