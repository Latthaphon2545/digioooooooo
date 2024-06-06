"use client";

import SearchBar from "./search";
import DropdownBottom from "./fillter";

export default function Header({ Type }: { Type?: string }) {
  return (
    <>
      {Type !== "History" && (
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <SearchBar />
            {Type !== "Merchant" && <DropdownBottom />}
          </div>
          {Type !== "Merchant" && (
            <div>
              <div className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold gap-2">
                <p>All</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
