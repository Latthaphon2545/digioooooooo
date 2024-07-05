import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="join join-vertical w-full mt-5 gap-2">
      <Link className={`btn join-item`} href="/setting/account">
        Account
      </Link>
      <Link className={`btn join-item`} href="/setting/changePassword">
        Change Password
      </Link>
      <Link className={`btn join-item`} href="/setting/theme">
        Theme
      </Link>
    </div>
  );
}
