"use client";

import { useEffect, useState } from "react";
import generateTooltip from "../toolTip";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VertifyOtp } from "./vertifyOtp";
import Modal from "@/components/modal";
import axios from "axios";

interface AccountInfoProps {
  title: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
  onChange,
}) => {
  const [tooltip, setTooltip] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState("");

  const handleChange = (inputValue: string) => {
    let formattedValue = inputValue;
    if (title === "Contact") {
      formattedValue = inputValue.replace(/\D/g, "");
      if (formattedValue.length > 3 && formattedValue.length <= 6) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3
        )}`;
      } else if (formattedValue.length > 6) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3,
          6
        )}-${formattedValue.slice(6, 10)}`;
      }
    }
    setValue(formattedValue);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  useEffect(() => {
    const tooltipArray = generateTooltip(title);
    setTooltip(tooltipArray);
    if (title === "Contact") {
      const formattedDefaultValue = `${defaultValue.slice(
        0,
        3
      )}-${defaultValue.slice(3, 6)}-${defaultValue.slice(6, 10)}`;
      setValue(formattedDefaultValue);
    } else {
      setValue(defaultValue);
    }
  }, []);

  const sendOtp = async (phoenNumber: string) => {
    try {
      const res = await axios.post("/api/otp/generateOTP", {
        phone: phoenNumber,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center w-full mb-4 gap-5">
      <div className="w-2/6 font-medium mobile:text-center laptop:text-start">
        {title}
      </div>
      <div className={`w-3/6 flex flex-col gap-2`}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            className="grow"
            type={
              title === "Password" && !showPassword
                ? "password"
                : title === "Contact"
                ? "tel"
                : "text"
            }
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            aria-label={title}
            placeholder={title === "Contact" ? "09X-XXX-XXXX" : ""}
            pattern={title === "Contact" ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : ""}
          />
          <span>
            {title === "Password" ? (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-ghost btn-sm text-base"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            ) : (
              title === "Contact" && (
                <Modal
                  style="btn-ghost btn-sm"
                  title="Send"
                  titleContent={`Vertify OTP: ${value}`}
                  content={
                    <>
                      <VertifyOtp phoneNumber={value} setValue={setValue} />
                    </>
                  }
                  id={value}
                  action={() => {
                    sendOtp(value);
                  }}
                />
              )
            )}
          </span>
        </label>
        {tooltip &&
          tooltip.map((tip, index) => (
            <div
              key={index}
              className="flex flex-row items-start gap-2 text-xs"
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
