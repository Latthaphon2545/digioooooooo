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
      { name: "User Management", href: "/users/management" },
      { name: "User List", href: "/users/list" },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Model", href: "/products/models" },
      {
        name: "Product Management",
        href: "/products/management",
      },
      { name: "Product List", href: "/products/list" },
    ],
  },
  {
    title: "Action",
    links: [
      { name: "Check Stock", href: "" },
      { name: "Change Status", href: "" },
    ],
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="md:min-w-[14vw] h-screen flex flex-col justify-between max-h-screen items-center">
      <div className="w-full">
        <div className="flex flex-row items-center justify-center my-7">
          <Link href="/">
            {/* <div className="flex flex-row items-center">
              <FaDatabase className="text-4xl" />
              <h1 className="text-4xl font-bold">DIGIOOO</h1>
            </div> */}
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
              {item.links.map((link, linkIndex) => {
                const isActive = pathName === link.href;
                const activeStyle = isActive
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-primary hover:text-white hover:border-primary border-transparent";
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
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Profile */}
      </div>
    </div>
  );
};

export default Sidebar;
