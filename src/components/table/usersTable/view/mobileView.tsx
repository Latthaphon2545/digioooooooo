import { useState } from "react";
import {
  handleRoleChange,
  handleStatusChange,
  Dropdown,
} from "../../DropdownField";
import Modal from "@/components/modal";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "@/components/actionButton";
import { ColorUserStatus } from "../../color";
import { EditableField } from "../../EditableField";
import SubmitPopupButton from "@/components/submitPopupButton";
import { FaPhoneAlt } from "react-icons/fa";

interface mobileViewProps {
  item: any;
  editor: boolean;
  setOpenEditModal: any;
  openEditModal: boolean;
  handleUpdate: (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => Promise<void>;
}

export const MobileView = ({
  item,
  editor,
  setOpenEditModal,
  openEditModal,
  handleUpdate,
}: mobileViewProps) => {
  return (
    <>
      <div className="card w-[90vw] bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <div className="card-title flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className=" text-gray-500 text-sm">
                {handleRoleChange(item.role)}
              </h1>
              {editor ? (
                <Modal
                  title={
                    <>
                      <TbUserEdit size={20} /> Edit
                    </>
                  }
                  titleContent=""
                  style="btn-info btn-sm"
                  id={`editUser${item.id}`}
                  content={ModalEditMobileUser({ item, handleUpdate })}
                  action={() => {
                    setOpenEditModal(!openEditModal);
                  }}
                  boolClose={false}
                />
              ) : (
                <>
                  <ActionButton
                    action={() => {}}
                    styles="btn-info btn-sm"
                    disabled={true}
                  >
                    <TbUserEdit size={20} /> Edit
                  </ActionButton>
                </>
              )}
            </div>
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-bold">{item.name}</p>
                <p className="text-xs text-gray-500">{item.email}</p>
              </div>
              <div
                className={`badge badge-${ColorUserStatus(
                  item.status
                )} badge-outline badge-md`}
              >
                {handleStatusChange(item.status)}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Contact</p>
              </div>
              <div>
                <p className="text-gray-500">
                  <a
                    className="flex gap-2 link link-primary"
                    href={`tel:${item.contact}`}
                  >
                    <span>{item.contact}</span>
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ModalEditMobileUserProps {
  item: any;
  handleUpdate: any;
}

const ModalEditMobileUser = ({
  item,
  handleUpdate,
}: ModalEditMobileUserProps) => {
  const [name, setName] = useState(item?.name || "");
  const [role, setRole] = useState(item?.role || "");
  const [status, setStatus] = useState(item?.status || "");
  const [contact, setContact] = useState(item?.contact || "");

  const [isLoad, setIsLoad] = useState(false);

  return (
    <div className="px-5 flex flex-col gap-5 items-center">
      <div className="w-full">
        <p className="text-gray-500">Name</p>
        <EditableField defaultValue={name} onChange={setName} />
      </div>
      <div className="w-full">
        <p className="text-gray-500">Role</p>
        <Dropdown selected={role} isRole={true} onChange={setRole} />
      </div>
      <div className="w-full ">
        <p className="text-gray-500">Status</p>
        <Dropdown selected={status} isStatus={true} onChange={setStatus} />
      </div>
      <div className="w-full">
        <p className="text-gray-500">Contact</p>
        <EditableField defaultValue={contact} onChange={setContact} />
      </div>

      <SubmitPopupButton
        action={async () => {
          setIsLoad(true);
          await handleUpdate(item.id, {
            name,
            role,
            status,
            contact,
          });
          const modal = document.getElementById(`editUser${item.id}`);
          const checkbox = modal?.nextElementSibling as HTMLInputElement;
          checkbox.checked = false;
          setIsLoad(false);
        }}
        styles="btn-xl btn-primary"
        confirmString={
          isLoad ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update"
          )
        }
        confirmStyle="btn-success btn-sm"
        header="Are you sure you want to update this user?"
        description={""}
        id={`editUser${item.id}`}
      >
        Confirm
      </SubmitPopupButton>
    </div>
  );
};
