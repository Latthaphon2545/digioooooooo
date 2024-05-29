"use client";

import Profile from "./profileImg";
import Dropdown from "./dropdown";

export default function Topbar() {
  return (
    <div className="w-full">
      <div className="navbar text-center">
        {/* Logo */}
        <div className="flex-1">
          <div className="text-ms breadcrumbs">
            {/* <ul>
              {splitPath.map((item, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <li key={index}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </li>
                );
              })}
            </ul> */}
          </div>
        </div>

        {/* Profile */}
        <div className="flex-none gap-2">
          <div className="flex flex-col gap-0 text-right">
            <p className="text-lg font-bold">Latthaphon Permmanirat</p>
            <div className="flex flex-row gap-1 items-center justify-end">
              <p className="text-sm">Admin</p>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Profile />
            </div>
            <Dropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
