import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ActionButton from "../actionButton";

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
  const searchParams = params.get("search") || "";
  const skipParams = params.get("skip") || "";
  const takeParams = params.get("take") || "";
  const filterParams = params.get("filter") || "";

  useEffect(() => {
    const initialCheckboxValues = filterParams.split(",");
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
    const filterValue = allChecked ? "" : checkedValues.join(",");
    router.push(
      `${pathname}?filter=${filterValue}&search=${searchParams}&skip=${skipParams}&take=${takeParams}`
    );
  }, [checkedValues]);

  const handleClear = () => {
    setCheckedValues([]);
  };

  return (
    <div key={index} className="dropdown dropdown-hover dropdown-bottom">
      <button tabIndex={0} className="btn btn-sm ml-3">
        <IoFilterSharp size={20} />
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {item.list.map((options, optionsIndex) => (
          <div key={optionsIndex}>
            <p className="text-xs mb-2 mt-2">{options.title}</p>
            {options.names.map((option, optionIndex) => (
              <li key={option.name} className="form-control">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mr-3"
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
        <ActionButton
          children="Clear"
          action={handleClear}
          styles="btn-error mt-2"
        />
      </ul>
    </div>
  );
}
