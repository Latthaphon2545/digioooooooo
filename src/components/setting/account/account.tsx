"use client";

import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import generateTooltip from "../toolTip";

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
    <div className="w-full flex flex-col justify-center items-center gap-3">
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

interface AccountInfoProps {
  title: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
  onChange,
}) => {
  const [tooltip, setTooltip] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    const tooltipArray = generateTooltip(title);
    setTooltip(tooltipArray);
    setValue(
      defaultValue.startsWith("+") ? defaultValue.slice(3) : defaultValue
    );
  }, []);

  return (
    <div className="flex items-center w-full mb-4 gap-5">
      <div className="w-2/6 font-medium">{title}</div>
      <div className="w-3/6 flex flex-col gap-2">
        {title === "Contact" ? (
          <div>
            <PhoneInput
              country={"th"}
              value={value}
              onChange={(phone) => handleChange(phone)}
              onlyCountries={["th"]}
              inputStyle={{
                width: "100%",
                height: "3rem",
                fontSize: "1rem",
                borderRadius: "0.5rem",
              }}
              isValid={(value, country) => {
                if (value.length < 12) {
                  return "Invalid phone number";
                } else {
                  return true;
                }
              }}
            />
          </div>
        ) : (
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              type={title === "Password" && !showPassword ? "password" : "text"}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              aria-label={title}
            />
            {title === "Password" && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            )}
          </label>
        )}
        {tooltip &&
          tooltip.map((tip, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-2 text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-gray-400 h-4 w-4 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{tip}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
