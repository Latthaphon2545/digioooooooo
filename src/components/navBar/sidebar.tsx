"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "./menu";

const editor = true;

export const SideBarFull = () => {
  let pathName = usePathname();
  return (
    <div className="h-screen flex flex-col justify-between max-h-screen items-center mt-4 laptop:w-[14vw] desktop:w-[12vw]">
      <div className="w-full">
        {/* Menu */}
        <div className="flex flex-col text-2xl w-full px-3">
          {MENU.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <div className="divider m-2"></div>}
              <div className="flex flex-col gap-2">
                {item.links.map((link, linkIndex) => {
                  const url = link.href.split("?")[0];
                  const currentPath = pathName.split("/");

                  if (
                    pathName !== "/products/models" &&
                    pathName !== "/action/checkStock" &&
                    pathName !== "/action/changeStatus"
                  ) {
                    pathName = `/${currentPath[1]}`;
                  }

                  const isActive = pathName === url;
                  const activeStyle = isActive
                    ? "bg-primary text-white border-primary font-bold"
                    : "hover:bg-primary hover:text-white hover:border-primary hover:font-bold border-transparent font-light";

                  if (editor || !link.href.startsWith("/action")) {
                    return (
                      <Link href={link.href} key={linkIndex}>
                        <button
                          className={`w-full flex gap-3 items-center rounded text-sm py-2 px-2 text-left border-l-4 ${activeStyle}`}
                          key={linkIndex}
                        >
                          <p className="text-xl">{link.icon}</p>
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

export const SideBarSmall = () => {
  let pathName = usePathname();
  const sliceMenu = [MENU[0], MENU[1], MENU[2], MENU[5]];
  return (
    <div className="h-screen flex flex-col justify-between max-h-screen items-center laptop:w-[3vw]">
      <div className="w-full">
        {/* Menu */}
        <div className="flex flex-col px-3 gap-2">
          {sliceMenu.map((item, index) => (
            <React.Fragment key={index}>
              {item.links.map((link, linkIndex) => {
                if (editor || !link.href.startsWith("/action")) {
                  const url = link.href.split("?")[0];
                  const currentPath = pathName.split("/");

                  if (
                    pathName !== "/products/models" &&
                    pathName !== "/action/checkStock" &&
                    pathName !== "/action/changeStatus"
                  ) {
                    pathName = `/${currentPath[1]}`;
                  }

                  const isActive = pathName === url;
                  const activeStyle = isActive
                    ? "text-primary font-bold"
                    : "hover:text-primary  font-light";

                  return (
                    <Link href={link.href} key={linkIndex}>
                      <button
                        className={`btn btn-circle btn-lg btn-ghost flex flex-col gap-1 items-center ${activeStyle}`}
                        key={linkIndex}
                      >
                        <p className="text-xl">{link.icon}</p>
                        <p className="text-xs">{link.name}</p>
                      </button>
                    </Link>
                  );
                } else {
                  return (
                    <button
                      className={`btn btn-circle btn-ghost bg-gray-200 text-gray-400 cursor-not-allowed`}
                      key={linkIndex}
                      disabled={true}
                    >
                      <p className="text-xl">{link.icon}</p>
                      <p className="text-xs">{link.name}</p>
                    </button>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
