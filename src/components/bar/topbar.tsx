"use client";

import { FaDatabase } from "react-icons/fa";
import Profile from "./profileImg";
import Dropdown from "./dropdown";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Topbar() {
  const pathName = usePathname();
  const splitPath = pathName.split("/");
  return (
    <div className="w-full">
      <div className="navbar text-center h-2">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/">
            <div className="flex flex-row items-center">
              <FaDatabase className="text-3xl" />
              <h1 className="text-3xl font-bold">DIGIOOO</h1>
            </div>
          </Link>
          <div className="text-ms breadcrumbs ml-6">
            <ul>
              {splitPath.map((item, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <li key={index}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Profile */}
        <div className="flex-none gap-2">
          <div className="flex flex-col gap-0 text-right">
            <p className="text-lg font-bold">Latthaphon Permmanirat</p>
            <div className="flex flex-row gap-1 items-center justify-end">
              <p className="text-sm">Admin</p>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Profile />
            </div>
            <Dropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
