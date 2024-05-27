"use client";

import axios from "axios";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";
  const skip = path.get("skip") || "";
  const take = path.get("take") || "";

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/users/getUsers?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.users);
        setDataLength(res.data.length);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Link href={"/users/add"}>
              <button className="btn btn-primary w-40 text-lg">
                <AiOutlineUserAdd size={20} />
                Add users
              </button>
            </Link>
          </div>
          <div className="flex justify-end mx-5"></div>
          <Table
            data={data}
            colorStatus="user"
            editor={true}
            loading={isLoading}
            totalLength={dataLength}
          />
        </div>
      </div>
    </>
  );
}
