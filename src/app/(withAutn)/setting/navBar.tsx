"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function NavBarSetting() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = React.useState(pathName);
  const [activeTabAccount, setActiveTabAccount] = React.useState(false);
  const [activeTabChangePassword, setActiveTabChangePassword] =
    React.useState(false);

  useEffect(() => {
    setActiveTab(pathName);
    if (pathName === "/setting/account") {
      setActiveTabAccount(true);
      setActiveTabChangePassword(false);
    } else if (pathName === "/setting/changePassword") {
      setActiveTabChangePassword(true);
      setActiveTabAccount(false);
    }
  }, [pathName]);

  return (
    <>
      <div className="flex flex-col mb-1 h-14 gap-2 mobile:mt-2 laptop:mt-10 mobile:mx-5 laptop:mx-5">
        <h1 className="text-3xl font-bold  mobile:hidden laptop:block">
          Setting
        </h1>
        <div role="tablist" className="tabs tabs-bordered flex">
          <Link
            role="tab"
            className={`tab w-32 ${activeTabAccount && "tab-active"}`}
            href="/setting/account"
          >
            Account
          </Link>
          <Link
            role="tab"
            className={`tab w-44 ${activeTabChangePassword && "tab-active"}`}
            href="/setting/changePassword"
          >
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
}
