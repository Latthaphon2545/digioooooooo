"use client";

import axios from "axios";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/components/actionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(false);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";
  const skip = path.get("skip") || "";
  const take = path.get("take") || "";

  const router = useRouter();

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
        setLoading(false);
      }
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">User</h1>
            <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
              <ActionButton
                action={() => {
                  router.push("/users/add");
                }}
                styles={`btn-primary`}
                disabled={!isEditor}
              >
                <AiOutlineUserAdd size={20} /> Add users
              </ActionButton>
            </div>
          </div>
          <div className="flex justify-end mx-5"></div>
          {loading ? (
            <TablePageLoading Type="User" />
          ) : (
            <Table
              data={data}
              colorStatus="user"
              editor={isEditor}
              totalLength={dataLength}
            />
          )}
        </div>
      </div>
    </>
  );
}
