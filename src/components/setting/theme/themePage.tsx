"use client";

import React, { useEffect, useState } from "react";
import { getTheme, updateTheme } from "@/lib/actions/themeActions/actions";
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb";

const arrayTheme = ["dark", "light", "Use Device"];

export default function ThemePage() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const initializeTheme = async () => {
      const initialTheme = await getTheme();
      if (initialTheme) {
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "");
      }
    };
    initializeTheme();
  }, []);

  const handleTheme = async (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    await updateTheme(newTheme);
  };

  const divCard = (themeTitle: string) => {
    const themeCurrent = themeTitle === "" ? "Use Device" : themeTitle;

    return (
      <div
        className={`card bg-base-100 laptop:w-[30%] mobile:w-full h-fit shadow-md ${
          theme === themeCurrent ? "border-2  border-primary" : ""
        } hover:shadow-lg hover:shadow-primary`}
        onClick={() => handleTheme(themeCurrent)}
      >
        <div className="card-body flex-row items-center">
          <h1 className="text-xl">
            {themeCurrent === "dark" ? (
              <TbMoon />
            ) : themeCurrent === "light" ? (
              <TbSun />
            ) : (
              <TbSunMoon />
            )}
          </h1>
          <h2 className="card-title">
            {themeCurrent.toUpperCase()[0] + themeCurrent.slice(1)} Theme
          </h2>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex laptop:flex-row mobile:flex-col gap-2 justify-between">
        {arrayTheme.map((themeTitle) => divCard(themeTitle))}
      </div>
    </>
  );
}
