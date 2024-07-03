import Image from "next/image";
import React from "react";
import logo from "/public/image/digio_logo.png";
import { passwordInput } from "../passwordInput";

export interface SetPasswordProps {
  email: string;
  password: string;
  name: string;
  type?: string;
}

export default function SetPassword({
  email,
  password,
  name,
  type,
}: SetPasswordProps) {
  // only chraacters id Game=? -> Game
  const nameShow = name.split("=")[0];

  return (
    <>
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="logo"
          className="mobile:w-[50%] laptop:w-[70%]"
        />
      </div>
      <div className="flex flex-col items-center gap-5 px-5">
        {type === "setPasswors" && (
          <>
            <h1 className="text-2xl font-bold text-center">Welcome to Digio</h1>
            <span className="text-4xl text-primary font-bold">{nameShow}</span>
            <p className="text-center">
              Please set your password to using our inventory system
            </p>
          </>
        )}
        {type === "forgotPassword" && (
          <>
            <h1 className="text-xl font-bold text-center">
              Password Reset for{" "}
            </h1>
            <span className="text-4xl text-primary font-bold">{nameShow}</span>
            <p className="text-center">
              Please set your new password to continue using our inventory
              system
            </p>
          </>
        )}
        {passwordInput({ email, password, name, type })}
      </div>
    </>
  );
}
