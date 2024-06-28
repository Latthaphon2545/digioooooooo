"use client";

import React from "react";
import Account from "./account/account";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SettingPage() {
  const param = useSearchParams();
  const mobile = param.get("mobile");

  return <>{!mobile ? <DesktopView /> : <MobileView />}</>;
}

const DesktopView = () => (
  <div className="hidden laptop:block">
    <div role="tablist" className="tabs tabs-bordered laptop:mx-5">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Account"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content p-10">
        <Account
          account={{
            email: "asd",
            password: "das",
            role: "asd",
            status: "asd",
            name: "asd",
            contact: "0949054456",
          }}
        />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Coming Soon Ja....."
      />
      <div role="tabpanel" className="tab-content p-10">
        Coming Soon Ja.........
      </div>
    </div>
  </div>
);

// Mobile View
const MobileView = () => (
  <div className="block laptop:hidden">
    <div className="join join-vertical w-full mt-2">
      <button className="btn btn-ghost join-item">
        <Link href="/setting/account">Account</Link>
      </button>
      <button className="btn btn-ghost join-item">
        Coming Soon Ja.........
      </button>
    </div>
  </div>
);
