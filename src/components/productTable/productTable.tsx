import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "../actionButton";
import { usePathname } from "next/navigation";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorUserStatus: (status: string) => string;
  editor?: boolean;
}

const USERSTATUS = [
  "Installed",
  "In Stock",
  "Lost",
  "Damaged",
  "Repairing",
  "Waiting for Repair",
];

export default function Table({
  dataForCurrentPage,
  colorUserStatus,
  editor,
}: TableProps) {
  const [bool, setBool] = useState(false);
  const [boolEdit, setBoolEdit] = useState(editor);
  const [editingItem, setEditingItem] = useState(null);
  const pathname = usePathname();

  const handleEditData = (data: any) => {
    setBoolEdit(!boolEdit);
    setBool(!bool);
    setEditingItem(data);
    console.log(data);
  };

  const widthTable = 6;
  const heightTable = pathname === "/products/list" ? 75 : 72;
  console.log(heightTable);
  return (
    <div className={`min-h-[${heightTable}vh] mt-3`}>
      <table className="table">
        <thead className="text-center">
          <tr>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Merchant</th>
            <th>Bank</th>
            <th>History</th>
            {editor && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => {
            const isEditing = editingItem === item;
            return (
              <tr key={item.name}>
                {/* Model */}
                <td className={`text-center w-1/${widthTable}`}>
                  <p>{item.model}</p>
                </td>

                {/* Serial Number */}
                <td className={`text-center w-1/${widthTable}`}>
                  {item.serialNumber}
                </td>

                {/* Status */}
                <td className={`text-center w-1/${widthTable}`}>
                  <span>
                    {bool && isEditing ? (
                      dropdown(USERSTATUS, (item as { status: string }).status)
                    ) : (
                      <div
                        className={`badge badge-${colorUserStatus(
                          item.status
                        )} badge-outline`}
                      >
                        {item.status}
                      </div>
                    )}
                  </span>
                </td>

                {/* Merchant */}
                <td className={`text-center w-1/${widthTable}`}>
                  {bool && isEditing
                    ? inputField((item as { merchant: string }).merchant)
                    : item.merchant}
                </td>

                {/* Bank */}
                <td className={`text-center w-1/${widthTable}`}>
                  {bool && isEditing
                    ? inputField((item as { bank: string }).bank)
                    : item.bank}
                </td>

                {/* History */}
                <td className={`text-center w-1/${widthTable}`}>
                  <ActionButton
                    children={
                      <>
                        <Link href={`/products/history/${item.serialNumber}`}>
                          <FaHistory size={15} />
                        </Link>
                      </>
                    }
                    action={() => {
                      console.log("View History");
                    }}
                    styles="glass"
                  />
                </td>

                {/* Action To Eidtor */}
                {editor && (
                  <td
                    className={`text-center h-24 ${
                      boolEdit ? `w-1/${widthTable}` : ""
                    }`}
                  >
                    {boolEdit && (
                      <ActionButton
                        children={
                          <>
                            <TbUserEdit size={20} /> Edit
                          </>
                        }
                        action={() => {
                          handleEditData(item);
                        }}
                        styles="btn-info"
                      />
                    )}

                    {bool && isEditing && (
                      <div className="flex flex-col justify-center gap-1">
                        <ActionButton
                          children="Save"
                          action={() => {
                            const confirmSave = true;
                            if (confirmSave) {
                              setBoolEdit(!boolEdit);
                              setBool(!bool);
                            }
                          }}
                          styles="btn-success btn-sm"
                        />
                        <ActionButton
                          children="Cancel"
                          action={() => {
                            const confirmCancel = true;
                            if (confirmCancel) {
                              setBoolEdit(!boolEdit);
                              setBool(!bool);
                            }
                          }}
                          styles="btn-error btn-sm"
                        />
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const dropdown = (data: string[], currentData: string) => {
  return (
    <div className="dropdown dropdown-hover w-full">
      <div tabIndex={0} role="button" className="btn w-full">
        {currentData}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {data.map((item, index) => (
          <li key={index} className="form-control">
            <label className="cursor-pointer">
              <span className="label-text">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const inputField = (text: string) => {
  return (
    <input
      type="text"
      placeholder={text}
      className="border-2 border-base-content rounded-md p-1 w-full"
    />
  );
};
