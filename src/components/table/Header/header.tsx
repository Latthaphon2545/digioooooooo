"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./search";
import DropdownBottom from "./fillter";
import { useEffect, useState, useCallback } from "react";
import { decode, encode } from "@/lib/generateRandomHref";
import { itemPage } from "../compo/staticPropsInTable";
import { getProductCategories } from "@/lib/actions/filter/action";

const CATEGORIES = (option: string, series: string[]) => {
  if (option === "User") {
    return [
      {
        title: "User",
        list: [
          {
            title: "Status",
            names: ["Active", "Inactive", "Restricted", "Pending"].map(
              (name) => ({ name })
            ),
          },
          {
            title: "Role",
            names: ["Admin", "Operator", "Call Center"].map((name) => ({
              name,
            })),
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
              "In Stock",
              "Installed",
              "Installing",
              "Waiting for Repair",
              "Reparing",
              "Damaged",
              "Lost",
            ].map((name) => ({ name })),
          },
          {
            title: "Models",
            names: series.map((seriesName) => ({
              name: seriesName,
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
    names: { name: string }[];
  }[];
}

const skip = 0;
const take = itemPage;

export default function Header({ option }: { option: string }) {
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  const [category, setCategory] = useState<Category[]>([]);
  const [filterParamsArray, setFilterParamsArray] = useState<string[]>([]);

  const { filter } = decode(params.toString());

  const fetchCategories = useCallback(async () => {
    setCategory(CATEGORIES(option, []));
    if (option === "Product") {
      try {
        const res = await getProductCategories({
          setCategory,
          CATEGORIES,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [option]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const filterParams = filter ? filter.split(",") : [];
    setFilterParamsArray(filterParams);
  }, [filter]);

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
        {option !== "" && (
          <>
            {category.map((item, index) => (
              <DropdownBottom key={index} item={item} index={index} />
            ))}
          </>
        )}
      </div>
      <div className="items-center gap-3 mobile:hidden tablet:hidden laptop:flex">
        {category.length > 0 && (
          <>
            {filterParamsArray.map((param, index) => (
              <div
                key={index}
                className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold gap-2"
              >
                <p>{param}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
