import SubmitPopupButton from "@/components/submitPopupButton";
import React from "react";
import { PopupButtonUpdateProps } from "../../compo/TableProps";

export default function PopupButtonUpdate({
  setOpenModal,
  handleUpdate,
  item,
  name,
  role,
  status,
  contact,
  setName,
  setRole,
  setStatus,
  setContact,
  loadings,
  setLoadings,
}: PopupButtonUpdateProps) {
  return (
    <SubmitPopupButton
      action={async () => {
        if (setOpenModal) setOpenModal(false);
        const res = await handleUpdate(
          item.id,
          {
            name,
            role,
            status,
            contact,
          },
          setLoadings
        );
        if (res.status === 200) {
          setName(name);
          setRole(role);
          setStatus(status);
          setContact(contact);
        } else {
          setName(item.name);
          setRole(item.role);
          setStatus(item.status);
          setContact(item.contact);
        }
      }}
      styles={`btn-success btn-sm ${
        contact.length !== 10 || name.length === 0 ? "btn-disabled" : ""
      }`}
      disabled={contact.length !== 10 || name.length === 0}
      confirmString={
        loadings[item.id] ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Update"
        )
      }
      confirmStyle="btn-success btn-sm"
      header="Are you sure you want to update this user?"
      description=""
      id={item.id}
    >
      Update
    </SubmitPopupButton>
  );
}
