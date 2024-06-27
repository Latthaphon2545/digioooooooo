"use client";

import React, { useState } from "react";
import { SideBarFull, SideBarSmall } from "./sideBar";
import Topbar from "./topBar";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const [openHamburgerDesktop, setOpenHamburgerDesktop] = useState(false);
  return (
    <>
      <div className="flex flex-col flex-grow">
        <Topbar
          openHamburgerDesktop={openHamburgerDesktop}
          setOpenHamburgerDesktop={setOpenHamburgerDesktop}
        />
        <div className="flex">
          <div className="mobile:hidden tablet:hidden laptop:block">
            {openHamburgerDesktop ? <SideBarSmall /> : <SideBarFull />}
          </div>
          <main className="flex-grow mx-5 box mobile:mt-16 laptop:mt-0">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
