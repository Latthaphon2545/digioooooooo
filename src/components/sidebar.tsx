import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionButton from "./actionButton";

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
    <div className="bg-neutral max-w-64 h-lvh flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center">
          <div className="px-2 py-8 pb-4 flex flex-row items-center  gap-3">
            <Image
              src="/image/twon.jpeg"
              alt="twon's image"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-base-100 text-xl">Twon Sonsai</p>
              <p className="text-base-300 text-base">Admin</p>
            </div>
          </div>
          <ActionButton
            action={() => {}}
            styles="btn-info text-base-100 text-xl w-fit px-20 mb-5 mx-4"
          >
            Edit
          </ActionButton>
        </div>
        <div className="flex flex-col space-y-5 text-2xl mt-5">
          {MENU.map((item, index) => (
            <div key={index} className="dropdown dropdown-hover dropdown-right">
              <div
                tabIndex={0}
                role="button"
                className="btn w-full text-base rounded-none"
              >
                {item.title}
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-none w-52"
              >
                {item.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <ActionButton
        action={() => {}}
        styles="btn-error text-base-100 text-xl w-fit px-20 mb-5 mx-auto"
      >
        Logout
      </ActionButton>
    </div>
  );
};

export default Sidebar;
