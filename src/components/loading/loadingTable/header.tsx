"use client";

import SearchBar from "./search";
import DropdownBottom from "./fillter";

export default function Header({ Type }: { Type?: string }) {
  return (
    <>
      {Type !== "History" && Type !== "User_History" && (
        <div className="flex items-center gap-3 mobile:my-5 mobile:justify-center laptop:mt-0 laptop:justify-normal">
          <div className="flex items-center">
            <SearchBar />
            {Type !== "Merchant" && <DropdownBottom />}
          </div>
        </div>
      )}
    </>
  );
}
