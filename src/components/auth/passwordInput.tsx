"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { tooltipShow } from "../setting/tooltipShow";
import Link from "next/link";
import { SetPasswordProps } from "./setPassword/setPassword";

export const passwordInput = ({
  email,
  password,
  name,
  type,
}: SetPasswordProps) => {
  const tooltipPassword = [
    "Please enter at least 8 characters password and at most 30 characters",
    "Required Uppercase",
    "Required Lowercase",
    "Required Number",
    "Required Special Character",
    "Cannot be easy password (e.g. 12345678, password, etc.)",
    "Cannot be the same as your email",
    "Cannot use your name in email",
  ];

  const [tooltipStyle, setTooltipStyle] = useState<string[]>(
    Array(8).fill("stroke-neutral-content")
  );
  const [tooltipStyleConfirm, setTooltipStyleConfirm] = useState<string[]>([
    "stroke-neutral-content",
  ]);

  const [value, setValue] = useState("");
  const [valueConfirm, setValueConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [changePassword, setChangePassword] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  const validatePassword = (password: string) => {
    const checks = [
      password.length >= 8 && password.length <= 30,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
      !/(password|12345678)/i.test(password),
      !password.includes(email),
      !password.includes(name),
    ];

    setTooltipStyle(
      checks.map((check) => (check ? "stroke-success" : "stroke-error"))
    );
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    setTooltipStyleConfirm([
      password === confirmPassword ? "stroke-success" : "stroke-error",
    ]);
  };

  useEffect(() => {
    if (value) validatePassword(value);
    if (valueConfirm) validateConfirmPassword(value, valueConfirm);
  }, [value, valueConfirm]);

  const activeButton = () =>
    value &&
    tooltipStyle.every((style) => style === "stroke-success") &&
    value === valueConfirm;

  const submit = async () => {
    try {
      setChangePassword(true);
      await axios.patch("/api/auth/setPassword", {
        email,
        oldPassword: password,
        newPassword: value,
        method: type,
      });
      setOpen(true);
    } catch (e) {
      console.error("Error updating password:", e);
    } finally {
      setChangePassword(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    if (timeLeft === 0) {
      router.push("/login");
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, open, router]);

  return (
    <>
      <div className="flex flex-col items-center w-full mb-4 gap-5">
        <div className="flex flex-col gap-2 w-full">
          {/* New Password */}
          <label
            className={`input input-bordered flex items-center gap-2 ${
              tooltipStyle.every((style) => style === "stroke-success")
                ? "input-success border-2"
                : value
                ? "input-error border-2"
                : ""
            }`}
          >
            <input
              className="grow"
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
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

          {/* Confirm Password */}
          <label
            className={`input input-bordered flex items-center gap-2 ${
              value === valueConfirm && valueConfirm
                ? "input-success border-2"
                : valueConfirm
                ? "input-error border-2"
                : ""
            }`}
          >
            <input
              className="grow"
              type={showPasswordConfirm ? "text" : "password"}
              value={valueConfirm}
              onChange={(e) => setValueConfirm(e.target.value)}
              placeholder="Confirm Password"
            />
            <button
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="btn btn-ghost btn-sm text-base text-accent"
            >
              {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
          {tooltipShow(["Must match the new password"], tooltipStyleConfirm)}
        </div>

        <button
          onClick={submit}
          className={`btn btn-primary w-2/4 ${
            activeButton() ? "" : "btn-disabled"
          }`}
        >
          {changePassword ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {/* Modal */}
      <div
        className={`modal laptop:modal-middle tablet:modal-middle mobile:modal-bottom ${
          open ? "modal-open" : ""
        }`}
        role="dialog"
      >
        <div className="modal-box p-4">
          <h3 className="text-lg font-bold my-4">
            Your password has been changed successfully
          </h3>
          <div className="flex flex-col items-center gap-5">
            <p>System will redirect you to login page in</p>
            <div className="flex flex-row gap-2 text-xs">
              <div>
                <span className="countdown font-mono text-4xl">{timeLeft}</span>
                sec
              </div>
            </div>

            <Link href="/login" className="btn btn-primary">
              Go to Login
            </Link>
            <p className="text-xs text-center">
              If you don't want to wait, you can{" "}
              <span className="text-primary text-2xl">Click</span> the button.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
