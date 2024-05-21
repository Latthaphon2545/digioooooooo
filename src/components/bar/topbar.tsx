"use client";

import { FaDatabase } from "react-icons/fa";
import Profile from "./profileImg";
import Dropdown from "./dropdown";
import { PiCrownSimpleBold } from "react-icons/pi";

export default function Topbar() {
  return (
    <div className="w-full">
      <div className="navbar text-center h-2">
        {/* Logo */}
        <div className="flex-1 gap-2 ">
          <FaDatabase className="text-3xl" />
          <h1 className="text-3xl font-bold">DIGIOOO</h1>
        </div>

        {/* Profile */}
        <div className="flex-none gap-2">
          <div className="flex flex-col gap-0 text-right">
            <p className="text-lg font-bold">Latthaphon Permmanirat</p>
            <div className="flex flex-row gap-1 items-center justify-end">
              <PiCrownSimpleBold className="w-5 h-5" color="red" />
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
