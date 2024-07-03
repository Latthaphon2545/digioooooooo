import ForgotPasswordPage from "@/components/auth/forgotpassword/sendOtpPage";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-evenly h-screen w-screen mobile:flex-col laptop:flex-row overflow-x-hidden">
      <ForgotPasswordPage />
    </div>
  );
}
