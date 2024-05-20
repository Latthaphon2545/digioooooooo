"use client";
import React from "react";
import Profile from "./profile";
import DropdownRight from "../dropdownRight";
import Alert from "../alert";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";

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
      { name: "Product", href: "/products/list" },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="bg-neutral md:min-w-72 h-auto flex flex-col justify-between items-center">
      <div className="w-full">
        <div className="flex flex-col items-center">
          {/* <Profile /> */}
          <Image
            className="text-4xl font-bold mt-5 mb-1"
            src="/image/digio_logo.png"
            alt={"Digiooo"}
            width={174}
            height={106}
          ></Image>
        </div>
        <div className="flex flex-col text-2xl mt-5 w-full">
          {MENU.map((item, index) => (
            <DropdownRight key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Profile />
        <Alert
          styles="btn-error btn-sm text-base-100 text-sm w-fit px-20 mb-4 flex flex-col justify-center items-center"
          action={() => {}}
          alertHeader="You're about to logout"
          alertDescroption="Are you sure you want to logout?"
          id="logout"
        >
          <div className="flex flex-row justify-center items-center gap-3">
            <BiLogOut className="w-5 h-5" />
            Logout
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default Sidebar;
