import Account from "@/components/setting/account/account";
import React from "react";

export default function page() {
  return (
    <>
      <Account
        account={{
          email: "asd",
          password: "das",
          role: "asd",
          status: "asd",
          name: "asd",
          contact: "0949054456",
        }}
      />
    </>
  );
}
