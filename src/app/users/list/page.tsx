"use client";

import axios from "axios";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/users/getAllUsers`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/users/filterAndSearchUser?filter=${filter}&search=${search}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    updateData();
  }, [filter, search]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 ">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Link href={"/users/add"}>
              <button className="btn btn-primary w-40 text-lg">
                <AiOutlineUserAdd size={20} />
                Add users
              </button>
            </Link>
          </div>
          <div className="flex justify-end mx-5"></div>
          <Table data={data} colorStatus="user" editor={false} />
        </div>
      </div>
    </>
  );
}
