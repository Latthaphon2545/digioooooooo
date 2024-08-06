"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { tooltipShow } from "../setting/tooltipShow";
import Link from "next/link";
import { SetPasswordProps } from "./setPassword/setPassword";
import NewPasswordField from "../setting/changePassword/Field/NewPasswordField";
import ConfirmPasswordField from "../setting/changePassword/Field/ConfirmPasswordField";
import { ModalCountdown } from "../modalCoundown";
import AlertDialog from "../alertDialog";

export const passwordInput = ({
  email,
  password,
  name,
  type,
}: SetPasswordProps) => {
  const [error, setError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [open, setOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [successChangePassword, setSuccessChangePassword] = useState(false);

  const handleChangePassword = async () => {
    try {
      setLoadingChangePassword(true);
      await axios.patch("/api/auth/setPassword", {
        email,
        oldPassword: password,
        newPassword: newPassword,
        method: type,
      });
      setOpen(true);
    } catch (e) {
      console.error("Error updating password:");
      setError("Error updating password. Try sending Reset Password again.");
    } finally {
      setLoadingChangePassword(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mb-4 gap-5">
        <div className="flex flex-col gap-2 w-full">
          {/* New Password */}
          <NewPasswordField
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            email={email}
            name={name}
          />

          {/* Confirm Password */}
          <ConfirmPasswordField
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>

        <button
          onClick={handleChangePassword}
          className={`btn btn-primary w-1/4  ${!isActive && "btn-disabled"}`}
        >
          {loadingChangePassword ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Change Password"
          )}
        </button>
      </div>

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={"updateAlertSetPassword"}
        setAlertTitle={setAlertTitle}
      />

      <ModalCountdown
        navigator="/login"
        navigatorText="Login"
        open={successChangePassword}
        title="Password changed successfully"
      />
    </>
  );
};
