"use client";

import React, { useState } from "react";
import { AccountInfo } from "./accountInfo";

interface AccountInfo {
  email: string;
  password: string;
  role: string;
  status: string;
  name: string;
  contact: string;
}

export default function Account({ account }: { account: AccountInfo }) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = () => {
    console.log("Password", password);
    console.log("Name", name);
    console.log("Contact", contact);
    console.log("Submit");
  };

  const boolNotChanged = (value: string, accountValue: string) => {
    return value === "" || value === accountValue;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mb-5 mobile:mt-5 laptop:mt-0">
      <div className="w-full">
        <AccountInfo title="Email" defaultValue={account.email} disabled />
        <div className="divider"></div>
        <AccountInfo
          title="Password"
          defaultValue={account.password}
          onChange={setPassword}
        />
        <div className="divider"></div>
        <AccountInfo title="Role" defaultValue={account.role} disabled />
        <div className="divider"></div>
        <AccountInfo title="Status" defaultValue={account.status} disabled />
        <div className="divider"></div>
        <AccountInfo
          title="Name"
          defaultValue={account.name}
          onChange={setName}
        />
        <div className="divider"></div>
        <AccountInfo
          title="Contact"
          defaultValue={account.contact}
          onChange={setContact}
        />
      </div>

      {boolNotChanged(password, account.password) &&
      boolNotChanged(name, account.name) &&
      boolNotChanged(contact, account.contact) ? (
        <button disabled className="btn w-1/3">
          Submit
        </button>
      ) : (
        <button className="btn w-1/3" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}
