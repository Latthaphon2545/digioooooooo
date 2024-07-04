"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { decode } from "@/lib/generateRandomHref";
import SetPassword from "@/components/auth/setPassword/setPassword";

export default function Home() {
  const path = useSearchParams();
  const { email, password, name, type } = decode(path.toString());
  console.log(email, password, name, type);
  return (
    <div className="flex items-center justify-evenly h-screen w-screen mobile:flex-col laptop:flex-row">
      <SetPassword name={name} email={email} password={password} type={type} />
    </div>
  );
}
