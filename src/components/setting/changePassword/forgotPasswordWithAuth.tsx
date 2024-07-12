import SubmitPopupButton from "@/components/submitPopupButton";
import { ForgotPassword } from "@/lib/actions/forgotPassword/action";
import React, { useState } from "react";

export default function ForgotPasswordWithAuth({
  email,
  setForgotPassword,
}: {
  email: string;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const splitEmail = email.split("@");
  const emailName =
    splitEmail[0].slice(0, 1) + "*****" + splitEmail[0].slice(-1);
  const emailDomain = splitEmail[1];

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      const res = await ForgotPassword({
        email: splitEmail[0],
        setLoading,
        setForgotPassword,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      What method do you want to use to reset your password?
      <div className="py-5">
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-5">
            <input type="checkbox" defaultChecked className="checkbox" />
            <p className="label-text flex flex-col gap-1">
              <span className="text-xs">
                Send a password reset link to my email address
              </span>
              <span className="text-sm text-primary">
                {emailName}@{emailDomain}
              </span>
            </p>
          </label>
        </div>
      </div>
      <SubmitPopupButton
        action={handleResetPassword}
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
    </div>
  );
}
