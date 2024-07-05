"use client";

import SubmitPopupButton from "@/components/submitPopupButton";
import { useState } from "react";

interface RenderSubmitPopupButtonProps {
  id: string;
  name: string;
  address: string;
  contact: string;
  handleUpdate: (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => Promise<void>;
  isUpdating: boolean;
  mobile?: boolean;
}

export const RenderSubmitPopupButton = ({
  id,
  name,
  address,
  contact,
  handleUpdate,
  isUpdating,
  mobile,
}: RenderSubmitPopupButtonProps) => {
  return (
    <SubmitPopupButton
      action={async () => {
        await handleUpdate(id, { name, address, contact });
        if (isUpdating) return;

        if (mobile) {
          const modal = document.getElementById(`editMerchants${id}`);
          const checkbox = modal?.nextElementSibling as HTMLInputElement;
          checkbox.style.display = "none";
        }
      }}
      styles={`btn-success btn-sm ${
        contact.length !== 10 || name.length === 0 ? "btn-disabled" : ""
      }`}
      disabled={contact.length !== 10 || name.length === 0}
      confirmString={
        isUpdating ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>Confirm</>
        )
      }
      confirmStyle="btn-success btn-sm"
      header="Are you sure you want to update this user?"
      description={
        <div className="text-start">
          <div>
            <label>Name:</label>
            <p className="font-bold">{name}</p>
          </div>
          <div>
            <label>Address:</label>
            <p className="font-bold">{address}</p>
          </div>
          <div>
            <label>Contact:</label>
            <p className="font-bold">{contact}</p>
          </div>
        </div>
      }
      id={`editMerchants${id}`}
    >
      Confirm
    </SubmitPopupButton>
  );
};
