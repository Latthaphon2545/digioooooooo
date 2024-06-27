import SettingPage from "@/components/setting/settingPage";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="justify-between items-center mx-5 mt-5 mb-1 h-14  mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold">Setting</h1>
          </div>
          <div className="flex justify-end mx-5"></div>
        </div>
      </div>

      <SettingPage />
    </>
  );
}
