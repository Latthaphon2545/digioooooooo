import React from "react";
import NavBarSetting from "../navBar";
import { PasswordChange } from "@/components/setting/changePassword/password";

const email = "1@digio.co.th";
const name = "Latthaphon123";
const userId = "6650666b7e05719e52aabefd";

export default function Page() {
  return (
    <>
      <NavBarSetting />
      <div className="mb-1 mobile:mx-5 laptop:mx-10 laptop:mt-10 mobile:mt-2">
        <PasswordChange email={email} name={name} userId={userId} />
      </div>
    </>
  );
}
