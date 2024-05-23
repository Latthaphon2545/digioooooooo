import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import ActionButton from "../actionButton";
import { usePathname } from "next/navigation";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorUserStatus: (status: string) => string;
  editor?: boolean;
}

const USERROLE = ["Admin", "Operator", "Call Center"];
const USERSTATUS = ["Pending", "Active", "Restricted", "Inactive"];

export default function Table({
  dataForCurrentPage,
  colorUserStatus,
  editor,
}: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const pathname = usePathname();

  const handleEditToggle = (key: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleCheckAll = () => {
    const newCheckAll = !isCheckAll;
    setIsCheckAll(newCheckAll);
    const newCheckedItems = dataForCurrentPage.reduce((acc, item) => {
      acc[item.name] = newCheckAll;
      return acc;
    }, {} as { [key: string]: boolean });
    setCheckedItems(newCheckedItems);
  };

  const handleCheckItem = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...dataForCurrentPage];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [dataForCurrentPage, sortConfig]);

  const widthTable = pathname === "/users/management" ? 6 : 5;

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSortDown />;
    }
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="min-h-[70vh] mt-3 w-[80vw]">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className="w-[5vw]">
              <input
                type="checkbox"
                className="checkbox"
                onClick={handleCheckAll}
                checked={isCheckAll}
              />
            </th>
            <th
              className={`text-start w-2/${widthTable} py-2 px-4 cursor-pointer`}
            >
              <div className="flex gap-1">
                <p>Name</p>
              </div>
            </th>
            <th
              className={`text-start w-1/${widthTable} py-2 px-4 cursor-pointer`}
              onClick={() => handleSort("role")}
            >
              <div className="flex gap-1">
                <p>Role</p>
                <span>{getSortIcon("role")}</span>
              </div>
            </th>
            <th
              className={`text-start w-1/${widthTable} py-2 px-4 cursor-pointer`}
              onClick={() => handleSort("status")}
            >
              <div className="flex gap-1">
                <p>Status</p>
                <span>{getSortIcon("status")}</span>
              </div>
            </th>
            <th
              className={`text-start w-1/${widthTable} py-2 px-4 cursor-pointer`}
            >
              <div className="flex gap-1">
                <p>Contact</p>
              </div>
            </th>
            {editor && (
              <th className={`text-start w-1/${widthTable} py-2 px-4`}>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.name}>
              {/* Checkbox */}
              <td className="w-[5vw]">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkedItems[item.name] || false}
                  onChange={() => handleCheckItem(item.name)}
                />
              </td>

              {/* Name */}
              <td className={`w-2/${widthTable} py-2 px-4 h-[8vh]`}>
                {isEditing[item.name] ? (
                  <EditableField defaultValue={item.name} />
                ) : (
                  <p className="text-base w-full">{item.name}</p>
                )}
                <p className="text-xs text-gray-500">{item.email}</p>
              </td>

              {/* Role */}
              <td className={`w-1/${widthTable} py-2 px-4`}>
                {isEditing[item.name] ? (
                  <Dropdown options={USERROLE} selected={item.role} />
                ) : (
                  <p>{item.role}</p>
                )}
              </td>

              {/* Status */}
              <td className={`w-1/${widthTable} py-2 px-4`}>
                {isEditing[item.name] ? (
                  <Dropdown options={USERSTATUS} selected={item.status} />
                ) : (
                  <div
                    className={`badge badge-${colorUserStatus(
                      item.status
                    )} badge-outline badge-md`}
                  >
                    <p>{item.status}</p>
                  </div>
                )}
              </td>

              {/* Contact */}
              <td className={`w-1/${widthTable} py-2 px-4`}>
                {isEditing[item.name] ? (
                  <EditableField defaultValue={item.Contact} />
                ) : (
                  <p>{item.contact}</p>
                )}
              </td>

              {/* Action */}
              {editor && (
                <td className={`w-1/${widthTable} py-2 px-4`}>
                  {isEditing[item.name] ? (
                    <div className="flex gap-1 justify-start">
                      <ActionButton
                        children="Cancel"
                        action={() => handleEditToggle(item.name)}
                        styles="btn-error"
                      />
                      <ActionButton
                        children="Save"
                        action={() => handleEditToggle(item.name)}
                        styles="btn-success"
                      />
                    </div>
                  ) : (
                    <ActionButton
                      children={
                        <>
                          <TbUserEdit size={20} /> Edit
                        </>
                      }
                      action={() => handleEditToggle(item.name)}
                      styles="btn-info"
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Dropdown = ({
  options,
  selected,
}: {
  options: string[];
  selected: string;
}) => (
  <div className="dropdown dropdown-hover h-fit w-fit">
    <div tabIndex={0} role="button" className="btn">
      {selected}
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mb-1"
    >
      {options.map((option, index) => (
        <li key={index} className="form-control">
          <label className="cursor-pointer">
            <span className="label-text  w-[10vw]">{option}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const EditableField = ({ defaultValue }: { defaultValue: string }) => (
  <input
    type="text"
    defaultValue={defaultValue}
    className="border-2 border-base-content rounded-md p-1 w-fit"
  />
);
