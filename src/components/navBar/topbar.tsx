"use client";

import React, { useState } from "react";
import Profile from "./profileImg";
import Dropdown from "./dropdown";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "/public/image/digio_logo.png";
import { usePathname } from "next/navigation";
import { pathMenu } from "./pathMenu";
import { HamburgerBar } from "./HamburgerBar";
import Image from "next/image";
import Link from "next/link";

interface TopbarProps {
  openHamburgerDesktop?: boolean;
  setOpenHamburgerDesktop?: (value: boolean) => void;
}

export default function Topbar({
  openHamburgerDesktop,
  setOpenHamburgerDesktop,
}: TopbarProps) {
  const [openHamburgerMobile, setOpenHamburgerMobile] = useState(false);
  const pathName = usePathname();

  return (
    <div className="w-full">
      <div className="navbar text-center mobile:hidden tablet:hidden desktop:flex laptop:flex">
        <div className="flex-1 gap-5">
          <button
            className="text-[3vh] btn btn-ghost btn-circle"
            onClick={() => {
              if (setOpenHamburgerDesktop) {
                setOpenHamburgerDesktop(!openHamburgerDesktop);
              }
            }}
          >
            <GiHamburgerMenu />
          </button>
          <Link href="/">
            <Image src={logo} alt="Digio" width={100} />
          </Link>
        </div>
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
          onClick={() => setOpenHamburgerMobile(!openHamburgerMobile)}
        />
        {pathName === "/" ? (
          <img src={logo.src} alt="Digio" className="h-10" />
        ) : (
          <p className="text-lg font-bold">{pathMenu(pathName)}</p>
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
        {openHamburgerMobile && (
          <HamburgerBar
            setOpenHamburger={setOpenHamburgerMobile}
            openHamburger={openHamburgerMobile}
          />
        )}
      </div>
    </div>
  );
}
