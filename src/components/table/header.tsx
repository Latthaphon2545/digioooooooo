"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./search";
import DropdownBottom from "./fillter";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { decode, encode } from "@/lib/generateRandomHref";
import { itemPage } from "./staticPropsInTable";

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
  const pathName = usePathname();
  const params = useSearchParams();
  const [category, setCategory] = useState<Category[]>([]);
  const [series, setSeries] = useState([]);

  const { filter } = decode(params.toString());
  const skip = 0;
  const take = itemPage;

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

  const filterParamsArray = filter ? filter.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = e.target.value;
    const newUrl = `${pathName}?${encode(
      `filter=${filterParamsArray}&search=${searchParams}&skip=${skip}&take=${take}`
    )}`;
    router.replace(newUrl, { scroll: true });
  };

  return (
    <div className="flex items-center gap-3 mobile:my-5 mobile:justify-center laptop:mt-0 laptop:justify-normal">
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />
        {category.map((item, index) => (
          <DropdownBottom key={index} item={item} index={index} />
        ))}
      </div>
      <div className="items-center gap-3 mobile:hidden tablet:hidden laptop:flex">
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
