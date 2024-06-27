"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TabBarProps {
  Individual: JSX.Element;
  Group: JSX.Element;
}

export const TabBar = ({ Individual, Group }: TabBarProps) => {
  const searchParams = useSearchParams();
  const paramPage = searchParams.get("activeTab");

  const [activeTab, setActiveTab] = useState<"Individual" | "Group">(
    "Individual"
  );

  useEffect(() => {
    if (paramPage === null) {
      setActiveTab("Individual");
    }

    if (paramPage === "1") {
      setActiveTab("Group");
    } else {
      setActiveTab("Individual");
    }
  }, [paramPage]);

  return (
    <div role="tablist" className="tabs tabs-bordered w-full">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className={`tab w-full ${paramPage ? "hidden" : ""}`}
        aria-label="Individual"
        checked={activeTab === "Individual"}
        onChange={() => setActiveTab("Individual")}
      />
      <div
        role="tabpanel"
        className={`tab-content w-full ${
          activeTab === "Individual" ? "block" : "hidden"
        } ${!paramPage ? "px-10 mt-3" : "w-full  mx-auto"}`}
      >
        {Individual}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className={`tab ${paramPage ? "hidden" : ""}`}
        aria-label="Group"
        checked={activeTab === "Group"}
        onChange={() => setActiveTab("Group")}
      />
      <div
        role="tabpanel"
        className={`tab-content w-full ${
          activeTab === "Group" ? "block" : "hidden"
        } ${!paramPage && "px-10 mt-3"}`}
      >
        {Group}
      </div>
    </div>
  );
};
