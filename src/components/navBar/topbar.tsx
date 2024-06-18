"use client";

import Profile from "./profileImg";
import Dropdown from "./dropdown";

import { GiHamburgerMenu } from "react-icons/gi";
import logo from "/public/image/digio_logo.png";
import { useState } from "react";
import { HamburgerBar } from "./sidebar";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const pathName = usePathname();
  return (
    <div className="w-full shadow-lg">
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

      <div className="navbar flex justify-between mobile:flex tablet:flex desktop:hidden laptop:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-lg">
        <GiHamburgerMenu
          className="text-[4vh]"
          onClick={() => {
            setOpenHamburger(!openHamburger);
          }}
        />
        {pathName === "/" ? (
          <img src={logo.src} alt="Digio" className="h-10" />
        ) : (
          <p className="text-lg font-bold">{MENU(pathName)}</p>
        )}
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

const MENU = (pathname: string) => {
  if (pathname === "/") {
    return "Home";
  } else if (pathname === "/users") {
    return "Users";
  } else if (pathname === "/products") {
    return "Products";
  } else if (pathname === "/products/models") {
    return "Models";
  } else if (pathname === "/merchants") {
    return "Merchants";
  } else if (pathname === "/banks") {
    return "Banks";
  } else if (pathname === "/action/checkStock") {
    return "Check Stock";
  } else if (pathname === "/action/changeStatus") {
    return "Change Status";
  }
};
