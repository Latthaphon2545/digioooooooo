import React, { useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "../actionButton";
import { usePathname } from "next/navigation";
import axios from "axios";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorUserStatus: (status: string) => string;
  editor?: boolean;
  loading?: boolean;
}

const USERROLE = ["Admin", "Operator", "Call Center"];
const USERSTATUS = ["Pending", "Active", "Restricted", "Inactive"];

export default function Table({
  dataForCurrentPage,
  colorUserStatus,
  editor,
  loading,
}: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const pathname = usePathname();
  const [widthTable, setWidthTable] = useState(5);

  useEffect(() => {
    const widthTable = pathname === "/users/management" ? 6 : 5;
    setWidthTable(widthTable);
  }, []);

  const handleEditToggle = (key: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
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

  const TableRow = ({ item }: { item: any }) => {
    const [name, setName] = useState(item.name);
    const [role, setRole] = useState(item.role);
    const [status, setStatus] = useState(item.status);
    const [contact, setContact] = useState(item.contact);

    const [isUpdate, setIsUpdate] = useState(false);

    return (
      <tr key={item.name}>
        {/* Name */}
        <td className={`w-2/${widthTable} py-2 px-4 h-[8vh]`}>
          {isEditing[item.name] ? (
            <EditableField defaultValue={name} onChange={setName} />
          ) : (
            <p className="text-base w-full">{name}</p>
          )}
          <p className="text-xs text-gray-500">{item.email}</p>
        </td>

        {/* Role */}
        <td className={`w-1/${widthTable} py-2 px-4`}>
          {isEditing[item.name] ? (
            <Dropdown options={USERROLE} selected={role} onChange={setRole} />
          ) : (
            <p>{item.role}</p>
          )}
        </td>

        {/* Status */}
        <td className={`w-1/${widthTable} py-2 px-4`}>
          {isEditing[item.name] ? (
            <Dropdown
              options={USERSTATUS}
              selected={status}
              onChange={setStatus}
            />
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
            <EditableField defaultValue={item.contact} onChange={setContact} />
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
                  children={
                    isUpdate ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      "Update"
                    )
                  }
                  action={async () => {
                    setIsUpdate(true);
                    await handleUpdate(item.id, {
                      name,
                      role,
                      status,
                      contact,
                    });
                    setIsUpdate(false);
                    handleEditToggle(item.name);
                  }}
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
    );
  };

  const handleUpdate = async (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => {
    try {
      const response = await axios.patch(`/api/users/updateUsers/${id}`, users);
    } catch (err) {
      console.log(err);
    } finally {
      sortedData.map((item) => {
        if (item.id === id) {
          item.name = users.name;
          item.role = users.role;
          item.status = users.status;
          item.contact = users.contact;
        }
      });
    }
  };

  return (
    <div className="min-h-[70vh] mt-3 w-[80vw]">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className={`text-start w-2/${widthTable} py-2 px-4`}>
              <p>Name</p>
            </th>
            <th className={`text-start w-1/${widthTable} py-2 px-4`}>
              <p>Role</p>
            </th>
            <th className={`text-start w-1/${widthTable} py-2 px-4`}>
              <p>Status</p>
            </th>
            <th className={`text-start w-1/${widthTable} py-2 px-4`}>
              <p>Contact</p>
            </th>
            {editor && (
              <th className={`text-start w-1/${widthTable} py-2 px-4`}>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center">
                <span className="loading loading-dots loading-lg"></span>
              </td>
            </tr>
          )}
          {dataForCurrentPage.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-center">
                No data available
              </td>
            </tr>
          )}
          {sortedData.map((item) => (
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
