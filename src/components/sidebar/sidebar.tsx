"use client";
import React from "react";
import ActionButton from "../actionButton";
import Profile from "./profile";
import DropdownRight from "../dropdownRight";
import { TbUserEdit } from "react-icons/tb";
import Alert from "../alert";
import { BiLogOut } from "react-icons/bi";

const MENU = [
  {
    title: "User",
    links: [
      { name: "User Management", href: "users/management" },
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
          <Profile />
          <ActionButton
            action={() => {}}
            styles="btn-success text-success-content text-base w-fit px-24 mb-5 mx-4"
          >
            <div className="flex flex-row justify-center items-center gap-3">
              <TbUserEdit className="w-8 h-8" />
              Edit
            </div>
          </ActionButton>
        </div>
        <div className="flex flex-col text-2xl mt-5 w-full">
          {MENU.map((item, index) => (
            <DropdownRight key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      {/* <ActionButton
        action={() => {}}
        styles="btn-error text-base-100 text-base w-fit px-[5rem] mb-4 mx-auto"
      >
        Logout
      </ActionButton> */}
      <Alert
        styles="btn-error text-base-100 text-base w-fit px-20 mb-4 mx-4 flex flex-col justify-center items-center"
        action={() => {}}
        alertHeader="You're about to logout"
        alertDescroption="Are you sure you want to logout?"
        id="logout"
      >
        <div className="flex flex-row justify-center items-center gap-3">
          <BiLogOut className="w-8 h-8" />
          Logout
        </div>
      </Alert>
    </div>
  );
};

export default Sidebar;
