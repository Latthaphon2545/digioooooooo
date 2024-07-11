import React from "react";
import { CiPhone } from "react-icons/ci";

export default function ViaSMS({
  setPhone,
  handleEmailClick,
}: {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  handleEmailClick: () => void;
}) {
  return (
    <>
      <label className="input input-sm input-bordered flex items-center gap-2">
        <CiPhone />
        <input
          type="text"
          className="grow"
          placeholder="0XXXXXXX"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </label>

      <div className="flex items-center justify-center gap-2">
        <p>Can change send OTP to </p>
        <p onClick={handleEmailClick} className="link">
          EMAIL
        </p>
      </div>
    </>
  );
}
