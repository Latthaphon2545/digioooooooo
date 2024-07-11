"use client";

import Account from "@/components/setting/account/account";
import {
  handleRoleChange,
  handleStatusChange,
} from "@/components/table/DropdownField";
import React, { useEffect, useState } from "react";
import NavBarSetting from "../navBar";
import { GetAccount } from "@/lib/actions/getAccount/action";

// Define an interface for the user data
interface UserData {
  id: string;
  email: string;
  role: string;
  status: string;
  name: string;
  contact: string;
}

const userId = "6650666b7e05719e52aabefd";

export default function Page() {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await GetAccount({ userId });
      setData(result);
    };
    fetchUser();
  }, []);

  return (
    <>
      <NavBarSetting />
      <div className=" mb-1 mobile:mx-5 laptop:mx-10 laptop:mt-10 mobile:mt-2">
        {data && (
          <Account
            account={{
              email: data.email,
              role: handleRoleChange(data.role),
              status: handleStatusChange(data.status),
              name: data.name,
              contact: data.contact,
              id: data.id,
            }}
          />
        )}
      </div>
    </>
  );
}
