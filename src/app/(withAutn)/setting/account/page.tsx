"use client";

import Account from "@/components/setting/account/account";
import {
  handleRoleChange,
  handleStatusChange,
} from "@/components/table/DropdownField";
import axios from "axios";
import React, { useEffect } from "react";
import NavBarSetting from "../navBar";

// Define an interface for the user data
interface UserData {
  id: string;
  email: string;
  role: string;
  status: string;
  name: string;
  contact: string;
}

export default function Page() {
  const [data, setData] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = "1@digio.co.th";
        const res = await axios.get(`/api/users/getUser?email=${email}`);
        // console.log(res.data.users);
        setData(res.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <NavBarSetting />
      <div className=" mb-1 mobile:mx-5 laptop:mx-10 laptop:mt-10 mobile:mt-2">
        {loading && (
          <div className="skeleton h-full w-full bg-opacity-10"></div>
        )}
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
