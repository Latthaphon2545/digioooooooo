"use client";

import { encode } from "@/lib/generateRandomHref";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdHistory, MdOutlineDevicesOther } from "react-icons/md";
import { RxBoxModel } from "react-icons/rx";
import { FaShop } from "react-icons/fa6";
import { AiFillBank } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

export const MENU = [
  {
    title: "Home",
    links: [
      {
        name: "Home",
        href: "/",
        icon: <IoMdHome />,
      },
    ],
  },
  {
    title: "User",
    links: [
      {
        name: "Users",
        href: `/users?${encode("filter=&search=&skip=0&take=7")}`,
        icon: <FaUser />,
      },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Models", href: "/products/models", icon: <RxBoxModel /> },
      {
        name: "Products",
        href: `/products?${encode("filter=&search=&skip=0&take=7")}`,
        icon: <MdOutlineDevicesOther />,
      },
    ],
  },
  {
    title: "Merchant",
    links: [
      {
        name: "Merchants",
        href: `/merchants?${encode("filter=&search=&skip=0&take=7")}`,
        icon: <FaShop />,
      },
    ],
  },
  {
    title: "Bank",
    links: [
      {
        name: "Banks",
        href: "/banks",
        icon: <AiFillBank />,
      },
    ],
  },
  {
    title: "Action",
    links: [
      {
        name: "Check Stock",
        href: "/action/checkStock",
        icon: <FaClipboardCheck />,
      },
      {
        name: "Change Status",
        href: "/action/changeStatus",
        icon: <MdOutlinePublishedWithChanges />,
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        name: "My History",
        href: "/action/checkStock",
        icon: <MdHistory />,
      },
      {
        name: "Setting",
        href: "/setting/account",
        icon: <IoMdSettings />,
      },
    ],
  },
];
