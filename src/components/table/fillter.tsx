import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ActionButton from "../actionButton";
import { encode, decode } from "@/lib/generateRandomHref";

type DropdownBottomProps = {
  item: {
    title: string;
    list: {
      title: string;
      names: {
        name: string;
        action: () => void;
      }[];
    }[];
  };
  index: number;
};

export default function DropdownBottom({ item, index }: DropdownBottomProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const params = useSearchParams();
  const { filter, search, skip, take } = decode(params.toString());

  useEffect(() => {
    const initialCheckboxValues = filter.split(",");
    if (initialCheckboxValues[0] === "") {
      return;
    }
    setCheckedValues(initialCheckboxValues);
  }, []);

  const getCheckBoxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedValues((prev) => [...prev, e.target.name]);
    } else {
      setCheckedValues((prev) => prev.filter((name) => name !== e.target.name));
    }
  };

  useEffect(() => {
    const allChecked =
      checkedValues.length ===
      item.list.flatMap((options) => options.names).length;
    let filterValue = allChecked ? "" : checkedValues.join(",");
    const newUrl = encode(
      `filter=${filterValue}&search=${search}&skip=${skip}&take=${take}`
    );
    router.push(`${pathname}?${newUrl}`);
  }, [checkedValues]);

  const handleClear = () => {
    setCheckedValues([]);
  };

  return (
    <div key={index} className="dropdown dropdown-hover dropdown-end">
      <button tabIndex={0} className="btn btn-sm ml-3">
        <IoFilterSharp size={20} />
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-60">
        {item.list.map((options, optionsIndex) => (
          <div key={optionsIndex}>
            <p className="text-xs my-2 mx-1">{options.title}</p>
            {options.names.map((option, optionIndex) => (
              <li key={option.name} className="form-control">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary mr-3"
                    name={option.name}
                    onChange={getCheckBoxValue}
                    checked={checkedValues.includes(option.name)}
                  />
                  <span className="label-text">{option.name}</span>
                </label>
              </li>
            ))}
          </div>
        ))}
        <ActionButton action={handleClear} styles="btn-error mt-2">
          Clear
        </ActionButton>
      </ul>
    </div>
  );
}
