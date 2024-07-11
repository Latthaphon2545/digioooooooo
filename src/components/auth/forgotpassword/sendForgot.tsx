"use client";

import { ForgotPassword } from "@/lib/actions/forgotPassword/action";
import { useState } from "react";
import ViaMethod from "./ViaMethod";
import ViaSMS from "./viaSMS";
import ViaEmail from "./viaEmail";
import Link from "next/link";
import AlertDialog, { Warning, WarningStyle } from "@/components/alertDialog";
import { ShowAlert } from "@/components/showAlert";

export const ViaStep = () => {
  const [viaEmail, setViaEmail] = useState(false);
  const [viaSMS, setViaSMS] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (email.trim() === "") {
        ShowAlert(
          "Please enter your email",
          WarningStyle,
          setAlertTitle,
          setAlertStyles,
          setAlertIcon,
          setAlertOpen,
          Warning
        );
      }

      const res = await ForgotPassword({
        email: email.split("@")[0],
        phoneNumber: phone,
        setLoading,
        setAlertIcon,
        setAlertOpen,
        setAlertStyles,
        setAlertTitle,
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      setAlertOpen(true);
    }
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
          <button
            onClick={handleSubmit}
            className={`btn btn-primary w-full ${
              email.trim() === "" && "btn-disabled "
            } `}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Send OTP"
            )}
          </button>
        ) : null}
      </div>

      <Link href="/login" className="btn btn-sm btn-ghost w-fit h-10 mx-auto">
        <p>Login</p>
      </Link>

      <AlertDialog
        open={alertOpen}
        title={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id={`alert-dialog-${email}`}
      />
    </>
  );
};
