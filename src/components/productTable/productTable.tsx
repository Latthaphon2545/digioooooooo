import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import { CiLock } from "react-icons/ci";
import ActionButton from "../actionButton";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";
import Modal from "../modal";

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
      <tr key={item.serialNumber}>
        {/* Model */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <p className=" w-full">{item.model.series}</p>
        </td>

        {/* Serial Number */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className=" w-full">{item.serialNumber}</p>
        </td>

        {/* Status */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <div
            className={`badge badge-${colorProductStatus(
              convertStatus(item.status)
            )} badge-outline badge-md`}
          >
            <p>{convertStatus(item.status)}</p>
          </div>
        </td>

        {/* Merchant */}
        <td className={`py-2 px-4 h-[8vh]`}>
          {/* <Link
            href={`/merchants/list?filter=&search=${item.merchant?.name}&skip=0&take=8`}
          >
            <p className="link link-primary w-full">{item.merchant?.name}</p>
          </Link> */}
          {item.merchant && (
            <Modal
              title={item.merchant?.name}
              titleContent={item.merchant?.name}
              content={
                <>
                  <p>
                    <span className="font-bold">Address:</span>{" "}
                    {item.merchant?.address}
                  </p>
                  <p>
                    <span className="font-bold">Contact:</span>{" "}
                    {item.merchant?.contact}
                  </p>
                </>
              }
            />
          )}
        </td>

        {/* Bank */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <p className=" w-full">{item.bank}</p>
        </td>

        {/* History */}
        <td className={` py-2 px-4 h-[8vh]`}>
          <Link href={`products/history/${item.serialNumber}`}>
            <FaHistory size={15} />
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
              <TbUserEdit size={20} /> Edit{" "}
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
            <th className={`text-start  py-2 px-4`}>Model</th>
            <th className={`text-start  py-2 px-4`}>Serial Number</th>
            <th className={`text-start  py-2 px-4`}>Status</th>
            <th className={`text-start  py-2 px-4`}>Merchant</th>
            <th className={`text-start  py-2 px-4`}>Bank</th>
            <th className={`text-start  py-2 px-4`}>History</th>
            <th className={`text-start  py-2 px-4`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => (
            <TableRow key={item.serialNumber} item={item} />
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

export const convertStatus = (status: string) => {
  let showStatus = "";
  if (status === "INSTOCK") {
    showStatus = "In Stock";
  } else if (status === "LOST") {
    showStatus = "Lost";
  } else if (status === "DAMAGED") {
    showStatus = "Damaged";
  } else if (status === "REPARING") {
    showStatus = "Reparing";
  } else if (status === "WAITREPAIR") {
    showStatus = "Waiting For Repair";
  } else if (status === "INSTALLED") {
    showStatus = "Installed";
  } else if (status === "INSTALLING") {
    showStatus = "Installing";
  }
  return showStatus;
};
