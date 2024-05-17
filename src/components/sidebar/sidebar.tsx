import React from "react";
import ActionButton from "../actionButton";
import Profile from "./profile";
import DropdownRight from "../dropdownRight";

const Sidebar = () => {
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

  return (
    <div className="bg-slate-300 max-w-64 h-lvh flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center">
          <Profile />
          <ActionButton
            action={() => {}}
            styles="btn-info text-base-100 text-base w-fit px-24 mb-5 mx-4"
          >
            Edit
          </ActionButton>
        </div>
        <div className="flex flex-col space-y-5 text-2xl mt-5">
          {MENU.map((item, index) => (
            <DropdownRight key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <ActionButton
        action={() => {}}
        styles="btn-error text-base-100 text-base w-fit px-[5rem] mb-5 mx-auto"
      >
        Logout
      </ActionButton>
    </div>
  );
};

export default Sidebar;
