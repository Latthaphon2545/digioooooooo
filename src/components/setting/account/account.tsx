"use client";

import React, { useState } from "react";
import {
  ContactInfo,
  EmailInfo,
  NameInfo,
  RoleInfo,
  StatusInfo,
} from "./accountInfo";
import axios from "axios";
import SubmitPopupButton from "@/components/submitPopupButton";

interface AccountInfo {
  id: string;
  email: string;
  role: string;
  status: string;
  name: string;
  contact: string;
}

export default function Account({ account }: { account: AccountInfo }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [update, setUpdate] = useState(false);

  const handleSubmit = async () => {
    try {
      setUpdate(true);
      await axios.patch(`/api/users/updateProfile/${account.id}`, {
        name: name === "" ? account.name : name,
        contact: contact === "" ? account.contact : contact,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setUpdate(false);
      window.location.reload();
    }
  };

  const hasNotChanged = (value: string, accountValue: string) => {
    return value === "" || value === accountValue;
  };

  const activeBtn =
    hasNotChanged(name, account.name) &&
    hasNotChanged(contact, account.contact);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mb-5">
      <div className="w-full">
        <EmailInfo title="Email" defaultValue={account.email} disabled />
        <div className="divider"></div>
        <RoleInfo title="Role" defaultValue={account.role} disabled />
        <div className="divider"></div>
        <StatusInfo title="Status" defaultValue={account.status} disabled />
        <div className="divider"></div>
        <NameInfo title="Name" defaultValue={account.name} onChange={setName} />
        <div className="divider"></div>
        <ContactInfo
          title="Contact"
          defaultValue={account.contact}
          onChange={setContact}
          email={account.email}
        />
      </div>

      <SubmitPopupButton
        action={handleSubmit}
        styles={`w-52 ${activeBtn ? "btn-disabled" : "btn-primary"}`}
        header="Submit"
        description="Are you sure you want to update your profile?"
        id="UpdateProfile"
        confirmString={
          update ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update"
          )
        }
        confirmStyle="btn-success"
      >
        Submit
      </SubmitPopupButton>
    </div>
  );
}
