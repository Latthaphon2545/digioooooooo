"use client";

import { ForgotPassword } from "@/lib/actions/forgotPassword/action";
import { useState } from "react";
import ViaMethod from "./ViaMethod";
import ViaSMS from "./viaSMS";
import ViaEmail from "./viaEmail";
import Link from "next/link";
import AlertDialog, { Warning, WarningStyle } from "@/components/alertDialog";
import SubmitPopupButton from "@/components/submitPopupButton";

export const ViaStep = () => {
  const [viaEmail, setViaEmail] = useState(false);
  const [viaSMS, setViaSMS] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleSubmit = async () => {
    if (email.trim() === "") {
      setAlertTitle("Email is required");
      setAlertStyles(WarningStyle);
    }

    const res = await ForgotPassword({
      email: email.split("@")[0],
      phoneNumber: phone,
      setLoading,
      setAlertIcon,
      setAlertStyles,
      setAlertTitle,
    });
  };

  const handleEmailClick = () => {
    setViaEmail(true);
    setViaSMS(false);
  };

  const handleSMSClick = () => {
    setViaEmail(false);
    setViaSMS(true);
  };

  return (
    <>
      <div className="text-base text-center">
        {!viaEmail && !viaSMS
          ? "Pick a method to reset your password"
          : " No worries, we'll send OTP to your reset password"}
      </div>

      <div className="h-52 flex flex-col justify-center ">
        {viaEmail === false && viaSMS === false ? (
          <ViaMethod
            handleEmailClick={handleEmailClick}
            handleSMSClick={handleSMSClick}
          />
        ) : (
          <>
            {viaEmail && (
              <ViaEmail setEmail={setEmail} handleSMSClick={handleSMSClick} />
            )}
            {viaSMS && (
              <ViaSMS setPhone={setPhone} handleEmailClick={handleEmailClick} />
            )}
          </>
        )}
      </div>

      <div className="w-full h-10">
        {viaEmail || viaSMS ? (
          <SubmitPopupButton
            action={handleSubmit}
            styles={`btn btn-primary w-full ${
              email.trim() === "" && "btn-disabled "
            } `}
            header="Reset Password"
            description="Are you sure you want to reset your password? After resetting your password, Account is logged out everywhere."
            id="reset_password"
            confirmString="Confirm"
            confirmStyle="btn-success"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Send OTP"
            )}
          </SubmitPopupButton>
        ) : null}
      </div>

      <Link href="/login" className="btn btn-sm btn-ghost w-fit h-10 mx-auto">
        <p>Back to login</p>
      </Link>

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={`alert-dialog-${email}`}
      />
    </>
  );
};
