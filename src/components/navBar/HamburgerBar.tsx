"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { MENU } from "./menu";
import Image from "next/image";
import logo from "/public/image/digio_logo.png";
import { usePathname } from "next/navigation";

const editor = true;

export const HamburgerBar = ({
  openHamburger,
  setOpenHamburger,
}: {
  openHamburger: boolean;
  setOpenHamburger: (value: boolean) => void;
}) => {
  let pathName = usePathname();

  useEffect(() => {
    if (openHamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openHamburger]);

  return (
    <div className="fixed top-0 left-0 h-full w-full ">
      {/* Background overlay */}
      <div
        className={`absolute top-0 left-0 w-full z-30 h-full bg-black opacity-50 overflow-hidden${
          openHamburger ? "block" : "hidden"
        }`}
        onClick={() => setOpenHamburger(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full z-40 mobile:w-[70%] tablet:w-[60%] bg-base-100  flex flex-col items-center transform transition-transform duration-500 ease-in-out 
          ${openHamburger ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex flex-row items-center justify-center my-5">
          <Link href="/" onClick={() => setOpenHamburger(!openHamburger)}>
            <Image src={logo} alt="Digio" width={150} />
          </Link>
        </div>
        <div className="flex flex-col text-2xl w-full px-3">
          {MENU.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <div className="divider m-2"></div>}
              <div className="flex flex-col gap-2">
                {item.links.map((link, linkIndex) => {
                  const url = link.href.split("?")[0];
                  const currentPath = pathName.split("/");

                  if (
                    pathName !== "/products/models" &&
                    pathName !== "/action/checkStock" &&
                    pathName !== "/action/changeStatus"
                  ) {
                    pathName = `/${currentPath[1]}`;
                  }

                  const isActive = pathName === url;
                  const activeStyle = isActive
                    ? "bg-primary text-white border-primary font-bold"
                    : "hover:bg-primary hover:text-white hover:border-primary border-transparent font-light";

                  if (editor || !link.href.startsWith("/action")) {
                    return (
                      <Link href={link.href} key={linkIndex}>
                        <button
                          className={`w-full flex gap-3 items-center rounded text-sm py-2 px-2 text-left border-l-4 border-transparent ${activeStyle}`}
                          key={linkIndex}
                          onClick={() => setOpenHamburger(!openHamburger)}
                        >
                          <p className="text-lg">{link.icon}</p>
                          {link.name}
                        </button>
                      </Link>
                    );
                  } else {
                    return (
                      <button
                        className={`w-full rounded text-sm py-2 px-2 text-left border-l-4 bg-gray-200 text-gray-400 cursor-not-allowed`}
                        key={linkIndex}
                        disabled={true}
                        onClick={() => setOpenHamburger(!openHamburger)}
                      >
                        {link.name}
                      </button>
                    );
                  }
                })}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
