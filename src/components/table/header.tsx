"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./search";
import DropdownBottom from "./fillter";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const CATEGORIES = (option: string, series: string[]) => {
  if (option === "User") {
    return [
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
  } else if (option === "Product") {
    return [
      {
        title: "Product",
        list: [
          {
            title: "Status",
            names: [
              { name: "In Stock", action: () => {} },
              { name: "Installed", action: () => {} },
              { name: "Installing", action: () => {} },
              { name: "Waiting for Repair", action: () => {} },
              { name: "Reparing", action: () => {} },
              { name: "Damaged", action: () => {} },
              { name: "Lost", action: () => {} },
            ],
          },
          {
            title: "Models",
            names: series.map((series) => ({
              name: series,
              action: () => {},
            })),
          },
        ],
      },
    ];
  }
  return [];
};

interface Category {
  title: string;
  list: {
    title: string;
    names: { name: string; action: () => void }[];
  }[];
}

export default function Header({ option }: { option: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [category, setCategory] = useState<Category[]>([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      let updatedSeries = [];
      if (option === "Product") {
        const res = await axios.get("/api/model/getNameAndIdModel");
        updatedSeries = res.data.seriesModel;
        setSeries(updatedSeries);
      }
      setCategory(CATEGORIES(option, updatedSeries));
    };
    getCategories();
  }, [option]);

  const filterParams = params.get("filter");
  const skipParams = params.get("skip");
  const takeParams = params.get("take");

  const filterParamsArray = filterParams ? filterParams.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(
      `${pathname}?filter=${filterParamsArray.join(",")}&search=${
        e.target.value
      }&skip=${skipParams}&take=${takeParams}`
    );
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />
        {category.map((item, index) => (
          <DropdownBottom key={index} item={item} index={index} />
        ))}
      </div>
      <div>
        {category.length > 0 && (
          <>
            {filterParamsObjects.map((param) => (
              <div
                key={param.value}
                className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold gap-2"
              >
                <p>{param.value}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
