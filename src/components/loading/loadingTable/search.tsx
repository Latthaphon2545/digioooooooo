import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({}: {}) {
  return (
    <div className="flex justify-end items-center">
      <label className="input input-sm w-64 input-bordered flex items-center gap-2 ">
        <FaSearch />
        <input type="text" className="grow" placeholder="Search" />
        <div className="mobile:hidden laptop:flex gap-2">
          <kbd className="kbd kbd-xs bg-transparent">⌘</kbd>
          <kbd className="kbd kbd-xs bg-transparent">K</kbd>
        </div>
      </label>
    </div>
  );
}
