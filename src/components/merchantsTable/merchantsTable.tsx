import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "../actionButton";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorProductStatus: (status: string) => string;
  editor?: boolean;
}

export default function Table({
  dataForCurrentPage,
  colorProductStatus,
  editor,
}: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const handleEditToggle = (key: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const TableRow = ({ item }: { item: any }) => {
    const [status, setStatus] = useState(item.status);
    const [merchant, setMerchant] = useState(item.merchant);
    const [bank, setBank] = useState(item.bank);
    const [isUpdate, setIsUpdate] = useState(false);

    return (
      <tr key={item.productId}>
        {/* Name */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <p className=" w-full">{item.name}</p>
        </td>

        {/* Address */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className=" w-full">{item.address}</p>
        </td>

        {/* Contact */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <p>{item.contact}</p>
        </td>

        {/* Product Id */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <Link
            href={`/products/history/${item.product.serialNumber}`}
            className="link link-primary"
          >
            {item?.productId}
          </Link>
        </td>

        {/* Action */}
        <td className={`py-2 px-4 ${editor ? "" : "cursor-not-allowed"}`}>
          {isEditing[item.name] ? (
            <div className="flex gap-1 justify-start">
              <ActionButton
                action={() => handleEditToggle(item.name)}
                styles="btn-error"
              >
                Cancle
              </ActionButton>

              <ActionButton action={async () => {}} styles="btn-success">
                {isUpdate ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  "Update"
                )}
              </ActionButton>
            </div>
          ) : (
            <ActionButton
              action={() => handleEditToggle(item.name)}
              styles="btn-info"
              disabled={!editor}
            >
              <TbUserEdit size={20} /> Edit
            </ActionButton>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-[70vh] mt-3 w-[80vw]">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className={`text-start  py-2 px-4`}>Name</th>
            <th className={`text-start  py-2 px-4`}>Address</th>
            <th className={`text-start  py-2 px-4`}>Contact</th>
            <th className={`text-start  py-2 px-4`}>Product Serial Number</th>
            <th className={`text-start  py-2 px-4`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => (
            <TableRow key={item.name} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Dropdown = ({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}) => (
  <select
    className="border-2 border-base-content rounded-md p-1 w-full"
    value={selected}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const EditableField = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
}) => (
  <input
    type="text"
    defaultValue={defaultValue}
    className="border-2 border-base-content rounded-md p-1 w-fit"
    onChange={(e) => onChange(e.target.value)}
  />
);
