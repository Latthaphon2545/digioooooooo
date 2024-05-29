"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDatabase } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/image/digio_logo.png";

const MENU = [
  {
    title: "User",
    links: [
      {
        name: "User",
        href: "/users?filter=&search=&skip=0&take=8",
      },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Model", href: "/products/models" },
      {
        name: "Product",
        href: "/products?filter=&search=&skip=0&take=8",
      },
    ],
  },
  {
    title: "Merchant",
    links: [
      {
        name: "Merchant",
        href: "/merchants?filter=&search=&skip=0&take=8",
      },
    ],
  },
  {
    title: "Bank",
    links: [
      {
        name: "Bank",
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

const Sidebar = () => {
  let pathName = usePathname();
  return (
    <div className="md:min-w-[14vw] h-screen flex flex-col justify-between max-h-screen items-center">
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

        {/* Profile */}
      </div>
    </div>
  );
};

export default Sidebar;
