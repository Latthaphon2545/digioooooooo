import React from "react";
import { handleChange } from "../../handleChange";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function OldPasswordField({
  oldPassword,
  setOldPassword,
}: {
  oldPassword: string;
  setOldPassword: (value: string) => void;
}) {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input
          className="grow"
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => handleChange(e.target.value, setOldPassword)}
          placeholder="Old Password"
        />
        <button
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="btn btn-ghost btn-sm text-base text-accent"
        >
          {showOldPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </label>
    </>
  );
}
