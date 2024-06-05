import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({}: {}) {
  return (
    <div className="flex justify-end items-center">
      <label className="input input-sm w-[15vw] input-bordered flex items-center gap-2">
        <FaSearch />
        <input type="text" className="grow" placeholder="Search" />
      </label>
    </div>
  );
}
