import React, { Suspense } from "react";
import NavBarSetting from "../navBar";
import ThemePage from "@/components/setting/theme/themePage";

export default function page() {
  return (
    <>
      <NavBarSetting />
      <div className="mb-1 mobile:mx-5 laptop:mx-10 laptop:mt-10 mobile:mt-2">
        <ThemePage />
      </div>
    </>
  );
}
