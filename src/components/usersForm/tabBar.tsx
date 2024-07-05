"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TabBarProps {
  Individual: JSX.Element;
  Group: JSX.Element;
  activeTab: number;
  setActiveTab: (value: number) => void;
}

export const TabBar = ({
  Individual,
  Group,
  activeTab,
  setActiveTab,
}: TabBarProps) => {
  const searchParams = useSearchParams();
  const paramPage = Number(searchParams.get("activeTab"));

  useEffect(() => {
    if (paramPage === null) {
      setActiveTab(0);
    }

    if (paramPage === 1) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [paramPage, setActiveTab]);

  return (
    <div role="tablist" className="tabs tabs-bordered w-full ">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className={`tab w-full ${paramPage ? "hidden" : ""} hidden sm:block`}
        aria-label="Individual"
        checked={activeTab === 0}
        onChange={() => setActiveTab(0)}
      />
      <div
        role="tabpanel"
        className={`tab-content w-full ${
          activeTab === 0 ? "block mx-auto" : "hidden"
        } ${!paramPage ? "px-10 mt-3" : "w-full  mx-auto"}`}
      >
        {Individual}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className={`tab ${paramPage ? "hidden" : ""} hidden sm:block`}
        aria-label="Group"
        checked={activeTab === 1}
        onChange={() => setActiveTab(1)}
      />
      <div
        role="tabpanel"
        className={`tab-content w-full ${
          activeTab === 1 ? "block" : "hidden"
        } ${!paramPage && "px-10 mt-3"}`}
      >
        {Group}
      </div>
    </div>
  );
};
