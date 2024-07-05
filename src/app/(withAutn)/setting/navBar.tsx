"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function NavBarSetting() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = React.useState("");

  useEffect(() => {
    setActiveTab(pathName);
  }, [pathName]);

  return (
    <>
      <div className="flex flex-col mb-1 h-14 gap-2 laptop:mt-10 laptop:mx-5 mobile:hidden laptop:block">
        <h1 className="text-3xl font-bold">Setting</h1>
        <div role="tablist" className="tabs tabs-bordered flex w-[80%]">
          <Link
            role="tab"
            className={`tab w-32 ${
              activeTab === "/setting/account" && "tab-active"
            }`}
            href="/setting/account"
          >
            Account
          </Link>
          <Link
            role="tab"
            className={`tab w-44 ${
              activeTab === "/setting/changePassword" && "tab-active"
            }`}
            href="/setting/changePassword"
          >
            Change Password
          </Link>
          <Link
            role="tab"
            className={`tab w-44 ${
              activeTab === "/setting/theme" && "tab-active"
            }`}
            href="/setting/theme"
          >
            Theme
          </Link>
        </div>
      </div>

      <div className="mobile:block laptop:hidden mt-5"></div>
    </>
  );
}
