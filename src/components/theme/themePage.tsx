"use client";

import React, { useEffect, useState } from "react";
import { moon, sun } from "./icon";
import { getTheme, updateTheme } from "@/lib/actions/themeActions/actions";

export default function ThemePage() {
  const [theme, setTheme] = useState("");
  const [defaultTheme, setDefaultTheme] = useState(true);

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

  const handleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setDefaultTheme(false);
    await updateTheme(newTheme);
  };

  return (
    <label className="justify-start flex flex-row">
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          onChange={handleTheme}
          checked={theme === "dark"}
        />
        {theme === "light" ? sun : moon}
      </label>
      {theme === "light" ? "Light" : "Dark"}
      {defaultTheme && <span className="text-primary"> (Default)</span>}
    </label>
  );
}
