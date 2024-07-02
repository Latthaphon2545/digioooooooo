"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VertifyOtp } from "./vertifyOtp";
import axios from "axios";
import { handleChange } from "../handleChange";
import { tooltipShow } from "../tooltipShow";
import { sendOtp } from "./sentOTP";

interface AccountInfoProps {
  title: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const EmailInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
}) => {
  const tooltip = ["If you want to change your email, please contact admin."];

  return (
    <>
      <div className="flex mobile:flex-col laptop:flex-row items-center w-full mb-4 gap-5">
        <div className="font-medium mobile:text-center laptop:text-start mobile:w-full laptop:w-2/6">
          {title}
        </div>
        <div className={`flex flex-col gap-2 mobile:w-full laptop:w-3/6`}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              type="text"
              value={defaultValue}
              disabled={disabled}
              aria-label={title}
            />
          </label>
          {tooltip && tooltipShow(tooltip)}
        </div>
      </div>
    </>
  );
};

export const RoleInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
}) => {
  const tooltip = ["You can't change your role."];

  return (
    <>
      <div className="flex mobile:flex-col laptop:flex-row items-center w-full mb-4 gap-5">
        <div className="font-medium mobile:text-center laptop:text-start mobile:w-full laptop:w-2/6">
          {title}
        </div>
        <div className={`flex flex-col gap-2 mobile:w-full laptop:w-3/6`}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              type="text"
              value={defaultValue}
              disabled={disabled}
              aria-label={title}
            />
          </label>
          {tooltip && tooltipShow(tooltip)}
        </div>
      </div>
    </>
  );
};

export const StatusInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
}) => {
  const tooltip = ["You can't change your status."];

  return (
    <>
      <div className="flex mobile:flex-col laptop:flex-row items-center w-full mb-4 gap-5">
        <div className="font-medium mobile:text-center laptop:text-start mobile:w-full laptop:w-2/6">
          {title}
        </div>
        <div className={`flex flex-col gap-2 mobile:w-full laptop:w-3/6`}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              className="grow"
              type="text"
              value={defaultValue}
              disabled={disabled}
              aria-label={title}
            />
          </label>
          {tooltip && tooltipShow(tooltip)}
        </div>
      </div>
    </>
  );
};

export const NameInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  disabled = false,
  onChange,
}) => {
  const tooltip = ["Please enter your full name."];
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <div className="flex mobile:flex-col laptop:flex-row items-center w-full mb-4 gap-5">
        <div className="font-medium mobile:text-center laptop:text-start mobile:w-full laptop:w-2/6">
          {title}
        </div>
        <div className={`flex flex-col gap-2 mobile:w-full laptop:w-3/6`}>
          <label
            className={`input input-bordered flex items-center gap-2 ${
              value !== defaultValue ? "input-success border-2" : ""
            }`}
          >
            <input
              className="grow"
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value, setValue, onChange)}
              disabled={disabled}
              aria-label={title}
              pattern="[A-Za-zก-ฮ]*"
            />
          </label>
          {tooltip && tooltipShow(tooltip)}
        </div>
      </div>
    </>
  );
};

export const ContactInfo: React.FC<AccountInfoProps> = ({
  title,
  defaultValue,
  onChange,
}) => {
  const tooltip = [
    "Please enter your 10 digits phone number",
    "You can change your phone number by sending OTP. and verify it.",
  ];
  const [refNum, setRefNum] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [boolGenerateOtp, setBoolGenerateOtp] = useState(false);

  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <div className="flex mobile:flex-col laptop:flex-row items-center w-full mb-4 gap-5">
        <div className="font-medium mobile:text-center laptop:text-start mobile:w-full laptop:w-2/6">
          {title}
        </div>
        <div className={`flex flex-col gap-2 mobile:w-full laptop:w-3/6`}>
          <label
            className={`input input-bordered flex items-center gap-2 ${
              value !== defaultValue && value.length === 10
                ? "input-success border-2"
                : value.length < 10 || value.length > 10
                ? "input-error border-2"
                : ""
            }`}
          >
            <input
              className={`grow`}
              type="tel"
              value={value}
              onChange={(e) => handleChange(e.target.value, setValue)}
              aria-label={title}
              placeholder={"09XXXXXXXX"}
              pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
            />

            <span>
              <button
                onClick={() =>
                  sendOtp({
                    phoneNumber: value,
                    email: "games2545.lattapon@gmail.com",
                    setShowModal,
                    setRefNum,
                    setBoolGenerateOtp,
                  })
                }
                className={`btn btn-ghost btn-sm`}
                disabled={!(value.length === 10 && value !== defaultValue)}
              >
                {boolGenerateOtp ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </span>
          </label>
          {tooltip && tooltipShow(tooltip)}
        </div>
      </div>

      {showModal && (
        <dialog
          id="my_modal_2"
          className={`modal ${
            showModal ? "modal-open" : ""
          } mobile:modal-bottom laptop:modal-middle`}
        >
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">OTP Verification : {value}</h3>
            <div className="py-4">
              <VertifyOtp
                phoneNumber={value}
                referenceNumber={refNum}
                setShowModal={setShowModal}
                setValue={onChange as (value: string) => void}
              />
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};
