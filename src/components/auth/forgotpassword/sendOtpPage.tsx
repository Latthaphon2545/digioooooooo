"use client";

import Image from "next/image";
import React from "react";
import logo from "/public/image/digio_logo.png";
import { ViaStep } from "./sendOtpStep";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="logo"
          className="mobile:w-[50%] laptop:w-[70%]"
        />
      </div>
      <div className="flex flex-col items-center gap-2 px-5">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <div className="w-96 min-h-96 flex flex-col gap-5 px-5">
          <ViaStep />
        </div>
      </div>
    </>
  );
}
