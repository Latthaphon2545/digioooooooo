"use client";

import Profile from "./profileImg";
import Dropdown from "./dropdown";

import { GiHamburgerMenu } from "react-icons/gi";
import logo from "/public/image/digio_logo.png";
import { useState } from "react";
import { HamburgerBar } from "./sidebar";

export default function Topbar() {
  const [openHamburger, setOpenHamburger] = useState(false);
  return (
    <div className="w-full">
      <div className="navbar text-center mobile:hidden tablet:hidden desktop:flex laptop:flex">
        <div className="flex-1">
          <div className="text-ms breadcrumbs"></div>
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

      <div className="navbar flex justify-between mobile:flex tablet:flex desktop:hidden laptop:hidden relative">
        <GiHamburgerMenu
          className="text-[4vh]"
          onClick={() => {
            setOpenHamburger(!openHamburger);
          }}
        />
        <img src={logo.src} alt="Digio" className="h-10" />
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
        {openHamburger && (
          <HamburgerBar
            setOpenHamburger={setOpenHamburger}
            openHamburger={openHamburger}
          />
        )}
      </div>
    </div>
  );
}
