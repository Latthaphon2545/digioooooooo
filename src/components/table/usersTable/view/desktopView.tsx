import { useState } from "react";
import {
  DropdownRole,
  DropdownStatus,
  handleRoleChange,
  handleStatusChange,
} from "../DropdownFieldUser";
import { ColorUserStatus } from "../../color";
import ActionButton from "@/components/actionButton";
import { handleEditToggle } from "../../handleEditToggle";
import { TbUserEdit } from "react-icons/tb";
import { RenderEditableField } from "../../EditableField";
import PopupButtonUpdate from "./popupButtonUpdate";
import { ViewProps } from "../../compo/TableProps";

export const DesktopView = ({
  item,
  isEditing,
  setIsEditing,
  handleUpdate,
  editor,
}: ViewProps) => {
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState(item.role);
  const [status, setStatus] = useState(item.status);
  const [contact, setContact] = useState(item.contact);
  const [loadings, setLoadings] = useState<{ [key: string]: boolean }>({});

  return (
    <tr key={item.id}>
      <td className="py-2 px-4 h-[8vh]">
        <RenderEditableField
          id={item.id}
          isEditing={isEditing}
          value={name}
          onChange={setName}
        />
        <p className="text-xs text-gray-500">{item.email}</p>
      </td>

      <td className="py-2 px-4">
        {isEditing[item.id] ? (
          <DropdownRole selected={role} onChange={setRole} />
        ) : (
          <p>{handleRoleChange(item.role)}</p>
        )}
      </td>

      <td className="py-2 px-4">
        {isEditing[item.id] ? (
          <DropdownStatus selected={status} onChange={setStatus} />
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
        <RenderEditableField
          id={item.id}
          isEditing={isEditing}
          value={contact}
          onChange={setContact}
        />
      </td>

      <td className={`py-2 px-4 ${!editor && "cursor-not-allowed"}`}>
        {isEditing[item.id] ? (
          <div className="flex gap-1 justify-center">
            <ActionButton
              action={() => handleEditToggle(item.id, setIsEditing)}
              styles="btn-error btn-sm"
            >
              Cancel
            </ActionButton>
            <PopupButtonUpdate
              handleUpdate={handleUpdate}
              item={item}
              name={name}
              role={role}
              status={status}
              contact={contact}
              setName={setName}
              setRole={setRole}
              setStatus={setStatus}
              setContact={setContact}
              loadings={loadings}
              setLoadings={setLoadings}
            />
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
