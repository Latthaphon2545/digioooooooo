"use client";

import SetPassword from "@/components/auth/setPassword/setPassword";
import { decode } from "@/lib/generateRandomHref";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function page() {
  const path = useSearchParams();
  const { email, password, name } = decode(path.toString());
  return (
    <div className="flex items-center justify-evenly h-screen w-screen mobile:flex-col laptop:flex-row">
      <SetPassword
        name={name}
        email={email}
        password={password}
        type={"forgotPassword"}
      />
    </div>
  );
}
