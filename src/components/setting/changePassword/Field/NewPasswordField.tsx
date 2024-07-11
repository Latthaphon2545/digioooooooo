import React, { useEffect, useState } from "react";
import { handleChange } from "../../handleChange";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { tooltipShow } from "../../tooltipShow";
import { RequirePassword } from "../requirePassword";

export default function NewPasswordField({
  newPassword,
  setNewPassword,
  email,
  name,
}: {
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  name: string;
}) {
  const tooltipPassword = [
    "Please enter at least 8 characters password and at most 30 characters",
    "Required Uppercase",
    "Required Lowercase",
    "Required Number",
    "Required Special Character (e.g. !@#$%^&*)",
    "Cannot be easy password (e.g. 12345678, password, etc.)",
    "Cannot be the same as your email",
    "Cannot use your name in email",
  ];

  const [tooltipStyle, setTooltipStyle] = useState<string[]>(
    Array(8).fill("stroke-neutral-content")
  );

  const validatePassword = (password: string) => {
    if (password.length === 0) {
      setTooltipStyle(Array(8).fill("stroke-neutral-content"));
      return;
    }

    const checks = RequirePassword(password, email, name, true);

    setTooltipStyle(
      (checks as boolean[]).map((check: any) =>
        check ? "stroke-success text-success" : "stroke-error text-error"
      )
    );
  };

  useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label
        className={`input input-bordered flex items-center gap-2 ${
          tooltipStyle.every((style) => style === "stroke-success text-success")
            ? "input-success border-2"
            : newPassword.length > 0
            ? "input-error border-2"
            : ""
        }`}
      >
        <input
          className="grow"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => {
            handleChange(e.target.value, setNewPassword);
          }}
          placeholder="New Password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="btn btn-ghost btn-sm text-base text-accent"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </label>
      {tooltipShow(tooltipPassword, tooltipStyle)}
    </>
  );
}
