import LoginPage from "@/components/auth/login/loginPage";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <LoginPage />
    </div>
  );
}
