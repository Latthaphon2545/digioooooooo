import React, { use, useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "../../actionButton";
import axios from "axios";
import AlertDialog, { Error, Success } from "../../alertDialog";
import SubmitPopupButton from "@/components/submitPopupButton";
import Modal from "@/components/modal";
import { EditableField } from "../EditableField";
import {
  handleRoleChange,
  handleStatusChange,
  Dropdown,
} from "../DropdownField";
import { showAlert } from "../showAlert";
import { handleEditToggle } from "../handleEditToggle";
import { ColorUserStatus } from "../color";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleUpdate = async (
    id: string,
    users: { name: string; role: string; status: string; contact: string }
  ) => {
    try {
      const response = await axios.patch(`/api/users/updateUsers/${id}`, users);
    } catch (err) {
      console.log(err);
      setUpdateAlert(true);
      showAlert(
        "Failed to update user",
        "alert-error mobile:bg-error tablet:bg-error",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Error
      );
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = users.name;
          item.role = users.role;
          item.status = users.status;
          item.contact = users.contact;
        }
      });
      handleEditToggle(id, setIsEditing);
      setUpdateAlert(true);
      showAlert(
        "User updated successfully",
        "alert-success  mobile:bg-success tablet:bg-success",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Success
      );
    }
  };

  const TableView = ({ item }: { item: any }) => {
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
            <Dropdown selected={role} onChange={setRole} isRole={true} />
          ) : (
            <p>{handleRoleChange(item.role)}</p>
          )}
        </td>

        {/* Status */}
        <td className={` py-2 px-4`}>
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
                action={() => handleEditToggle(item.id, setIsEditing)}
                styles="btn-error btn-sm"
              >
                Cancle
              </ActionButton>
              <SubmitPopupButton
                action={async () => {
                  setIsUpdate(true);
                  await handleUpdate(item.id, {
                    name,
                    role,
                    status,
                    contact,
                  });
                }}
                styles="btn-success btn-sm"
                confirmString={"Update"}
                isSubmitting={isUpdate}
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

  const mobileView = ({ item }: { item: any }) => {
    const [id, setId] = useState(item.id);
    const [name, setName] = useState(item?.name || "");
    const [role, setRole] = useState(item?.role || "");
    const [status, setStatus] = useState(item?.status || "");
    const [contact, setContact] = useState(item?.contact || "");
    return (
      <>
        <div className="card w-[90vw] bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <div className="card-title flex-col">
              <div className="flex w-full justify-between items-center">
                <h1 className=" text-gray-500 text-sm">
                  {handleRoleChange(role)}
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
                    content={ModalEditMobileUser({ item })}
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
                  <p className="text-gray-500">{item.contact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ModalEditMobileUser = ({ item }: { item: any }) => {
    const [name, setName] = useState(item?.name || "");
    const [role, setRole] = useState(item?.role || "");
    const [status, setStatus] = useState(item?.status || "");
    const [contact, setContact] = useState(item?.contact || "");

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
            await handleUpdate(item.id, {
              name,
              role,
              status,
              contact,
            });
            const modal = document.getElementById(`editUser${item.id}`);
            const checkbox = modal?.nextElementSibling as HTMLInputElement;
            checkbox.checked = false;
          }}
          styles="btn-xl btn-primary"
          confirmString="Update"
          isSubmitting={false}
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

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:block laptop:block">
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
                <td colSpan={5} className="text-center py-2 px-4 h-[8vh]">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <TableView key={item.name} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:hidden laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.name} className="mt-3">
            {mobileView({ item })}
          </div>
        ))}
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
