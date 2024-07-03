import { useState } from "react";
import { EditableField } from "../../EditableField";
import {
  Dropdown,
  handleRoleChange,
  handleStatusChange,
} from "../../DropdownField";
import { ColorUserStatus } from "../../color";
import ActionButton from "@/components/actionButton";
import { handleEditToggle } from "../../handleEditToggle";
import SubmitPopupButton from "@/components/submitPopupButton";
import { TbUserEdit } from "react-icons/tb";

interface TableViewProps {
  item: any;
  isEditing: any;
  setIsEditing: any;
  editor: boolean;
  handleUpdate: (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => Promise<void>;
}

export const TableView = ({
  item,
  isEditing,
  setIsEditing,
  handleUpdate,
  editor,
}: TableViewProps) => {
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState(item.role);
  const [status, setStatus] = useState(item.status);
  const [contact, setContact] = useState(item.contact);

  const [isLoad, setIsLoad] = useState(false);

  return (
    <tr key={item.id}>
      <td className="py-2 px-4 h-[8vh]">
        {isEditing[item.id] ? (
          <EditableField defaultValue={name} onChange={setName} />
        ) : (
          <p className="text-base w-full">{name}</p>
        )}
        <p className="text-xs text-gray-500">{item.email}</p>
      </td>
      <td className="py-2 px-4">
        {isEditing[item.id] ? (
          <Dropdown selected={role} onChange={setRole} isRole={true} />
        ) : (
          <p>{handleRoleChange(item.role)}</p>
        )}
      </td>
      <td className="py-2 px-4">
        {isEditing[item.id] ? (
          <Dropdown selected={status} onChange={setStatus} isStatus={true} />
        ) : (
          <div
            className={`badge badge-${ColorUserStatus(
              item.status
            )} badge-outline badge-md`}
          >
            <p>{handleStatusChange(item.status)}</p>
          </div>
        )}
      </td>
      <td className="py-2 px-4">
        {isEditing[item.id] ? (
          <EditableField defaultValue={contact} onChange={setContact} />
        ) : (
          <p>{item.contact}</p>
        )}
      </td>
      <td className={`py-2 px-4 ${editor ? "" : "cursor-not-allowed"}`}>
        {isEditing[item.id] ? (
          <div className="flex gap-1 justify-center">
            <ActionButton
              action={() => handleEditToggle(item.id, setIsEditing)}
              styles="btn-error btn-sm"
            >
              Cancel
            </ActionButton>
            <SubmitPopupButton
              action={async () => {
                setIsLoad(true);
                await handleUpdate(item.id, {
                  name,
                  role,
                  status,
                  contact,
                });
                setIsLoad(false);
              }}
              styles="btn-success btn-sm"
              confirmString={
                isLoad ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Update"
                )
              }
              confirmStyle="btn-success btn-sm"
              header="Are you sure you want to update this user?"
              description={
                <div>
                  <p>
                    Name: <span className="font-bold">{name}</span>
                  </p>
                  <p>
                    Role: <span className="font-bold">{role}</span>
                  </p>
                  <p>
                    Status: <span className="font-bold">{status}</span>
                  </p>
                  <p>
                    Contact: <span className="font-bold">{contact}</span>
                  </p>
                </div>
              }
              id={item.id}
            >
              Update
            </SubmitPopupButton>
          </div>
        ) : (
          <ActionButton
            action={() => handleEditToggle(item.id, setIsEditing)}
            styles="btn-info btn-sm"
            disabled={!editor}
          >
            <TbUserEdit size={20} /> Edit
          </ActionButton>
        )}
      </td>
    </tr>
  );
};
