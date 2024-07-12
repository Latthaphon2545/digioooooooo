"use client";

import { useEffect, useState } from "react";
import OldPasswordField from "./Field/OldPasswordField";
import NewPasswordField from "./Field/NewPasswordField";
import ConfirmPasswordField from "./Field/ConfirmPasswordField";
import { ModalCountdown } from "@/components/modalCoundown";
import Modal from "@/components/modal";
import AlertDialog, { Error, ErrorStyle } from "@/components/alertDialog";
import { ChangePassword } from "@/lib/actions/changePassword/action";
import { RequirePassword } from "./requirePassword";
import ForgotPasswordWithAuth from "./forgotPasswordWithAuth";

export const PasswordChange = ({
  name,
  email,
  userId,
}: {
  name: string;
  email: string;
  userId: string;
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [successChangePassword, setSuccessChangePassword] = useState(false);

  const [forgotPassword, setForgotPassword] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setUpdateAlert(true);
      // ShowAlert(
      //   "Password does not match",
      //   ErrorStyle,
      //   setAlertTitle,
      //   setAlertStyles,
      //   setAlertIcon,
      //   setUpdateAlert,
      //   Error
      // );
      // handleClear();
      return;
    }

    await ChangePassword({
      userId,
      oldPassword,
      newPassword,
      setLoadingChangePassword,
      setSuccessChangePassword,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert,
      handleClear,
    });
  };

  const handleClear = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    const active =
      RequirePassword(newPassword, email, name, false) &&
      confirmPassword.length > 0 &&
      oldPassword.length > 0 &&
      newPassword.length > 0;

    setIsActive(active);
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <>
      <div className="flex flex-col items-center w-full mb-4 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <OldPasswordField
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
          />
          <NewPasswordField
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            email={email}
            name={name}
          />
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

        <Modal
          NameBtn="Forgot Password?"
          titleContent="Forgot Password?"
          content={
            <ForgotPasswordWithAuth
              email={email}
              setForgotPassword={setForgotPassword}
            />
          }
          styleBtn="btn-ghost btn-xs link-error"
          id={`ForgotPAssword-${userId}`}
          boolClose={true}
          closeAction={forgotPassword}
        />
      </div>

      {/* Modal Success Setpassword */}
      <ModalCountdown
        navigator="/login"
        navigatorText="Login"
        open={successChangePassword}
        title="Password changed successfully"
      />

      {/* Modal Forgot Password */}
      <ModalCountdown
        navigator="/login"
        navigatorText="Login"
        open={forgotPassword}
        title="Link sent to your email"
      />

      {/* <AlertDialog
        open={updateAlert}
        title={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={"updateAlertSetPassword"}
      /> */}
    </>
  );
};
