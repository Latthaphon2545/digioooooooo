"use client";

import React, { useEffect, useState } from "react";
import { SideBarFull, SideBarSmall } from "./sideBar";
import Topbar from "./topBar";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const [openHamburgerDesktop, setOpenHamburgerDesktop] = useState(true);

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="fixed flex flex-row top-0 w-full z-10 bg-base-100 ">
          <Topbar
            openHamburgerDesktop={openHamburgerDesktop}
            setOpenHamburgerDesktop={setOpenHamburgerDesktop}
          />
        </div>

        <div className="flex">
          <div
            className={`mobile:hidden tablet:hidden laptop:block fixed h-full z-10 left-0 bg-base-100 top-14`}
          >
            {openHamburgerDesktop ? <SideBarSmall /> : <SideBarFull />}
          </div>
          <main
            className={`flex-grow box mobile:mt-16 laptop:mt-12 ${
              openHamburgerDesktop ? "laptop:ml-20" : "laptop:ml-52"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
