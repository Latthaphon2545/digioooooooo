import { useState } from "react";
import { handleRoleChange, handleStatusChange } from "../DropdownFieldUser";
import Modal from "@/components/modal";
import { TbUserEdit } from "react-icons/tb";
import { ColorUserStatus } from "../../color";
import { FaPhoneAlt } from "react-icons/fa";
import { ModalEditMobileUser } from "./ModalEditMobileUser";
import Link from "next/link";
import { ViewProps } from "../../compo/TableProps";

export const MobileView = ({ item, handleUpdate, editor }: ViewProps) => {
  const [openModal, setOpenModal] = useState(false);

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
                  NameBtn={
                    <>
                      <TbUserEdit size={20} /> Edit
                    </>
                  }
                  styleBtn="btn-info btn-sm"
                  id={`editUser${item.id}`}
                  content={
                    <ModalEditMobileUser
                      item={item}
                      handleUpdate={handleUpdate}
                      setOpenModal={setOpenModal}
                    />
                  }
                  open={openModal}
                  setOpen={setOpenModal}
                />
              ) : (
                <>
                  <button className="btn btn-info btn-sm btn-disabled">
                    <TbUserEdit size={20} /> Edit
                  </button>
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
                  <Link
                    className="flex gap-2 link link-primary"
                    href={`tel:${item.contact}`}
                  >
                    <span>{item.contact}</span>
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
