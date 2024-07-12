import SubmitPopupButton from "@/components/submitPopupButton";
import { EditableField } from "../../EditableField";
import { DropdownRole, DropdownStatus } from "../DropdownFieldUser";
import { useState } from "react";
import PopupButtonUpdate from "./popupButtonUpdate";

interface ModalEditMobileUserProps {
  item: any;
  handleUpdate: any;
  setOpenModal: (value: boolean) => void;
}

export const ModalEditMobileUser = ({
  item,
  handleUpdate,
  setOpenModal,
}: ModalEditMobileUserProps) => {
  const [name, setName] = useState(item.name);
  const [role, setRole] = useState(item.role);
  const [status, setStatus] = useState(item.status);
  const [contact, setContact] = useState(item.contact);
  const [loadings, setLoadings] = useState<{ [key: string]: boolean }>({});

  return (
    <div className="px-5 flex flex-col gap-5 items-center overflow-hidden">
      <div className="w-full">
        <p className="text-gray-500">Name</p>
        <EditableField defaultValue={name} onChange={setName} />
      </div>
      <div className="w-full">
        <p className="text-gray-500">Role</p>
        <DropdownRole selected={role} onChange={setRole} />
      </div>
      <div className="w-full ">
        <p className="text-gray-500">Status</p>
        <DropdownStatus selected={status} onChange={setStatus} />
      </div>
      <div className="w-full">
        <p className="text-gray-500">Contact</p>
        <EditableField
          defaultValue={contact}
          onChange={setContact}
          contact={true}
        />
      </div>

      <PopupButtonUpdate
        setOpenModal={setOpenModal}
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
  );
};
