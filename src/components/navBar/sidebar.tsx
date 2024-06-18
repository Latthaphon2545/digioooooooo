"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "/public/image/digio_logo.png";

export const MENU = [
  {
    title: "User",
    links: [
      {
        name: "Users",
        href: "/users?filter=&search=&skip=0&take=7",
      },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Models", href: "/products/models" },
      {
        name: "Products",
        href: "/products?filter=&search=&skip=0&take=7",
      },
    ],
  },
  {
    title: "Merchant",
    links: [
      {
        name: "Merchants",
        href: "/merchants?filter=&search=&skip=0&take=7",
      },
    ],
  },
  {
    title: "Bank",
    links: [
      {
        name: "Banks",
        href: "/banks?skip=&take=",
      },
    ],
  },
  {
    title: "Action",
    links: [
      { name: "Check Stock", href: "/action/checkStock" },
      { name: "Change Status", href: "/action/changeStatus" },
    ],
  },
];

const editor = true;

export const Sidebar = () => {
  let pathName = usePathname();
  return (
    <div className="h-screen flex flex-col justify-between max-h-screen items-center w-[16vw] shadow-lg">
      <div className="w-full">
        <div className="flex flex-row items-center justify-center my-7">
          <Link href="/">
            <Image src={logo} alt="Digio" width={150} />
          </Link>
        </div>

        {/* Menu */}
        <div className="flex flex-col text-2xl w-full px-3">
          {MENU.map((item, index) => (
            <React.Fragment key={index}>
              <div className="divider divider-start text-xs font-bold text-primary">
                {item.title}
              </div>
              <div className="flex flex-col gap-2">
                {item.links.map((link, linkIndex) => {
                  const url = link.href.split("?")[0];
                  const currentPath = pathName.split("/");

                  if (pathName !== "/products/models") {
                    pathName = `/${currentPath[1]}`;
                  }

                  const isActive = pathName === url;
                  const activeStyle = isActive
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-primary hover:text-white hover:border-primary border-transparent";

                  if (editor || !link.href.startsWith("/action")) {
                    return (
                      <Link href={link.href} key={linkIndex}>
                        <button
                          className={`w-full rounded text-sm py-2 px-2 text-left border-l-4 ${activeStyle}`}
                          key={linkIndex}
                        >
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

export const HamburgerBar = ({
  openHamburger,
  setOpenHamburger,
}: {
  openHamburger: boolean;
  setOpenHamburger: (value: boolean) => void;
}) => {
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
    <div className="fixed top-0 left-0 h-full w-full z-50 ">
      {/* Background overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-50 ${
          openHamburger ? "block" : "hidden"
        }`}
        onClick={() => setOpenHamburger(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full mobile:w-[55%] tablet:w-[40%] bg-white flex flex-col items-center transform transition-transform duration-500 ease-in-out 
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
              <div className="divider divider-start text-xs font-bold text-primary">
                {item.title}
              </div>
              <div className="flex flex-col gap-2">
                {item.links.map((link, linkIndex) => {
                  if (editor || !link.href.startsWith("/action")) {
                    return (
                      <Link href={link.href} key={linkIndex}>
                        <button
                          className={`w-full rounded text-sm py-2 px-2 text-left border-l-4`}
                          key={linkIndex}
                          onClick={() => setOpenHamburger(!openHamburger)}
                        >
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
