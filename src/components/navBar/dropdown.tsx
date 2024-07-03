"use client";

import { BiLogOut } from "react-icons/bi";
import Alert from "../alert";
import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";

const size = "h-6 w-6";

const userId = "66554e8534b8e2bb8f5f42d1";
export default function Dropdown() {
  const [theme, setTheme] = useState("");
  const router = useRouter();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "";
    setTheme(localTheme);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", localTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ul
      tabIndex={0}
      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
    >
      <li className="laptop:hidden menu-title">
        <div className="flex flex-row justify-between items-center mb-2">
          <p>Latthaphon Phoemmanirat</p>
          <p>Admin</p>
        </div>
      </li>

      <li className="m-1">
        <label
          onClick={() => {
            router.push(`/users/history/${userId}/?skip=0&take=7`);
          }}
        >
          <MdHistory className={size} />
          <p>History</p>
        </label>
      </li>

      {/* Settings */}
      <li className="m-1">
        <label onClick={() => router.push("/setting/account")}>
          <IoMdSettings className={size} />
          <p>Settings</p>
        </label>
      </li>

      {/* Theme */}
      <li className="m-1">
        <label className="justify-start flex flex-row">
          <label className="swap swap-rotate ">
            <input type="checkbox" onChange={handleTheme} />
            {theme === "light" ? sun : moon}
          </label>
          Dark mode {theme === "light" ? "off" : "on"}
        </label>
      </li>

      {/* Logout */}
      <li className="mt-5">
        <Alert
          styles="btn-error btn-sm text-base-100 text-sm w-44"
          action={() => {
            router.push("/login");
          }}
          alertHeader="You're about to logout"
          alertDescription="Are you sure you want to logout?"
          id="logout"
        >
          <div className="flex flex-row justify-center items-center gap-3">
            <BiLogOut className="w-fit h-5" />
            Logout
          </div>
        </Alert>
      </li>
    </ul>
  );
}

const sun = (
  <svg
    className={`swap-active	 fill-current ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>
);

const moon = (
  <svg
    className={`swap-active	 fill-current ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
);
