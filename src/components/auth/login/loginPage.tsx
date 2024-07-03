"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import logo from "/public/image/digio_logo.png";

export default function LoginPage() {
  const router = useRouter();

  const submit = () => {
    console.log("submit");
    router.push("/");
  };
  return (
    <>
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="logo"
          className="mobile:w-[50%] laptop:w-[60%]"
        />
      </div>
      <form className="flex flex-col laptop:w-1/4 mobile:w-full gap-5 mobile:px-5 laptop:px-0">
        <input
          type="text"
          placeholder="Username"
          className="input input-primary"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-primary"
        />

        <button className="btn" type="submit" onClick={submit}>
          Login
        </button>
      </form>

      <Link href="/forgotPassword/sendOtp" className="link link-primary ">
        forgot password
      </Link>
    </>
  );
}
