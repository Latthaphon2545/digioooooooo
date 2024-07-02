import React from "react";
import NavBarSetting from "../navBar";
import { PasswordChange } from "@/components/setting/changePassword/password";

export default function page() {
  return (
    <>
      <NavBarSetting />
      <div className="mb-1 mobile:mx-5 laptop:mx-10 laptop:mt-10 mobile:mt-2">
        <PasswordChange />
      </div>
    </>
  );
}
