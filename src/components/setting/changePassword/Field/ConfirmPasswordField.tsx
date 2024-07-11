import React, { useState } from "react";
import { handleChange } from "../../handleChange";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ConfirmPasswordField({
  confirmPassword,
  setConfirmPassword,
}: {
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  return (
    <>
      <label className={`input input-bordered flex items-center gap-2`}>
        <input
          className="grow"
          type={showPasswordConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => handleChange(e.target.value, setConfirmPassword)}
          placeholder="Confirm Password"
        />
        <button
          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          className="btn btn-ghost btn-sm text-base text-accent"
        >
          {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
        </button>
      </label>
    </>
  );
}
