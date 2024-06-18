import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function FloatingActionButton() {
  return (
    // <button className="btn btn-circle bottom-5 right-3 btn-lg btn-primary z-50 mobile:fixed laptop:hidden">
    //   <IoMdAdd size={20} />
    // </button>
    <div className="dropdown dropdown-top dropdown-end bottom-5 right-3 rounded-xl z-40 mobile:fixed laptop:hidden">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-primary btn-lg m-1"
      >
        <IoMdAdd className="text-2xl" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="/users/add?activeTab=0">Individual</a>
        </li>
        <li>
          <a href="/users/add?activeTab=1">Group Upload</a>
        </li>
      </ul>
    </div>
  );
}
