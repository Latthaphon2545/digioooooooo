"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./usersSearch";
import DropdownBottom from "./usersFillter";
import { FaRegTrashAlt } from "react-icons/fa";

const CATEGORIES = [
  {
    title: "User",
    list: [
      {
        title: "Status",
        names: [
          { name: "Active", action: () => {} },
          { name: "Inactive", action: () => {} },
          { name: "Restricted", action: () => {} },
          { name: "Pending", action: () => {} },
        ],
      },
      {
        title: "Role",
        names: [
          { name: "Admin", action: () => {} },
          { name: "Operator", action: () => {} },
          { name: "Call Center", action: () => {} },
        ],
      },
    ],
  },
];

export default function Header({}) {
  const router = useRouter();
  const pathname = usePathname();

  const filterParams = useSearchParams().get("filter");
  const filterParamsArray = filterParams ? filterParams.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  const searchParams = useSearchParams().get("search");

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(
      `${pathname}?filter=${filterParamsArray.join(",")}&search=${
        e.target.value
      }`
    );
  };

  const handleDeleteFilter = (index: number) => {
    const newFilterParamsArray = filterParamsArray.filter(
      (_, i) => i !== index
    );
    router.push(
      `${pathname}?filter=${newFilterParamsArray.join(
        ","
      )}&search=${searchParams}`
    );
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />
        {CATEGORIES.map((item, index) => (
          <DropdownBottom key={index} item={item} index={index} />
        ))}
      </div>
      <div>
        {filterParamsObjects.map((param) => (
          <div
            key={param.value}
            className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold gap-2"
          >
            <p>{param.value}</p>
            {!filterParamsObjects.some((param) => param.value === "All") && (
              <p
                className="cursor-pointer"
                onClick={() => handleDeleteFilter(0)}
              >
                <FaRegTrashAlt color="red" />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
