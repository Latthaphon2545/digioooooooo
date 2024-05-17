"use client";
import Link from "next/link";
import React from "react";

type DropdownRightProps = {
  item: {
    title: string;
    links: {
      href: string;
      name: string;
    }[];
  };
  index: number;
};

const DropdownRight = ({ item, index }: DropdownRightProps) => {
  return (
    <>
      <div key={index} className="dropdown dropdown-hover dropdown-right">
        <div
          tabIndex={0}
          role="button"
          className="btn w-full text-base rounded-none flex justify-between items-center px-2 py-2 bg-base-100"
        >
          <span>{item.title}</span>
          <span>{">"}</span>
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
    </>
  );
};

export default DropdownRight;
