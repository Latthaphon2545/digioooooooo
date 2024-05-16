import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionButton from "./actionButton";

const Sidebar = () => {
  return (
    <div className="bg-neutral max-w-64 h-lvh flex flex-col justify-between">
      {" "}
      {/* Add flex and justify-between here */}
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
          <div className="dropdown dropdown-hover dropdown-right">
            <div
              tabIndex={0}
              role="button"
              className="btn w-full text-base rounded-none"
            >
              User
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-none w-52"
            >
              <li>
                <Link href="users/management">User Management</Link>
              </li>
              <li>
                <Link href="/users/list">User List</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover dropdown-right">
            <div
              tabIndex={0}
              role="button"
              className="btn w-full text-base rounded-none"
            >
              Product
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-none w-52"
            >
              <li>
                <Link href="products/models">Model</Link>
              </li>
              <li>
                <Link href="/products/product">Product List</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ActionButton
        action={() => {}}
        styles="btn-error text-base-100 text-xl w-fit px-20 mb-5 mx-4"
      >
        Logout
      </ActionButton>
    </div>
  );
};

export default Sidebar;
