import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./search";
import DropdownBottom from "./dropdownFillter";
import { useState } from "react";

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

  const filterParams = useSearchParams().get("filter");
  const filterParamsArray = filterParams ? filterParams.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(
      `/users/management?filter=${filterParamsArray.join(",")}&search=${
        e.target.value
      }`
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        {filterParamsObjects.map((param) => (
          <div
            key={param.value}
            className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold"
          >
            {param.value}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        {CATEGORIES.map((item, index) => (
          <DropdownBottom key={index} item={item} index={index} />
        ))}
        <SearchBar handleSearch={handleSearch} />
      </div>
    </div>
  );
}
