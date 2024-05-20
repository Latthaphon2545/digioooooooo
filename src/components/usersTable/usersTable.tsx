import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
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

  const widthTable = pathname === "/users/management" ? 6 : 5;

  return (
    <div className="min-h-[70vh] mt-3">
      <table className="table">
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Contact</th>
            {editor && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {dataForCurrentPage.map((item) => {
            const isEditing = editingItem === item;
            return (
              <tr key={item.name}>
                {/* Name */}
                <td className={`content-start w-2/${widthTable}`}>
                  <span>
                    {bool && isEditing ? (
                      inputField((item as { name: string }).name)
                    ) : (
                      <p className="text-base w-full">{item.name}</p>
                    )}
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </span>
                </td>

                {/* Role */}
                <td className={`text-center w-1/${widthTable}`}>
                  {bool && isEditing
                    ? dropdown(USERROLE, (item as { role: string }).role)
                    : item.role}
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

                {/* Contact */}
                <td className={`text-center w-1/${widthTable}`}>
                  {bool && isEditing
                    ? inputField((item as { Contact: string }).Contact)
                    : item.Contact}
                </td>

                {/* Action To Eidtor */}
                <td
                  className={`text-center h-20 ${
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
                    <>
                      <ActionButton
                        children="Cancel"
                        action={() => {
                          const confirmCancel = true;
                          if (confirmCancel) {
                            setBoolEdit(!boolEdit);
                            setBool(!bool);
                          }
                        }}
                        styles="btn-error mr-2 btn-sm"
                      />
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
                    </>
                  )}
                </td>
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
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">
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
