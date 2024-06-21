import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

type floatingActionButtonProps = {
  page: "user" | "product" | "merchant" | "model";
};

export default function FloatingActionButton({
  page,
}: floatingActionButtonProps) {
  const getIndividualHref = (page: string): string => {
    switch (page) {
      case "user":
        return "/users/add?activeTab=0";
      case "product":
        return "/products/add?activeTab=0";
      case "merchant":
        return "/merchants/add?activeTab=0";
      default:
        return "/";
    }
  };

  const getGroupUploadHref = (page: string): string => {
    switch (page) {
      case "user":
        return "/users/add?activeTab=1";
      case "product":
        return "/products/add?activeTab=1";
      case "merchant":
        return "/merchants/add?activeTab=1";
      default:
        return "/";
    }
  };

  return (
    // <button className="btn btn-circle bottom-5 right-3 btn-lg btn-primary z-50 mobile:fixed laptop:hidden">
    //   <IoMdAdd size={20} />
    // </button>
    <div>
      {page === "model" ? (
        <Link
          href={"/products/models/add"}
          className="bottom-5 right-3 z-40 mobile:fixed laptop:hidden btn btn-circle btn-primary btn-lg m-1"
        >
          <IoMdAdd className="text-2xl" />
        </Link>
      ) : (
        <div className="dropdown dropdown-top dropdown-end mobile:bottom-2 tablet:bottom-5 right-3 rounded-xl z-50 mobile:fixed laptop:hidden">
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
              <Link href={getIndividualHref(String(page))}>Individual</Link>
            </li>
            <li>
              <Link href={getGroupUploadHref(String(page))}>Group Upload</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
