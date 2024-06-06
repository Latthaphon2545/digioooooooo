import React, { use, useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "../../actionButton";
import axios from "axios";
import AlertDialog, { Error, Success } from "../../alertDialog";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorUserStatus: (status: string) => string;
  editor?: boolean;
}

let USERROLE = ["Admin", "Operator", "CallCenter"];
USERROLE = USERROLE.map((role) => role.toUpperCase());
let USERSTATUS = ["Pending", "Active", "Restricted", "Inactive"];
USERSTATUS = USERSTATUS.map((status) => status.toUpperCase());

export default function Table({
  dataForCurrentPage,
  colorUserStatus,
  editor,
}: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleEditToggle = (key: string) => {
    console.log(key);
    setIsEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const showAlert = (title: string, styles: string, icon?: React.ReactNode) => {
    setAlertTitle(title);
    setAlertStyles(styles);
    setAlertIcon(icon);
    setUpdateAlert(true);
    setTimeout(() => setUpdateAlert(false), 3000);
  };

  const TableRow = ({ item }: { item: any }) => {
    const [name, setName] = useState(item.name);
    const [role, setRole] = useState(item.role);
    const [status, setStatus] = useState(item.status);
    const [contact, setContact] = useState(item.contact);

    const [isUpdate, setIsUpdate] = useState(false);

    return (
      <tr key={item.name}>
        {/* Name */}
        <td className={` py-2 px-4 h-[8vh]`}>
          {isEditing[item.id] ? (
            <EditableField defaultValue={name} onChange={setName} />
          ) : (
            <p className="text-base w-full">{name}</p>
          )}
          <p className="text-xs text-gray-500">{item.email}</p>
        </td>

        {/* Role */}
        <td className={` py-2 px-4`}>
          {isEditing[item.id] ? (
            <Dropdown
              options={USERROLE}
              selected={role}
              onChange={setRole}
              isRole={true}
            />
          ) : (
            <p>{handleRoleChange(item.role)}</p>
          )}
        </td>

        {/* Status */}
        <td className={` py-2 px-4`}>
          {isEditing[item.id] ? (
            <Dropdown
              options={USERSTATUS}
              selected={status}
              onChange={setStatus}
              isStatus={true}
            />
          ) : (
            <div
              className={`badge badge-${colorUserStatus(
                item.status
              )} badge-outline badge-md`}
            >
              <p>{handleStatusChange(item.status)}</p>
            </div>
          )}
        </td>

        {/* Contact */}
        <td className={` py-2 px-4`}>
          {isEditing[item.id] ? (
            <EditableField defaultValue={item.contact} onChange={setContact} />
          ) : (
            <p>{item.contact}</p>
          )}
        </td>

        {/* Action */}
        <td className={`py-2 px-4 ${editor ? "" : "cursor-not-allowed"}`}>
          {isEditing[item.id] ? (
            <div className="flex gap-1 justify-center">
              <ActionButton
                action={() => handleEditToggle(item.id)}
                styles="btn-error"
              >
                Cancle
              </ActionButton>
              <ActionButton
                action={async () => {
                  setIsUpdate(true);
                  await handleUpdate(item.id, {
                    name,
                    role,
                    status,
                    contact,
                  });
                  setIsUpdate(false);
                }}
                styles="btn-success"
              >
                {isUpdate ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Update"
                )}
              </ActionButton>
            </div>
          ) : (
            <ActionButton
              action={() => handleEditToggle(item.id)}
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

  const handleUpdate = async (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => {
    try {
      if (!confirm("Are you sure you want to update this user?")) return;
      const response = await axios.patch(`/api/users/updateUsers/${id}`, users);
    } catch (err) {
      console.log(err);
      setUpdateAlert(true);
      showAlert("Failed to update user", "alert-error", Error);
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = users.name;
          item.role = users.role;
          item.status = users.status;
          item.contact = users.contact;
        }
      });
      handleEditToggle(id);
      setUpdateAlert(true);
      showAlert("User updated successfully", "alert-success", Success);
    }
  };

  return (
    <>
      <div className="min-h-[70vh] mt-3 w-[80vw]">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <TableRow key={item.name} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed bottom-4 left-[15%] w-[20%]">
        {updateAlert && (
          <AlertDialog
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
          />
        )}
      </div>
    </>
  );
}

const Dropdown = ({
  options,
  selected,
  onChange,
  isRole,
  isStatus,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  isRole?: boolean;
  isStatus?: boolean;
}) => {
  if (isRole) {
    return (
      <select
        className="border-2 border-base-content rounded-md p-1 w-full text-center"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {handleRoleChange(option)}
          </option>
        ))}
      </select>
    );
  } else if (isStatus) {
    return (
      <select
        className="border-2 border-base-content rounded-md p-1 w-full text-center"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {handleStatusChange(option)}
          </option>
        ))}
      </select>
    );
  }
};

const handleRoleChange = (e: string) => {
  let showRole = "";
  if (e === "ADMIN") {
    showRole = "Admin";
  } else if (e === "OPERATOR") {
    showRole = "Operator";
  } else if (e === "CALLCENTER") {
    showRole = "Call Center";
  }
  return showRole;
};

const handleStatusChange = (e: string) => {
  let showStatus = "";
  if (e === "ACTIVE") {
    showStatus = "Active";
  } else if (e === "INACTIVE") {
    showStatus = "Inactive";
  } else if (e === "RESTRICTED") {
    showStatus = "Restricted";
  } else if (e === "PENDING") {
    showStatus = "Pending";
  }
  return showStatus;
};

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
    className="border-2 border-base-content rounded-md p-1 w-fit text-center"
    onChange={(e) => onChange(e.target.value)}
  />
);
