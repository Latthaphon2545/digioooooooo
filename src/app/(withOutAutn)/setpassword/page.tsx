"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { decode } from "@/lib/generateRandomHref";
import SetPassword from "@/components/auth/setPassword";

export default function Home() {
  const path = useSearchParams();
  const { email, password, name } = decode(path.toString());
  return (
    <div className="flex items-center justify-evenly h-screen w-screen mobile:flex-col laptop:flex-row">
      <SetPassword name={name} email={email} password={password} />
    </div>
  );
}
